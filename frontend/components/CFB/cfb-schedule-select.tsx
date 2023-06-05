"use client";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Conferences } from "@lib/cfb/types"
  // Handles the submit event on form submit.


export function CfbScheduleSelect() {
    let range = (start: number, end: number) => Array.from(Array(end + 1).keys()).slice(start);
    let yrRange = range(2002, 2023);
    let weeks;
    weeks = [
    '1','2','3',
    '4','5','6','7',
    '8','9','10','11',
    '12','13','14','15','16',
    'Bowls']
    const router = useRouter();
    const [year, setYear] = useState("-1");
    const [week, setWeek] = useState("-1");
    const [group, setGroup] = useState("80");
    function handleSubmit(event: React.FormEvent)  {

        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            year: year,
            week: week,
            group: group,
            seasontype: week === "Bowls" ? "3" : "2"
        };
        console.log(data)
        let baseUrl = "/cfb/schedule/"
        if (data.year != "-1" && data.week != "-1") {
            baseUrl += `season/${data.year}/group/${data.group}/type/`
            const weekUrl = data.week === "Bowls" ? "1" : data.week
            baseUrl += `${data.seasontype}/week/${weekUrl}`
        }
        router.push(baseUrl)

      };
    return (
        <>
            <form className="flex justify-between" id="dropdown-form" onSubmit={handleSubmit}>
                <div className="grid grid-flow-row auto-rows-auto">
                    <div className="grid grid-cols-4 px-4">
                        <select className="form-select form-select-lg h-9 px-3 border rounded-md" id="yearSelect" onChange={(event) => setYear(event?.target.value)}>
                            <option value="-1">Year</option>
                            {yrRange.reverse().map((year) => (
                                <option key={year}  value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <select className="form-select form-select-lg h-9 px-3 border rounded-md" id="weekSelect" onChange={(event) => setWeek(event?.target.value)}>
                            <option value="-1">Week</option>
                            {weeks.map((week) => (
                                <option key={week}  value={week}>
                                    {week}
                                </option>
                            ))}
                        </select>

                        <select className="form-select form-select-lg h-9 px-3 border rounded-md" id="groupSelect" onChange={(event) => setGroup(event?.target.value)}>
                            <option value="80">FBS (I-A)</option>
                            {Conferences.map((group) => (
                                <option key={group.id}  value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                        <button type="submit" className="h-9 px-3 border bg-blue-500 hover:bg-blue-600 rounded-md">View</button>
                    </div>
                </div>
            </form>
        </>
      )
}