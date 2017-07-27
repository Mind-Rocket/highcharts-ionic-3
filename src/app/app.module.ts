import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BLE } from '@ionic-native/ble';

import { SuperTabsModule } from 'ionic2-super-tabs';
import { ChartModule } from 'angular2-highcharts'

import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { SummaryPage } from '../pages/summary/summary';
import { TrendsPage } from '../pages/trends/trends';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { LabPage } from './../pages/lab/lab';
import { LogPage } from './../pages/log/log';
import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';

import { DataService } from '../services/data.service';
import { APIService } from './../services/api.service';

declare var require: any;
var hcharts = require('highcharts');

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    SummaryPage,
    TrendsPage,
    BluetoothPage,
    LogPage,
    LabPage,
    LoginPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    ReactiveFormsModule,
    ChartModule.forRoot(hcharts)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SummaryPage,
    TrendsPage,
    TabsPage,
    BluetoothPage,
    LogPage,
    LabPage,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BLE,
    DataService,
    APIService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
