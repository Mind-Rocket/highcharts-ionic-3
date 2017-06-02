import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var require: any;
var hcharts = require('highcharts');

@Component({
  selector: 'page-trends',
  templateUrl: 'trends.html',
  styleUrls: ['/trends.scss']
})
export class TrendsPage {
  @ViewChild('columnChart') chart: ElementRef;
  chartObject: any;
  data = [29.9, 71.5, 106.4, 129.2, 300];

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter(){
    this.renderChart();
  }

  renderChart(){
    this.chartObject = hcharts.chart(this.chart.nativeElement, {
      chart: {
        /*zoomType: 'x',
        events: {
          load: function () {
            var self = this;
            setTimeout(function () {
              self.reflow();
            }, 100)
          }
        }*/
        type: 'column'
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
