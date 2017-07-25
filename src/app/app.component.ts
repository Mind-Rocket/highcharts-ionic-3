import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';
import { BluetoothPage } from './../pages/bluetooth/bluetooth';
import { TabsPage } from './../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  @ViewChild(Nav) nav;
  bluetoothPage = BluetoothPage;
  tabsPage = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
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
