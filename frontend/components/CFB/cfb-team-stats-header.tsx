"use client";
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Competitor } from '@/lib/cfb/types';
import { useState } from "react";

function formatLogo(team: Competitor, season: number) {
    return (
    <>
        <Link className="inline-block dark:hidden" href={`/cfb/year/${season}/team/${team.id}`}>
            <Image className="inline-block align-middle dark:hidden" width={"35"} height={"35"} src={team.team.logos[0].href} alt={`ESPN team id ${team.id}`}/>
        </Link>
        <Link className="hidden dark:inline-block" href={`/cfb/year/${season}/team/${team.id}`}>
            <Image className="align-middle hidden dark:inline-block" width={"35"} height={"35"} src={team.team.logos[1].href} alt={`ESPN team id ${team.id}`}/>
        </Link>
    </>
    );
}

export default function CFBTeamStatsHeader({
    children,
    title,
    href }: {
        children: React.ReactNode,
        title: string,
        href: string }){
    const [expanded, setExpanded] = useState(true)
    const toggleExpanded = () => setExpanded((current) => !current)
    return(
        <>
            <div className="justify-around">
            <h2 className="text-2xl font-chivo text-left justify-around py-2">{title+ " "}<span className="inline text-sm"  onClick={toggleExpanded}>
                <Link href={href}  role="button" aria-expanded="true">[show/hide]</Link></span></h2>

            </div>
            {expanded ?  (<div className="justify-around">{children}</div>): <div className="hidden"></div>}
        </>
    );
}