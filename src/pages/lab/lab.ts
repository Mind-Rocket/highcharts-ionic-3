import { PlotService } from './../../services/plot.service';
import { DataService } from './../../services/data.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var require: any;
var hcharts = require('highcharts');

@IonicPage()
@Component({
  selector: 'page-lab',
  templateUrl: 'lab.html',
})
export class LabPage {
  @ViewChild('lineChart') chart: ElementRef;
  chartObject: any;
  data: any;
  currentDataSet: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService: DataService, private plotService: PlotService) {
    this.currentDataSet = this.dataService.processData[this.dataService.currentDataSet];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabPage');
  }

  ionViewDidEnter() {
    console.log('lab page - view did enter', this.dataService.currentDataSet);
    console.log(this.currentDataSet);
    this.currentDataSet = this.dataService.processData[this.dataService.currentDataSet];
    this.renderChart();
  }

  incrementCurrentDataSet() {
    this.dataService.currentDataSet++;
    this.currentDataSet = this.dataService.processData[this.dataService.currentDataSet];
    this.renderChart();
  }

  decrementCurrentDataSet() {
    this.dataService.currentDataSet--;
    this.currentDataSet = this.dataService.processData[this.dataService.currentDataSet];
    this.renderChart();
  }

  renderChart() {
    this.chartObject = hcharts.chart(this.chart.nativeElement, this.plotService.createLineConfig(this.currentDataSet));
  }
}
