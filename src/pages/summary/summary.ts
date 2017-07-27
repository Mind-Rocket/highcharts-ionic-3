import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../services/data.service';

declare var require: any;
var hcharts = require('highcharts');

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
  styleUrls: ['/summary.scss']
})
export class SummaryPage implements AfterViewInit{
  @ViewChild('pieChart') chart: ElementRef;
  chartObject: any;
  data = [29.9, 71.5, 106.4, 129.2, 300];
  currentDataSet: any;

  constructor(public navCtrl: NavController, private dataService: DataService) {
    console.log('in summary constructor');
    this.currentDataSet = this.dataService.processData[this.dataService.currentDataSet];
    
    this.updatePieData();

    
  }
  options;
  chart2: Object;
  saveChart(chart) {
    this.chart2 = chart;
  }

  incrementCurrentDataSet() {
    this.dataService.currentDataSet++;
    this.currentDataSet = this.dataService.processData[this.dataService.currentDataSet];
    this.updatePieData();
    this.updateChart();
  }

  decrementCurrentDataSet() {
    this.dataService.currentDataSet--;
    this.currentDataSet = this.dataService.processData[this.dataService.currentDataSet];
    this.updatePieData();
    this.updateChart();
  }

  updatePieData() {
    this.data = [
      this.currentDataSet.proSleepLvlDeep, 
      this.currentDataSet.proSleepLvlLight, 
      this.currentDataSet.proSleepLvlRestless, 
      this.currentDataSet.proSleepLvlAwake, 
      this.currentDataSet.proSleepLvlNoEEG, 
      (this.currentDataSet.proSleepLvlDeep + 
        this.currentDataSet.proSleepLvlLight + 
        this.currentDataSet.proSleepLvlRestless + 
        this.currentDataSet.proSleepLvlAwake + 
        this.currentDataSet.proSleepLvlNoEEG) * (100/this.currentDataSet.proQualityScore - 1)
    ];
  }

  ngAfterViewInit() {
     this.options = {
      title : { text : 'angular2-highcharts example' },
      series: [{
          name: 's1',
          data: [2,3,5,8,13],
          allowPointSelect: true
      },{
          name: 's2',
          data: [-2,-3,-5,-8,-13],
          allowPointSelect: true
      }]
    };
  }

  ionViewDidEnter() {
    console.log('summary page - view did enter');
    this.renderChart();
  }

  updateChart() {
    console.log("update chart", this.chartObject);
    this.chartObject.series[0].update({
        data: this.createPieData(this.data),
    });
  }

  renderChart(){
    hcharts.setOptions({
      colors: ['#33495d', '#63a2c5', '#FBE372', '#33495d', '#d6e7c5', '#63a2c5', '#A0A0A0 ','#667786','#5b7ba1']
    });
    this.chartObject = hcharts.chart(this.chart.nativeElement, {
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
      // colors: [hcharts.getOptions().colors[0],hcharts.getOptions().colors[8],hcharts.getOptions().colors[1],hcharts.getOptions().colors[2],hcharts.getOptions().colors[6], 'transparent'],
      credits: {
        enabled: false
      },
      plotOptions: {
        pie:{
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
        data: this.createPieData(this.data),
      }]
    });
  }

  // updateChart(){
  //   this.data.push(500);
  //   this.renderChart();
  // }

  createPieData(arr){
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

}
