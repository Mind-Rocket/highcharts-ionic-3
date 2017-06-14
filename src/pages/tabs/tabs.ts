import { Component } from '@angular/core';

import { SummaryPage } from '../summary/summary';
import {TrendsPage} from '../trends/trends';
import {BluetoothPage} from '../bluetooth/bluetooth';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  currentTab: string = "Summary";

  tab1Root = SummaryPage;
  tab2Root = TrendsPage;
  tab3Root = BluetoothPage;

  constructor() {

  }

  onTabSelect(ev: any){
    console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
    this.currentTab = ev.id;
  }
}
