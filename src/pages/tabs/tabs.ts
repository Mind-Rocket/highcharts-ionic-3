import { Component } from '@angular/core';

import { SummaryPage } from '../summary/summary';
import {TrendsPage} from '../trends/trends';
import {BluetoothPage} from '../bluetooth/bluetooth';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SummaryPage;
  tab2Root = TrendsPage;
  tab3Root = BluetoothPage;

  constructor() {

  }
}
