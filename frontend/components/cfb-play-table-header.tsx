"use client";
import * as React from 'react';
import { useState } from "react";

export default function CFBPlayTableHeader({
    children,
    title,
    href }: {
        children: React.ReactNode,
        title: string,
        href?: string }){
    const [expanded, setExpanded] = useState(false)
    const toggleExpanded = () => setExpanded((current) => !current)
    return(
        <>
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold text-left justify-around py-2">
                    {title}
                    <span className="inline text-sm"  onClick={toggleExpanded}>
                        <a href={href}  role="button" aria-expanded="true">[show/hide]</a>
                    </span>
                </h2>
            </div>
            {expanded ?  (<div className="w-full">{children}</div>) : <div className="hidden"></div> }
        </>
    );
}