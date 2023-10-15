import { getAuthSession } from "@/lib/auth";
import type { Post, Vote } from "@prisma/client";
import { notFound } from "next/navigation";
import PostVoteClient from "./PostVoteClient";

interface PostVoteServerProps {
    postId: string;
    initialVotesAmt?: number;
    initialVote?: Vote["type"] | null;
    getData?: () => Promise<(Post & { votes: Vote[] }) | null>;
}

/**
 * We split the PostVotes into a client and a server component to allow for dynamic data
 * fetching inside of this component, allowing for faster page loads via suspense streaming.
 * We also have to option to fetch this info on a page-level and pass it in.
 *
 */

const PostVoteServer = async ({
    postId,
    initialVotesAmt,
    initialVote,
    getData,
}: PostVoteServerProps) => {
    const session = await getAuthSession();

    let votes_amount: number = 0;
    let current_vote: Vote["type"] | null | undefined = undefined;

    if (getData) {
        // fetch data in component
        const post = await getData();
        if (!post) return notFound();

        votes_amount = post.votes.reduce((acc, vote) => {
            if (vote.type === "UP") return acc + 1;
            if (vote.type === "DOWN") return acc - 1;
            return acc;
        }, 0);

        current_vote = post.votes.find(
            (vote) => vote.userId === session?.user?.id
        )?.type;
    } else {
        // passed as props
        votes_amount = initialVotesAmt!;
        current_vote = initialVote;
    }

    return (
        <PostVoteClient
            postId={postId}
            initialVotesAmt={votes_amount}
            initialVote={current_vote}
        />
    );
};

export default PostVoteServer;
