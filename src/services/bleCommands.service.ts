import { BLE } from '@ionic-native/ble';
import { Injectable } from '@angular/core';
@Injectable()
export class BLECommandsService {

    deviceId = "";

    constructor(private ble:BLE){}

    commands = {
        confirm: new Uint8Array([0xAA, 0xAA, 0x03, 0x9A, 0x10, 0x01, 0x54]), // includes checksum
        getVolume: new Uint8Array([0xAA, 0xAA, 0x03, 0x84, 0x20, 0x00, this.getChecksum([0xAA, 0xAA, 0x03, 0x84, 0x20, 0x00])])
    }

    getChecksum(array) {
        var sum = array.reduce(function(pv, cv) {
        return pv + cv;
        }, 0);
        return 255 - sum % 256;
    }

    intToBytes(number, arrayLen) {
        var hex = number.toString(16);
        if (hex.length % 2) {
        hex = '0' + hex;
        }
        var array = hex.match(/.{1,2}/g); //.map(function(entry){return parseInt(entry,16);});
        while (array.length < arrayLen) {
        array.unshift("00");
        }
        return array;
    }

    createEndSleep(){
        let now = new Date().getTime();
        let cmd = [0xAA, 0xAA, 0x08, 0x83, 0x10];
        cmd = [...cmd, ...this.intToBytes(now, 6)];

        let checksum = this.getChecksum(cmd);
        cmd = [...cmd, checksum];

        return new Uint8Array(cmd);
    }

    volumeConnect() {
        //this.subscription = this.ble.connect()
    }

    connectAndStartNotify() {
        return this.ble.connect(this.deviceId).flatMap(
            res => {
                console.log('connected', res);
                this.sendConfirm();
                return this.ble.startNotification(this.deviceId, "ffe0", "ffe1").map(res => res.json());
            },

            error => {
                console.log('error in connecting', error);
                return false;
            }
        )
    }

    sendConfirm(){
        this.ble.writeWithoutResponse(this.deviceId, "ffe0", "ffe1", this.commands.confirm.buffer).then(
        (res) => {
            console.log('write success', res);
        }, (err) => {
            console.log('write error', err);
        }
        );
    }
}