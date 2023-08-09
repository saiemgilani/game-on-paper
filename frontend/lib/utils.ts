import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Away } from '@/lib/cfb/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const CLEAN_LIST = [61]
export function cleanAbbreviation(team: Away) {
    if (team.abbreviation !== undefined) {
        if (CLEAN_LIST.includes(parseInt(team.id))) {
            return team?.abbreviation.toLocaleLowerCase()
        }
        return team?.abbreviation
    } else {
        return team?.location
    }
}

export function cleanName(team: Away) {
    if (team.nickname !== undefined) {
        if (CLEAN_LIST.includes(parseInt(team.id))) {
            return team?.nickname.toLocaleLowerCase()
        }
        return team?.nickname
    } else {
        return team?.location
    }
}

export function cleanLocation(team: Away) {
    if (team.location !== undefined) {
        if (CLEAN_LIST.includes(parseInt(team.id))) {
            return team?.location.toLocaleLowerCase()
        }
        return team?.location
    } else {
        return team?.location
    }
}