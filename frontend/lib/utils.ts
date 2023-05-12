import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
interface ConferenceNames {
  [key: number]: string
}
export const ConferenceMap: ConferenceNames = {
  80: "FBS (I-A)",
  1: "ACC",
  151: "AAC",
  4: "Big 12",
  5: "B1G",
  12: "C-USA",
  18: "Independent",
  15: "MAC",
  17: "MWC",
  9: "Pac-12",
  8: "SEC",
  37: "Sun Belt",
  81: "FCS (I-AA)",
  176: "ASUN",
  177: "ASUN",
  20: "Big Sky",
  40: "Big South",
  48: "CAA",
  22: "Ivy",
  24: "MEAC",
  21: "MVFC",
  25: "NEC",
  26: "OVC",
  27: "Patriot",
  28: "Pioneer",
  31: "SWAC",
  29: "Southern",
  30: "Southland",
  // @ts-ignore
  26: "WAC",
  35: "Div II/III"
}

interface NetworkNames {
  [key: string]: string
}

export const NetworkMap: NetworkNames = {
  "FOX" : "https://www.foxsports.com/live",
  "FS1" : "https://www.foxsports.com/live/fs1",
  "FS2" : "https://www.foxsports.com/live/fs2",
  "BTN" : "https://www.foxsports.com/live/btn",
  "NBC" : "https://www.nbcsports.com/live",
  "Peacock" : "https://www.peacocktv.com",
  "CBSSN" : "https://www.cbssports.com/cbs-sports-network/",
  "CBS" : "https://www.cbssports.com/live/",
  "PAC12" : "https://pac-12.com/live",
  "NFL NET" : "https://www.nfl.com/network/watch/nfl-network-live",
  "": ""
}

export const Conferences = [
  {
      "id": 80,
      "name": "FBS (I-A)"
  },
  {
      "id": 1,
      "name": "ACC"
  },
  {
      "id": 151,
      "name": "American"
  },
  {
      "id": 4,
      "name": "Big 12"
  },
  {
      "id": 5,
      "name": "Big Ten"
  },
  {
      "id": 12,
      "name": "C-USA"
  },
  {
      "id": 18,
      "name": "FBS Independents"
  },
  {
      "id": 15,
      "name": "MAC"
  },
  {
      "id": 17,
      "name": "Mountain West"
  },
  {
      "id": 9,
      "name": "Pac-12"
  },
  {
      "id": 8,
      "name": "SEC"
  },
  {
      "id": 37,
      "name": "Sun Belt"
  },
  {
      "id": 81,
      "name": "FCS (I-AA)"
  },
  {
      "id": 176,
      "name": "ASUN"
  },
  {
      "id": 20,
      "name": "Big Sky"
  },
  {
      "id": 40,
      "name": "Big South"
  },
  {
      "id": 48,
      "name": "CAA"
  },
  {
      "id": 22,
      "name": "Ivy"
  },
  {
      "id": 24,
      "name": "MEAC"
  },
  {
      "id": 21,
      "name": "MVFC"
  },
  {
      "id": 25,
      "name": "NEC"
  },
  {
      "id": 26,
      "name": "OVC"
  },
  {
      "id": 27,
      "name": "Patriot"
  },
  {
      "id": 28,
      "name": "Pioneer"
  },
  {
      "id": 31,
      "name": "SWAC"
  },
  {
      "id": 29,
      "name": "Southern"
  },
  {
      "id": 30,
      "name": "Southland"
  },
  {
      "id": 16,
      "name": "WAC"
  },
  {
      "id": 35,
      "name": "Div II/III"
  }
]