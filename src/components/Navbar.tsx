import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/Button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { UserAccountNav } from "./UserAccountNav";
import SearchBar from "./SearchBar";

type Session = /*unresolved*/ any;

const Navbar = async () => {
    const session: Session = await getServerSession(authOptions);

    return (
        <div className="fixed top-0 inset-x-0 h-fit bg-purple-100 border-b border-zinc-300 z-[10] py-2">
            <div className="container h-full mx-auto flex items-center justify-between gap-2 max-w-7xl">
                <Link href="/" className="flex gap-2 items-center">
                    <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
                    <p className="hidden text-zinc-700 text-sm font-medium md:block">DiscussHub</p>
                </Link>

                <SearchBar />

                <Link href="/communities">Explore Communities</Link>

                {session?.user ? (
                    <UserAccountNav user={session.user} />
                ) : (
                    <Link href="/sign-in" className={buttonVariants()}>
                        Sign In
                    </Link>
                )}
            </div>
        </div>
    );
};
export default Navbar;
