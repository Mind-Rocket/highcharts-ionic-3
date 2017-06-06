import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble'

@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html',
  styleUrls: ['/bluetooth.scss']
})
export class BluetoothPage {
  isEnabled;
  foundDevices = [];

  constructor(public navCtrl: NavController, private ble: BLE, private ref: ChangeDetectorRef) {
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

  startScan(){
    console.log('starting scan, resetting foundDevices');
    this.foundDevices = [];
    let subscription = this.ble.scan([], 5).subscribe(
      (res) => {
        console.log('BLE scan success', res);
        if (res.name && res.name === "SSV1_00000"){
          console.log('SSB found! Adding to list of found devices');
          this.foundDevices.push(res);
          this.ref.detectChanges();
        }
      }
    );
  }

  connect(device){
    console.log("need to connect to device", device);
    this.ble.isConnected(device.id).then((res) => {
        console.log('Connected => disconnect now');
        this.ble.disconnect(device.id);
    }, (err) => {
      console.log('Not connected => connect!');

      let subscription = this.ble.connect(device.id).subscribe(
        (res) => {
          console.log('BLE connect success', res);
          this.sendConfirm(device.id);
        }
      );

    });

  }

  sendConfirm(deviceId){
    let confirmCommand = new Uint8Array([0xAA, 0xAA, 0x03, 0x9A, 0x10, 0x01, 0x54]);
    this.ble.writeWithoutResponse(deviceId, "ffe0", "ffe1", confirmCommand.buffer).then(
      (res) => {
        console.log('write success', res);
      }, (err) => {
        console.log('write error', err);
      }
    );
  }

}
