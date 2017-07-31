import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';
import { BluetoothPage } from './../pages/bluetooth/bluetooth';
import { TabsPage } from './../pages/tabs/tabs';


declare var require;
var hcharts = require('highcharts');
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  @ViewChild(Nav) nav;
  bluetoothPage = BluetoothPage;
  tabsPage = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      hcharts.setOptions({
        colors: ['#33495d', '#63a2c5', '#FBE372', '#33495d', '#d6e7c5', '#63a2c5', '#A0A0A0 ', '#667786', '#5b7ba1'],
        global: {
          useUTC: false
        }
      });
  });
}

onSetPage(page) {
  this.menuCtrl.close();
  this.nav.setRoot(page);
}

onLogout() {
  console.log('logging out');
  this.menuCtrl.close();
  this.nav.setRoot(LoginPage);
}
}
