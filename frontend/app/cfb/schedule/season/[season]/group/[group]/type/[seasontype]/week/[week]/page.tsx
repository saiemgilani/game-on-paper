import {pyApiOrigin} from '@/lib/urlConfig';
import PageTop from '@/components/page-top';
import ScoreCard from '@/components/score-card';
import { ScoreboardEvent } from '@/lib/types';
import { CfbScheduleSelect } from '@/components/cfb-schedule-select';
async function getCFBSchedule(params: any) {
    // console.log(pyApiOrigin+'/cfb/scoreboard')

    const endpoint = new URL(pyApiOrigin+'/cfb/scoreboard' + '?' +
        `groups=${params.group}` +
        `&dates=${params.season}` +
        `&seasontype=${params.seasontype}` +
        `&week=${params.week}`);

    try{
    const res = await fetch(endpoint , {

        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: 10 },
    });
    const resp = res.json()
    return resp;
    } catch (e) {
        console.log(e)
    }

}

type ScoreboardEvents = {
    events: ScoreboardEvent[]
}
export default async function Schedule({ params }: {
                                         params: {
                                            group: number,
                                            season: number,
                                            seasontype: number,
                                            week: number
                                        }
                                    }) {

    const data: ScoreboardEvent[] = await getCFBSchedule(params);
    const filtered = data?.filter((x: any) => ( x.status_type_name !== 'STATUS_CANCELED' && x.status_type_name !== 'STATUS_POSTPONED') )

    return (
        <>
        <div>
            <PageTop pageTitle="College Football Scoreboard" headingClass='h1'></PageTop>
        </div>
        <div className="flex flex-row justify-center">
            <CfbScheduleSelect />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ">
            {filtered?.map((score: any, i: number) => (
                <ScoreCard key={i} away_logo={score.away_logo} home_logo={score.home_logo} {...score} />
            ))}
        </div>
        </>
    )
}