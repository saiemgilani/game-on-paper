import {pyApiOrigin} from '@/lib/urlConfig';
import { Metadata, ResolvingMetadata } from 'next';
import PageTop from '@/components/page-top';
import ScoreCard from '@/components/score-card';
import { ScoreboardEvent } from '@/lib/types';
import { CfbScheduleSelect } from '@/components/CFB/cfb-schedule-select';
async function getCFBSchedule(params: any) {
    // console.log(pyApiOrigin+'/cfb/scoreboard')

    const endpoint = new URL(pyApiOrigin+'/cfb/scoreboard' + '?' +
        `groups=${params.group}` +
        `&dates=${params.season}` +
        `&seasontype=${params.seasontype}` +
        `&week=${params.week}`);

    const data = await fetch(endpoint, { cache: 'no-store' ,
        headers: { 'Content-Type': 'application/json' }}).then((res) => res.json());

    return data

}

export async function generateMetadata(
    { params }: { params: { group: string, season: string, seasontype: string, week: string } },
    parent: ResolvingMetadata,
  ): Promise<Metadata> {
    // read route params
    const year = params.season;

    // fetch data
    const endpoint = new URL(pyApiOrigin+'/cfb/scoreboard' + '?' +
        `groups=${params.group}` +
        `&dates=${params.season}` +
        `&seasontype=${params.seasontype}` +
        `&week=${params.week}`);

    const data = await fetch(endpoint, { cache: 'no-store' ,
                                          headers: { 'Content-Type': 'application/json' }}).then((res) => res.json());

    var title = "College Football | Game on Paper"
    var subtitle = `College Football Schedule - Season ${year}, week ${params.week}, group ${params.group}`

    return {
        title: title,
        description: `${subtitle}`,
        metadataBase: new URL('https://thegameonpaper.com/'),
        referrer: 'origin-when-cross-origin',
        viewport: {
            width: 'device-width',
            initialScale: 1.0,
            maximumScale: 1.0,
            userScalable: false,
        },
        authors: [{ name: 'Akshay Easwaran' }, { name: 'Saiem Gilani'}],
        creator: 'Akshay Easwaran'+', '+'Saiem Gilani',
        themeColor: [
            { media: "(prefers-color-scheme: light)", color: "white" },
            { media: "(prefers-color-scheme: dark)", color: "black" },
        ],
        icons: {
            icon: "/favicon.ico",
            shortcut: "/favicon-16x16.png",
            apple: "/apple-touch-icon.png",
        },
        twitter: {
            card: 'summary',
            creator: '@SportsDataverse',
            title: title,
            description: `${subtitle}`,
            images: {
                url: '/twitter-image.png',
                alt: title,
            },
        },
        openGraph: {
            title: title,
            description: `Advanced stats for ${subtitle}`,
            url: `https://thegameonpaper.com/cfb/season/${params.season}/group/${params.group}/type/${params.seasontype}/week/${params.week}`,
            siteName: 'theGameOnPaper.com',
            images: [
                {
                    url: '/opengraph-image.png',
                    width: 1200,
                    height: 630,
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        other: {
            medium: 'website',
        }
    };
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
        {filtered !== undefined && filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ">
                {filtered?.map((score: any, i: number) => (
                    <ScoreCard key={i} showRecords={true} props={score} />
                ))}
            </div>) :
            <div className="flex justify-center items-center h-24"><p className="text-2xl text-center">No Games Found</p></div>
        }
        </>
    )
}