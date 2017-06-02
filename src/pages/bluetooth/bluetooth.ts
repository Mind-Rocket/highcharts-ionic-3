import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble'

@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html',
  styleUrls: ['/bluetooth.scss']
})
export class BluetoothPage {
  isEnabled;
  constructor(public navCtrl: NavController, private ble: BLE) {
  }

  ionViewDidEnter(){
    this.ble.isEnabled().then((res) => {
      //alert('BLE isEnabled' + JSON.stringify(res));
      console.log('setting isEnabled to', res);
      this.isEnabled = res;
    }).catch((error) => {
      //alert('BLE isEnabled error'+ JSON.stringify(error));
      this.isEnabled = error;
    });
  }

}
