import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BLE } from '@ionic-native/ble';

import { SuperTabsModule } from 'ionic2-super-tabs';

import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { SummaryPage } from '../pages/summary/summary';
import { TrendsPage } from '../pages/trends/trends';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { LabPage } from './../pages/lab/lab';
import { LogPage } from './../pages/log/log';


import { DataService } from '../services/data.service';

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
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot()
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
