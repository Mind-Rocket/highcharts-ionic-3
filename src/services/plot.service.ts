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
                zoomType: 'x',
                events: {
                    load: function () {
                        var self = this;
                        setTimeout(function () {
                            self.reflow();
                        }, 100)
                    }
                }
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
}