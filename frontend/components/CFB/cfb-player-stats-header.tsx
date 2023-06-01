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

export default function CFBPlayerStatsHeader({
    children,
    team,
    season,
    href }: {
        children: React.ReactNode,
        team: Competitor,
        season: number,
        href: string }){
    const [expanded, setExpanded] = useState(false)
    const toggleExpanded = () => setExpanded((current) => !current)
    const logo = formatLogo(team, season);

    const teamLocation = team.id === '61' ? team.team.location.toLocaleLowerCase() : team.team.location
    return(
        <>
            <div className="flex justify-between">
            <h2 className="text-3xl font-medium font-chivo text-left justify-around py-2">{teamLocation+ " "}<span className="inline text-sm"  onClick={toggleExpanded}>
                <Link href={href}  role="button" aria-expanded="true">[show/hide]</Link></span></h2>
            {logo}
            </div>
            {expanded ? <div className="hidden"></div> : (<div >{children}</div>)}
        </>
    );
}