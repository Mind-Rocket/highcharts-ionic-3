import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { PlotService } from './../../services/plot.service';

declare var require: any;
var hcharts = require('highcharts');

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
  styleUrls: ['/summary.scss']
})
export class SummaryPage{
  @ViewChild('pieChart') chart: ElementRef;
  chartObject: any;
  data: any;
  currentDataSet: any;

  constructor( public navCtrl: NavController, private dataService: DataService, private plotService: PlotService ) {
    console.log('in summary constructor');
    this.currentDataSet = this.dataService.processData[this.dataService.currentDataSet];
    this.updatePieData();
  }

  incrementCurrentDataSet() {
    this.dataService.currentDataSet++;
    this.currentDataSet = this.dataService.processData[this.dataService.currentDataSet];
    this.updateChart();
  }

  decrementCurrentDataSet() {
    this.dataService.currentDataSet--;
    this.currentDataSet = this.dataService.processData[this.dataService.currentDataSet];
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

  ionViewDidEnter() {
    console.log('summary page - view did enter', this.dataService.currentDataSet);
    this.currentDataSet = this.dataService.processData[this.dataService.currentDataSet];
    this.renderChart();
  }

  updateChart() {
    console.log("update chart", this.chartObject);
    this.updatePieData();
    this.chartObject.series[0].update({
        data: this.plotService.createPieData(this.data),
    });
  }

  renderChart(){
    this.chartObject = hcharts.chart(this.chart.nativeElement, this.plotService.createPieConfig(this.data));
  }
  

}
