import { Component } from '@angular/core';

import { SummaryPage } from '../summary/summary';
import { TrendsPage } from '../trends/trends';
import { LogPage } from './../log/log';
import { LabPage } from './../lab/lab';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  currentTab: string = "Summary";

  tab1Root = SummaryPage;
  tab2Root = LabPage;
  tab3Root = TrendsPage;
  tab4Root = LogPage;

  constructor() {

  }

  onTabSelect(ev: any){
    console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
    this.currentTab = ev.id;
  }
}
