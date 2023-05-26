"use client";
import { useEffect } from "react"
import { Chart } from "chart.js";
import { CFBGamePlay, Competitor, Competition, Away } from '@/lib/cfb/types';

function calculateHalfSecondsRemaining(period: number, time: string) {
    if (period == null) {
        return 0
    }

    if (time == null) {
        return 0
    }

    if (period > 4) {
        return 0
    }

    var splitTime = time.split(":")
    var minutes = (splitTime.length > 0) ? parseInt(splitTime[0]) : 0
    var seconds = (splitTime.length > 1) ? parseInt(splitTime[1]) : 0
    var adjMin = (period == 1 || period == 3) ? (15.0 + minutes) : minutes
    return Math.max(0, Math.min(1800, (adjMin * 60.0) + seconds))

}

function calculateGameSecondsRemaining(period: number, halfSeconds: number) {
    if (period <= 2) {
        return Math.max(0, Math.min(3600, 1800.0 + halfSeconds))
    } else {
        return halfSeconds
    }
}

const CLEAN_LIST = [61]
function cleanAbbreviation(team: any) {
    if (CLEAN_LIST.includes(parseInt(team.id))) {
        return team.abbreviation.toLocaleLowerCase()
    }
    return team.abbreviation
}

function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function baseTranslate(input: number, inMin: number, inMax: number, outMin: number, outMax: number) {

    var leftRange = inMax - inMin;
    var rightRange = outMax - outMin;
    var scaledValue = (input - inMin) / leftRange;
    return outMin + (scaledValue * rightRange);
}

function translateWP(input: number) {
    return baseTranslate(input, 0.0, 1.0, -1.0, 1.0)
}

function calculateCumulativeSums(arr: any[]) {
    const cumulativeSum = (sum => (value: number) => sum += value)(0);
    return arr.map(cumulativeSum);
}

// https://www.trysmudford.com/blog/linear-interpolation-functions/
const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

// https://stackoverflow.com/questions/45394053/how-to-detect-screen-size-or-view-port-on-bootstrap-4-with-javascript
function getCurrentViewport() {
// https://stackoverflow.com/a/8876069
    const width = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
    )
    if (width <= 576) return 'xs'
    if (width <= 768) return 'sm'
    if (width <= 992) return 'md'
    if (width <= 1200) return 'lg'
    return 'xl'
}

function interpolateTimestamps(plays: any) {
    if (plays.length == 0) {
        return plays;
    }
    plays.forEach((p: any) => p.time_remaining = calculateHalfSecondsRemaining(p.period, p.clock.displayValue))
    var ind = [];
    for (var i = 0; i < plays.length; i+= 1) {
        // var play = plays[i]
        var nextPlay = null
        if ((i + 1) >= plays.length) {
            nextPlay = null
        } else {
            nextPlay = plays[i + 1]
        }

        if (nextPlay != null) {
            if (plays[i].time_remaining == nextPlay.time_remaining) {
                plays[i].time_remaining = null
            } else {
                plays[i].time_remaining = plays[i].time_remaining
            }
        }

        if (plays[i].time_remaining == 1800 && plays[i].period == 3) {
            ind.push(i)
        }
    }

    plays[0].time_remaining = 1800
    plays[plays.length - 1].time_remaining = 0

    // game is probably in progress?
    if (ind.length == 0) {
        ind.push(plays.length - 1)
    }

    ind.forEach(j => {
        let adjIndex = j - 1
        if (adjIndex >= 0 && adjIndex < plays.length) {
            plays[adjIndex].time_remaining = 0
        }
    })
    // console.log(ind)

    let halfPoint = ind[ind.length - 1]
    for (var i = 0; i < halfPoint; i++) {
        var pct = (i / halfPoint)
        // console.log("pct: " + pct)
        plays[i].time_remaining = Math.round(lerp(1800, 0, pct))
    }

    for (var i = halfPoint + 1; i < plays.length; i++) {
        var pct = ((i - (halfPoint + 1)) / (plays.length - (halfPoint + 1)))
        // console.log("pct: " + pct)
        plays[i].time_remaining = Math.round(lerp(1800, 0, pct))
    }

    plays.forEach((p: any) => p.game_time_remaining = calculateGameSecondsRemaining(p.period, p.time_remaining))

    return plays;
}

// https://stackoverflow.com/a/52453462
function deltaE(rgbA: any, rgbB: any) {
    let labA = rgb2lab(rgbA);
    let labB = rgb2lab(rgbB);
    let deltaL = labA[0] - labB[0];
    let deltaA = labA[1] - labB[1];
    let deltaB = labA[2] - labB[2];
    let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
    let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
    let deltaC = c1 - c2;
    let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
    deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
    let sc = 1.0 + 0.045 * c1;
    let sh = 1.0 + 0.015 * c1;
    let deltaLKlsl = deltaL / (1.0);
    let deltaCkcsc = deltaC / (sc);
    let deltaHkhsh = deltaH / (sh);
    let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
    return i < 0 ? 0 : Math.sqrt(i);
}

function rgb2lab(rgb: any){
    let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
    x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
    y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
    z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}

export default function CFBWinProbChart({
    plays,
    homeTeam,
    awayTeam }:{
        plays: CFBGamePlay[],
        homeTeam: Competitor,
        awayTeam: Competitor}){
    if (plays.length > 0) {
        const allPlays = [...plays];
        // console.log(gameData.plays[0])

        // console.log(timestamps)
        var homeComp = homeTeam;
        var awayComp = awayTeam;
        var homeTeamInfo = homeComp.team;
        var awayTeamInfo = awayComp.team;
        var awayTeamColor = hexToRgb(awayTeamInfo.color)
        var homeTeamColor = hexToRgb(homeTeamInfo.color)
            // if the homeTeamColor and the awayTeamColor are too similar, make the awayTeam use their alt
        let dEHome = awayTeamColor !== null && homeTeamColor !== null ? deltaE([awayTeamColor.r, awayTeamColor.g, awayTeamColor.b], [homeTeamColor.r, homeTeamColor.g, homeTeamColor.b]): 0
        if (dEHome <= 49 && awayTeamInfo.alternateColor != null) {
            awayTeamColor = hexToRgb(awayTeamInfo.alternateColor)
            console.log(`updating away team color from primary ${JSON.stringify(hexToRgb(awayTeamInfo.color))} to alt: ${JSON.stringify(awayTeamColor)}`)
            if (awayTeamColor !== null && homeTeamColor !== null && deltaE([awayTeamColor.r, awayTeamColor.g, awayTeamColor.b], [homeTeamColor.r, homeTeamColor.g, homeTeamColor.b]) <= 49) {
                awayTeamColor = hexToRgb(awayTeamInfo.color)
                console.log(`resetting away team color from alt ${JSON.stringify(hexToRgb(awayTeamInfo.alternateColor))} from alt: ${JSON.stringify(awayTeamColor)} bc of similarity`)
            }
        }

        // if either color is too similar to white, use gray
        let colors = [homeTeamColor, awayTeamColor]
        var adjusted = false;
        colors.forEach((clr, idx) => {
            var dEBackground = clr !== null ? deltaE([clr.r, clr.g, clr.b], [255,255,255]): 0
            if (dEBackground <= 49) {
                adjusted = true;
                if (idx == 0) {
                    homeTeamColor = hexToRgb("#CCCCCC")
                } else {
                    awayTeamColor = hexToRgb("#CCCCCC")
                }
                console.log(`updating color at index ${idx} to gray bc of background`)
            }
        })

        // if both colors are now gray, reset the homeTeamColor
        let dEHomeAdj = awayTeamColor !== null && homeTeamColor !== null ? deltaE([awayTeamColor.r, awayTeamColor.g, awayTeamColor.b], [homeTeamColor.r, homeTeamColor.g, homeTeamColor.b]) : 0
        if (dEHomeAdj <= 49 && adjusted) {
            homeTeamColor = hexToRgb(homeTeamInfo.color);
            console.log(`resetting home color to ${JSON.stringify(homeTeamColor)} because of similarity to gray away color`)
        }

        var homeTeamWP = plays.map(p => (p.pos_team.toString() == homeTeam.id) ? translateWP(p.winProbability.before) : translateWP(1.0 - p.winProbability.before));


    }
    // useEffect(() => {
    //     var ctx = document.getElementById('myChart');
    //     var myChart = new Chart(ctx, {
    //         type: 'line',
    //         data: {
    //             labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    //             datasets: [{
    //                 data: [86, 114, 106, 106, 107, 111, 133],
    //                 label: "Applied",
    //                 borderColor: "#3e95cd",
    //                 backgroundColor: "#7bb6dd",
    //                 fill: false,
    //             }, {
    //                 data: [70, 90, 44, 60, 83, 90, 100],
    //                 label: "Accepted",
    //                 borderColor: "#3cba9f",
    //                 backgroundColor: "#71d1bd",
    //                 fill: false,
    //             }, {
    //                 data: [10, 21, 60, 44, 17, 21, 17],
    //                 label: "Pending",
    //                 borderColor: "#ffa500",
    //                 backgroundColor: "#ffc04d",
    //                 fill: false,
    //             }, {
    //                 data: [6, 3, 2, 2, 7, 0, 16],
    //                 label: "Rejected",
    //                 borderColor: "#c45850",
    //                 backgroundColor: "#d78f89",
    //                 fill: false,
    //             }
    //             ]
    //         },
    //     });
    // }, [])
    return (
        <>
        <canvas id='myChart'></canvas>
        </>
    )
}