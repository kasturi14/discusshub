import { db } from "@/lib/db";

export async function GET(req: Request) {
    const url = new URL(req.url);

    const results = await db.subreddit.findMany({
        include: {
            _count: true,
        },
        take: 10,
    });

    return new Response(JSON.stringify(results));
}
