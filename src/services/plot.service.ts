declare var require: any;
var hcharts = require('highcharts');

export class PlotService {
    createPieData(arr) {
        var colors = [
            hcharts.getOptions().colors[0], // DEEP
            hcharts.getOptions().colors[8], // LIGHT
            hcharts.getOptions().colors[1], // RESTLESS
            hcharts.getOptions().colors[2], // AWAKE
            hcharts.getOptions().colors[6], // BAD EEG
            'transparent' // FILLER
        ];
        return arr.map((dataPoint, index) => {
            return {
                y: dataPoint,
                color: colors[index],
                borderColor: '#555',
                borderWidth: index === 5 ? 1 : 0
            }
        });
    }

    createPieConfig(data) {
        return {
            chart: {
                backgroundColor: 'transparent',
                type: 'pie',
                // zoomType: 'x',
                // events: {
                //     load: function () {
                //         var self = this;
                //         setTimeout(function () {
                //             self.reflow();
                //         }, 100)
                //     }
                // }
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false
                    },
                    innerSize: '75%',
                    startAngle: 0
                }
            },
            title: { text: '' },
            series: [{
                data: this.createPieData(data),
            }]
        }
    }

    createLineData(currentDataSet) {
        let returnObj = {
            proSleepLvl: this.removeExtraPoints(currentDataSet.proSleepLvl),
            proRemLine: this.removeExtraPoints(currentDataSet.proRemLine),
            proHatOffLine: this.removeExtraPoints(currentDataSet.proHatOffLine),
            proTimeToBed: currentDataSet.proTimeToBed
        }
        return returnObj;
    }

    removeExtraPoints(array) {
        var newArray = [];
        for (var i = 0, arrLen = array.length; i < arrLen; i += 4) {
        newArray.push(array[i]);
        }
        newArray[newArray.length - 1] = 100;
        return newArray;
    };

    createLineConfig(currentDataSet) {
        let data = this.createLineData(currentDataSet);
        return {
            chart: {
                backgroundColor: 'transparent',
                type: 'spline',
                plotBackgroundColor: {
                    linearGradient: {
                        x1: 0,
                        x2: 0,
                        y1: 0,
                        y2: 1
                    },
                    stops: [
                        [
                            0, '#FFEC91'
                        ],
                        [
                            0.055, '#FFEC91'
                        ],
                        [
                            0.22, '#98d0ed'
                        ],
                        [
                            0.45, '#5b7ba1'
                        ],
                        [
                            0.785, '#33495d'
                        ],
                        [1, '#33495d']
                    ]
                },
                plotBorderWidth: 1,
                plotBorderColor: '#33495d',
                marginRight: 0,
                marginLeft: 0,
                spacing: [
                    0, 0, 0, 0
                ],
                animation: true
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                spline: {
                    connectNulls: false,
                    marker: {
                        enabled: false
                    },
                    enableMouseTracking: false,
                    turboThreshold: 0,
                    pointStart:data.proTimeToBed,
                    pointInterval: 60 * 1000,
                    tickInterval: 2 * 1000

                },
                lineColor: '#33495d',
                lineWidth: 1
            },
            title: { text: '' },
            legend: {
                enabled: true,
                align: 'left',
                verticalAlign: 'bottom',
                layout: 'vertical',
                x: 0,
                y: -20,
                floating: true,
                itemStyle: {
                    textShadow: false,
                    color: 'white'
                }
            },
            xAxis: {
                type: 'datetime',

                // dateTimeLabelFormats: { // English
                // day: $scope.dateFormat,
                // hour:  $scope.dateFormat,
                // minute:  $scope.dateFormat,
                // second:  $scope.dateFormat,

                // },

                dateTimeLabelFormats: { // English
                    day: '%l %p',
                    hour: '%l %p',
                    minute: '%l %p',
                    second: '%l %p'
                },
                tickInterval: 2 * 3600 * 1000,
                lineWidth: 2,
                lineColor: '#33495d',
                labels: {
                    style: {
                        'color': 'white'
                    }
                }

            },
            yAxis: {
                title: {
                    text: ''
                },
                min: 0,
                max: 100,
                gridLineColor: 'none',
                //tickAmount: 4,
                //tickInterval: 33,
                plotLines: [
                    {
                        color: 'transparent',
                        label: {
                            text: 'Light',
                            align: 'center',
                            x: 0,
                            y: -5,
                            style: {
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: 20 + "px",
                                //textShadow: '0px 0px #000'
                            }
                        },
                        width: 1,
                        //color: 'rgba(0,0,0,0.2)',
                        value: 33
                        //to: 5,
                    }, {
                        color: 'transparent',
                        width: 1,
                        label: {
                            text: 'Deep',
                            align: 'center',
                            x: 0,
                            y: -5,
                            style: {
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: 20 + "px",
                                //textShadow: '0px 0px #000'
                            }
                        },
                        //color: 'rgba(0,0,0,0.2)',
                        value: 0
                        //to: 5,
                    }, {
                        color: 'transparent',
                        width: 1,
                        label: {
                            text: 'Restless',
                            align: 'center',
                            x: 0,
                            y: 0,
                            style: {
                                color: 'rgba(255,255,255,.7)',
                                fontSize: 20 + "px",
                                //textShadow: '1px 1px #000'
                            }
                        },
                        //color: 'rgba(0,0,0,0.2)',
                        value: 66
                    }, {
                        color: 'transparent',
                        width: 1,
                        label: {
                            text: 'Awake',
                            align: 'center',
                            x: 0,
                            y: -0,
                            style: {
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: 20 + "px",
                                //textShadow: '0px 0px #000'
                            }
                        },
                        //color: 'rgba(0,0,0,0.2)',
                        value: 86
                    }
                ]

            },
            series: [
                {
                    //data: 	[10,20,30,40,50,60,70,80,90],
                    data: data.proSleepLvl,
                    //color: Highcharts.getOptions().colors[0],
                    color: 'black',
                    showInLegend: false
                }, {
                    name: 'REM',
                    data: data.proRemLine,
                    // data: 	[null, 20,30,null,null,null,null,null,null],
                    color: 'white',
                    showInLegend: true

                }, {
                    name: 'Bad Sig',
                    data: data.proHatOffLine,
                    // data: 	[null, null,null,null,null,null,70,80,90],
                    color: hcharts.getOptions().colors[6],
                    showInLegend: true,
                    dashStyle: 'dash'
                }
            ]
        }
    }
}