import Image from 'next/image'
import glossary from '@/lib/cfb/glossary.json'
import { Glossary } from '@/lib/cfb/types'

interface GlossaryProps {
    [k: string]: string;
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
