export class BLECommandsService {
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
}