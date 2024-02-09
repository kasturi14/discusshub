"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { Plus } from "lucide-react";

function Communities() {
    const [communities, setCommunities] = useState(null);

    useEffect(() => {
        async function getData() {
            const { data } = await axios.get(`/api/allcommunities`);
            setCommunities(data);
        }
        getData();
    }, []);

    return (
        <div>
            <div className="flex justify-end items-end">
                <p></p>
                <Link
                    className={buttonVariants({
                        className: "mt-4 mb-6 flex gap-2",
                    })}
                    href={`/d/create`}
                >
                    <Plus size={16} />
                    Create Community
                </Link>
            </div>
            {communities && <ComBox communities={communities} />}
        </div>
    );
}

export default Communities;

function ComBox({ communities }) {
    return (
        <div className="flex gap-5 justify-start items-start flex-wrap w-full">
            {communities.map((community, id) => (
                <div
                    key={id}
                    className="border border-slate-200 rounded-md shadow-md p-6 w-[20%] h-[15rem] hover:shadow-slate-300 hover:shadow-lg flex flex-col"
                >
                    <div className="flex flex-col justify-between mb-4">
                        <div className="font-bold">{community.name}</div>
                        <div className="text-gray-500 text-sm">
                            {formatDate(community.createdAt)}
                        </div>
                    </div>
                    <div className="text-gray-700 mt-2 flex-grow">
                        <div>Posts: {community._count.posts}</div>
                        <div>Subscribers: {community._count.subscribers}</div>
                    </div>
                    <Link
                        href={`/d/${removeNonAlphabetic(community.name)}`}
                        className={buttonVariants({ variant: "subtle" })}
                    >
                        Visit Community
                    </Link>
                </div>
            ))}
        </div>
    );
}

function formatDate(timestamp: String) {
    const date = new Date(timestamp);
    return format(date, "yyyy-MM-dd");
}

const removeNonAlphabetic = (value) => {
    const alphabeticInput = value.replace(/[^a-zA-Z]/g, "");
    return value;
};
