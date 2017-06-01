import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var require: any;
var hcharts = require('highcharts');

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
  styleUrls: ['/summary.scss']
})
export class SummaryPage {
  @ViewChild('pieChart') chart: ElementRef;
  chartObject: any;
  data = [29.9, 71.5, 106.4, 129.2, 300];

  constructor(public navCtrl: NavController) {

  }

  ngAfterViewInit() {
    console.log('after view init');
    this.renderChart();
  }

  ionViewDidLoad(){
    console.log('view did load');
  }

  renderChart(){
    this.chartObject = hcharts.chart(this.chart.nativeElement, {
      chart: {
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
      title: { text: 'simple chart' },
      series: [{
        data: this.data,
      }]
    });
  }

  updateChart(){
    this.data.push(500);
    this.renderChart();
  }

}
