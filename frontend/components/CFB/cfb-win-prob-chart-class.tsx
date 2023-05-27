// @ts-nocheck
"use client";
import React, { Component } from 'react'
import Chart from "chart.js/auto";
import { Chart as ChartJS, ChartComponent, LineController, LineControllerDatasetOptions } from "chart.js"
import { CFBGamePlay, Competitor, Competition } from '@/lib/cfb/types';
let myLineChart: any;


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
function printSpread(homeTeamSpread: number, awayTeam: Competitor, homeTeam: Competitor) {
    if (parseFloat(homeTeamSpread.toString()) > 0) {
        return `${cleanAbbreviation(homeTeam.team)} -${homeTeamSpread}`
    } else if (parseFloat(homeTeamSpread.toString()) < 0) {
        return `${cleanAbbreviation(awayTeam.team)} ${homeTeamSpread}`
    } else {
        return "PUSH"
    }
}
function roundNumber(value: any, power10: number, fixed: number) {
    return (Math.round(parseFloat(value || '0') * (Math.pow(10, power10))) / (Math.pow(10, power10))).toFixed(fixed)
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
const lerp: number = (x: number, y: number, a: number) => x * (1 - a) + y * a;

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
export default class CFBWinProbChartClass extends Component<{
    plays: CFBGamePlay[],
    homeTeam: Competitor,
    awayTeam: Competitor,
    competitions: Competition[],
    homeTeamSpread: number,
    overUnder: number,
    gei: number
    }> {
    chartRef = React.createRef();
    constructor(props: {plays: CFBGamePlay[], homeTeam: Competitor, awayTeam: Competitor, competitions: Competition[],
        homeTeamSpread: number,
        overUnder: number,
        gei: number}) {
        super(props);

    }
    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {
        //@ts-ignore
        const wpChartRef = this.chartRef.current.getContext("2d");

        const plays = this.props.plays;
        const homeTeam = this.props.homeTeam;
        const awayTeam = this.props.awayTeam;
        const competitions = this.props.competitions;
        const homeTeamSpread = this.props.homeTeamSpread;
        const overUnder = this.props.overUnder;
        const gei = this.props.gei;
        const allPlays = [...plays];
        // console.log(gameData.plays[0])
        var timestamps = Array.from(Array(plays.length).keys());
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

        // handle end of game
        if (competitions[0].status.type.completed == true) {
            if (homeComp.winner == true || parseInt(homeComp.score?.toString() || "0") > parseInt(awayComp.score?.toString() || "0")) {
                timestamps.push(0)
                homeTeamWP.push(translateWP(1.0))
            } else if (awayComp.winner == true || parseInt(homeComp.score?.toString() || "0") < parseInt(awayComp.score?.toString() || "0")) {
                timestamps.push(0)
                homeTeamWP.push(translateWP(0.0))
            }
        }

        var targetDataSet = {
            yAxisID : 'y-axis-0',
            fill: true,
            lineTension: 0,
            pointRadius: 0,
            borderWidth: 3,
            label: null,
            data: homeTeamWP
        };

        // console.log(`home: ${homeTeam.id}, ${cleanAbbreviation(homeTeam.team)}`)
        // console.log(`away: ${awayTeam.id}, ${cleanAbbreviation(awayTeam.team)}`)
        var zipped = plays.map(function(e, i) {
            return {
              play: i,
              team: e.pos_team,
              homeWP: targetDataSet.data[i]
            }//[e, b[i]];
          });
        // console.log(zipped)
        let isDarkMode = document.documentElement.style.getPropertyValue('color-scheme') === 'dark' ? true : false;
        console.log(document.documentElement.style.getPropertyValue('color-scheme'))
        // console.log(getComputedStyle(document.getElementsByClassName('dark')))
        let gridLines = {
            color: (isDarkMode) ? '#e8e6e3' : '#686767',
            zeroLineColor: (isDarkMode) ? "white" : "#ACACAC"
        }
        if (typeof myLineChart !== "undefined") myLineChart.destroy();

        class NegativeTransparentLine extends LineController {
            //@ts-ignore
            update () {
                //@ts-ignore
                for(let i = 0; i < this.chart.data.datasets.length; i++) {
                    //@ts-ignore
                    // get the min and max values
                    var min = Math.min.apply(null, this.chart.data.datasets[i].data);
                    var max = Math.max.apply(null, this.chart.data.datasets[i].data);
                    var yScale = this.getScaleForId(this.chart.data.datasets[i].yAxisID);

                    // figure out the pixels for these and the value 0
                    var top = yScale.getPixelForValue(1.0);
                    var zero = yScale.getPixelForValue(0);
                    var bottom = yScale.getPixelForValue(-1.0);

                    // build a gradient that switches color at the 0 point
                    var ctx = this.chart.ctx;
                    ctx.save()
                    var gradientFill = ctx.createLinearGradient(0, top, 0, bottom);
                    var gradientStroke = ctx.createLinearGradient(0, top, 0, bottom);
                    var ratio = Math.min((zero - top) / (bottom - top), 1);
                    if (ratio < 0) {
                        ratio = 0;
                        gradientFill.addColorStop(1, `rgba(${awayTeamColor.r},${awayTeamColor.g},${awayTeamColor.b}, 0.5)`);

                        gradientStroke.addColorStop(1, `rgba(${awayTeamColor.r},${awayTeamColor.g},${awayTeamColor.b}, 1.0)`);
                    } else if (ratio == 1) {
                        gradientFill.addColorStop(1, `rgba(${homeTeamColor.r},${homeTeamColor.g},${homeTeamColor.b}, 0.5)`);

                        gradientStroke.addColorStop(1, `rgba(${homeTeamColor.r},${homeTeamColor.g},${homeTeamColor.b}, 1.0)`);
                    } else {
                        gradientFill.addColorStop(0, `rgba(${homeTeamColor.r},${homeTeamColor.g},${homeTeamColor.b}, 0.5)`);
                        gradientFill.addColorStop(ratio, `rgba(${homeTeamColor.r},${homeTeamColor.g},${homeTeamColor.b}, 0.5)`);
                        gradientFill.addColorStop(ratio, `rgba(${awayTeamColor.r},${awayTeamColor.g},${awayTeamColor.b}, 0.5)`);
                        gradientFill.addColorStop(1, `rgba(${awayTeamColor.r},${awayTeamColor.g},${awayTeamColor.b}, 0.5)`);

                        gradientStroke.addColorStop(0, `rgba(${homeTeamColor.r},${homeTeamColor.g},${homeTeamColor.b}, 1.0)`);
                        gradientStroke.addColorStop(ratio, `rgba(${homeTeamColor.r},${homeTeamColor.g},${homeTeamColor.b}, 1.0)`);
                        gradientStroke.addColorStop(ratio, `rgba(${awayTeamColor.r},${awayTeamColor.g},${awayTeamColor.b}, 1.0)`);
                        gradientStroke.addColorStop(1, `rgba(${awayTeamColor.r},${awayTeamColor.g},${awayTeamColor.b}, 1.0)`);
                    }

                    this.chart.data.datasets[i].backgroundColor = gradientFill;
                    this.chart.data.datasets[i].borderColor = gradientStroke;
                    this.chart.data.datasets[i].pointBorderColor = gradientStroke;
                    this.chart.data.datasets[i].pointBackgroundColor = gradientStroke;
                    this.chart.data.datasets[i].pointHoverBorderColor = gradientStroke;
                    this.chart.data.datasets[i].pointHoverBackgroundColor = gradientStroke;
                    ctx.restore();
                }
                return LineController.prototype.update.apply(this);
            }
            draw (ease) {
                // call the parent draw method (inheritance in javascript, whatcha gonna do?)
                let viewport = getCurrentViewport()
                if (viewport == "xl" || viewport == "lg") {
                    var imgSize = 75.0;

                    var ctx = this.chart.ctx;                                         // get the context
                    ctx.save();
                    ctx.globalAlpha = 0.4;
                    var sizeWidth = ctx.canvas.clientWidth;
                    var sizeHeight = ctx.canvas.clientHeight;
                    var homeImage = new Image();
                    homeImage.setAttribute('crossOrigin','anonymous');
                    homeImage.src = document.documentElement.style.getPropertyValue('color-scheme') === 'dark'  ? `https://a.espncdn.com/i/teamlogos/ncaa/500-dark/${homeTeam.id}.png` : `https://a.espncdn.com/i/teamlogos/ncaa/500/${homeTeam.id}.png`;

                    var awayImage = new Image();
                    awayImage.setAttribute('crossOrigin','anonymous');
                    awayImage.src = document.documentElement.style.getPropertyValue('color-scheme') === 'dark'  ? `https://a.espncdn.com/i/teamlogos/ncaa/500-dark/${awayTeam.id}.png` : `https://a.espncdn.com/i/teamlogos/ncaa/500/${awayTeam.id}.png`;

                    if (this.homeTeamImage) {                                       // if the image is loaded
                        ctx.drawImage(this.homeTeamImage, (sizeWidth / 8), (sizeHeight / 8) - (imgSize / 4.0), imgSize, imgSize);             // draw it - ~145 px per half
                    }

                    if (this.awayTeamImage) {                                    // if the image is loaded
                        ctx.drawImage(this.awayTeamImage, (sizeWidth / 8), 5 * (sizeHeight / 8) - (imgSize / 2.0), imgSize, imgSize);             // draw it - ~145 px per half
                    }
                    ctx.restore();

                    LineController.prototype.draw.call(this, ease);
                }
            }
            initialize (chart, datasetIndex) {                     // override initialize too to preload the image, the image doesn't need to be outside as it is only used by this chart
                LineController.prototype.initialize.call(this, chart, datasetIndex);
                var homeImage = new Image();
                homeImage.setAttribute('crossOrigin','anonymous');
                homeImage.src = document.documentElement.style.getPropertyValue('color-scheme') === 'dark'  ? `https://a.espncdn.com/i/teamlogos/ncaa/500-dark/${homeTeam.id}.png` : `https://a.espncdn.com/i/teamlogos/ncaa/500/${homeTeam.id}.png`;
                homeImage.onload = () => {                                            // when the image loads
                    this.homeTeamImage = homeImage;                                    // save it as a property so it can be accessed from the draw method
                    myLineChart.render();                                                 // and force re-render to include it
                };

                var awayImage = new Image();
                awayImage.setAttribute('crossOrigin','anonymous');
                awayImage.src = document.documentElement.style.getPropertyValue('color-scheme') === 'dark'  ? `https://a.espncdn.com/i/teamlogos/ncaa/500-dark/${awayTeam.id}.png` : `https://a.espncdn.com/i/teamlogos/ncaa/500/${awayTeam.id}.png`;
                awayImage.onload = () => {                                            // when the image loads
                    this.awayTeamImage = awayImage;                                    // save it as a property so it can be accessed from the draw method
                    myLineChart.render();                                                 // and force re-render to include it
                };
            }
        }
        NegativeTransparentLine.id = 'NegativeTransparentLine';
        NegativeTransparentLine.defaults = LineController.defaults;

        const afterDrawPlugin = {
            id: 'afterDraw',
            afterDraw (chart: any) {
                let viewport = getCurrentViewport()
                if (viewport == "xl" || viewport == "lg") {
                    let sizeWidth = chart.ctx.canvas.clientWidth;
                    let sizeHeight = chart.ctx.canvas.clientHeight;
                    let imgSize = 75.0;

                    chart.ctx.save()
                    chart.ctx.textAlign = "right"
                    chart.ctx.font = "8.5px Helvetica";
                    chart.ctx.fillStyle = document.documentElement.style.getPropertyValue('color-scheme') === 'dark'  ? '#e8e6e3' : '#343a40';
                    chart.ctx.fillText("From GameOnPaper.com, by Akshay Easwaran (@akeaswaran)\nand Saiem Gilani (@saiemgilani)", sizeWidth - (imgSize / 4.0), 7.25 * (sizeHeight / 8) - 35)
                    chart.ctx.restore();
                }
            }
        }
        ChartJS.register(NegativeTransparentLine, afterDrawPlugin)
        myLineChart = new Chart(wpChartRef, {
            type: "NegativeTransparentLine",
            data: {
                //Bring in data
                clip: false,
                labels: timestamps,
                datasets: [
                    targetDataSet
                ]
            },
            options: {
                responsive: true,
                clip: false,
                plugins: {
                    afterDrawPlugin,

                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                return `Total Play Number: ${context[0].parsed.x}`
                            },
                            label: function(context) {

                                if (context.parsed.y > 0) {
                                    let transVal = baseTranslate(context.parsed.y, 0.0, 1.0, 50, 100);
                                    return `${cleanAbbreviation(homeTeam.team)} WP: ${(Math.round(Math.abs(transVal) * 10) / 10)}%`
                                } else if (context.parsed.y < 0) {
                                    let transVal = baseTranslate(context.parsed.y, -1.0, 0.0, 100, 50);
                                    return `${cleanAbbreviation(awayTeam.team)} WP: ${(Math.round(Math.abs(transVal) * 10) / 10)}%`;
                                } else {
                                    return "50%";
                                }
                            }
                        }
                    }
                },
                scales: {
                    "y-axis-0": {
                        // suggestedMax: 1.0,
                        // suggestedMin: -1.0,
                        min: -1,
                        max: 1,
                        ticks: {
                            min: -1.0,
                            max: 1.0,
                            stepSize: 0.5,
                            color: document.documentElement.style.getPropertyValue('color-scheme') === 'dark'  ? '#e8e6e3' : '#686767',
                            callback: function(value: number, index: number, values: number[]) {
                                if (value > 0) {
                                    let transVal = baseTranslate(value, 0.0, 1.0, 50, 100);
                                    return `${cleanAbbreviation(homeTeam.team)} ${(Math.round(Math.abs(transVal) * 100) / 100)}%`
                                } else if (value < 0) {
                                    let transVal = baseTranslate(value, -1.0, 0.0, 100, 50);
                                    return `${cleanAbbreviation(awayTeam.team)} ${(Math.round(Math.abs(transVal) * 100) / 100)}%`
                                } else {
                                    return "50%";
                                }
                            }
                        },
                        title: {
                            color: document.documentElement.style.getPropertyValue('color-scheme') === 'dark'  ? '#e8e6e3' : '#686767',
                            display: false,
                            text: "Win Probablity"
                        },
                        grid: gridLines
                    },
                    x: {
                        ticks: {
                            color: document.documentElement.style.getPropertyValue('color-scheme') === 'dark'  ? '#e8e6e3' : '#686767',
                            // Include a dollar sign in the ticks
                            callback: function(value: number, index: number) {
                                return value
                            }
                        },
                        title: {
                            color: document.documentElement.style.getPropertyValue('color-scheme') === 'dark'  ? '#e8e6e3' : '#686767',
                            display: true,
                            text: "Play Number"
                        },
                        grid: gridLines
                    }
                },
            }
        });
    }

    render() {
        const homeTeam = this.props.homeTeam;
        const awayTeam = this.props.awayTeam;
        const competitions = this.props.competitions;
        const homeTeamSpread = this.props.homeTeamSpread;
        const overUnder = this.props.overUnder;
        const gei = this.props.gei;
        return (
            <>
                <h2 className="text-2xl font-chivo text-left justify-around py-2">Win Probability</h2>
                <p className="text-md"><a href="https://www.opensourcefootball.com/posts/2020-08-21-game-excitement-and-win-probability-in-the-nfl/">Game Excitement Index: </a>
                    {roundNumber(gei, 2, 2)}{"| Odds: "}{printSpread(homeTeamSpread, awayTeam, homeTeam)}{", O/U: "}{roundNumber(overUnder, 2 , 1)}
                </p>
                <canvas
                    id="wpChart"
                    // @ts-ignore
                    ref={this.chartRef}
                />
            </>
        )
    }
}