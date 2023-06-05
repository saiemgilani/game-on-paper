import Image from 'next/image'
import glossary from '@/lib/cfb/glossary.json'
import { Glossary } from '@/lib/cfb/types'
import { Metadata, ResolvingMetadata } from 'next';


export async function generateMetadata(): Promise<Metadata> {

  var title = "Glossary | College Football | Game on Paper"
  var subtitle = "Advanced stats glossary for college football"

  return {
      title: title,
      description: `${subtitle}`,
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
              url: `/gameonpapertext.png`,
              alt: title,
          },
      },
      openGraph: {
          title: title,
          description: `${subtitle}`,
          url: `https://thegameonpaper.com/cfb/glossary`,
          siteName: 'theGameOnPaper.com',
          images: [
              {
                  url: '/gameonpapertext.png',
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


export default function Glossary() {

  const glossaryKeys = Object.keys(glossary).sort()

  return (
        <div className="container">
          {glossaryKeys.map((k, idx) => (
            <>
            <h2 key={`glossary-section-${k}`} className='text-xl'>{k.toUpperCase()}</h2>
            {glossary[k as keyof typeof glossary].sort((a, b) => a.term < b.term ? -1 : a.term > b.term ? 1 : 0).map((r, idx2) => (
              <>

              <dl className="grid grid-row-1">
                  <div className="grid grid-cols-4">
                    {r.source ?
                      (<dt className="text-bold col-span-1 px-2 py-2 "><a className="underline" href={`${r.source}`}>{r.term}</a></dt>) :
                      (<dt className="text-bold col-span-1 px-2 py-2 ">{r.term}</dt>)
                    }
                    <dd className="px-2 py-2 col-span-3" dangerouslySetInnerHTML={{__html: r.definition}}/>
                  </div>
              </dl>
              </>
            ))}
            </>
          ))}
        </div>
  )
}
