"use client";
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';
import { CFBGamePlay, Competitor, Competition, Away, BoxScoreClass, Pass, Rush, Receiver } from '@/lib/cfb/types';
import AnimatedHeading from './FramerMotion/animated-heading';
import { useState, useEffect } from "react";
import { useTheme } from 'next-themes'
import styled, { keyframes } from 'styled-components';
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
    season }: {
        children: React.ReactNode,
        team: Competitor,
        season: number }){

    const logo = formatLogo(team, season);
    return(
        <>
            <div className="flex justify-between">
            <h2 className="text-2xl font-bold text-left justify-around py-2">{team.team.location}</h2>
            {logo}
            </div>
            {children}
        </>
    );
}