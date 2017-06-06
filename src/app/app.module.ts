import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { SummaryPage } from '../pages/summary/summary';
import { TrendsPage } from '../pages/trends/trends';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { ChartModule } from 'angular2-highcharts';
import { BLE } from '@ionic-native/ble';
import { DataService } from '../services/data.service';

// declare var require: any;

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    SummaryPage,
    TrendsPage,
    BluetoothPage
  ],
  imports: [
    BrowserModule,
    // ChartModule.forRoot(require('highcharts')),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SummaryPage,
    TrendsPage,
    TabsPage,
    BluetoothPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BLE,
    DataService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
