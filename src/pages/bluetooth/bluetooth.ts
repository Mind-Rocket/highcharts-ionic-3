import { BLECommandsService } from './../../services/bleCommands.service';
import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble'

@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html',
  styleUrls: ['/bluetooth.scss']
})
export class BluetoothPage implements OnDestroy{
  isEnabled;
  foundDevices = [];
  bleStatus = '';
  loading;
  connectedTo = [];
  subscription;

  constructor(public navCtrl: NavController, private ble: BLE, private ref: ChangeDetectorRef, public loadingCtrl: LoadingController, private bleCommandsService: BLECommandsService) {
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
    this.bleStatus = 'scanning';

    this.presentLoader(this.bleStatus);

    console.log('starting scan, resetting foundDevices');
    this.foundDevices = [];
    this.connectedTo = [];
    var scanTime = 5;

    setTimeout(() => {
      this.handleScanStop();
    }, scanTime*1000 + 10);

    this.subscription = this.ble.scan([], scanTime).subscribe(
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

  presentLoader(content){
    this.loading = this.loadingCtrl.create({
      content
    });

    this.loading.present();
  }

  handleScanStop(){
    console.log('scan is over');
    this.bleStatus = 'connecting';

    this.loading.dismiss();

    this.connect(this.foundDevices[0]);

    setTimeout(() => {
      this.presentLoader(this.bleStatus);
    },10);
  }

  connect(device){
    console.log("need to connect to device", device);
    this.ble.isConnected(device.id).then((res) => {
        console.log('Connected => disconnect now');
        this.ble.disconnect(device.id);
        this.connectedTo = this.connectedTo.filter((connectedDevice) => {
          return connectedDevice !== device.id;
        });
        this.ref.detectChanges();
        console.log('connectedTo', this.connectedTo);
    }, (err) => {
      console.log('Not connected => connect!');

      this.subscription = this.ble.connect(device.id).subscribe(
        (res) => {
          console.log('BLE connect success', res);
          this.sendConfirm(device.id);
          this.subscription = this.ble.startNotification(device.id, "ffe0", "ffe1").subscribe(
            res => {
              console.log('notification res', this.bytesToString(res));
              this.connectedTo.push(res.id);
              
              this.loading.dismiss();
              this.ref.detectChanges();
              this.ble.writeWithoutResponse(device.id, "ffe0", "ffe1", this.bleCommandsService.commands.getVolume.buffer).then(
                (res) => {
                  console.log('write getVolume success', res);
                }, (err) => {
                  console.log('write getVolume error', err);
                }
              );
            },

            error => {
              console.log('notification error', error);
            }
          )

         
        },
        error => {
          console.log('connect error', error);
        }
      );

    });

  }
  bytesToString(buffer) {
    return new Uint8Array(buffer);
    // return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }
  sendConfirm(deviceId){
    this.ble.writeWithoutResponse(deviceId, "ffe0", "ffe1", this.bleCommandsService.commands.confirm.buffer).then(
      (res) => {
        console.log('write success', res);
      }, (err) => {
        console.log('write error', err);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

}
