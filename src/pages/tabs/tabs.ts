import { Component, ViewChild } from '@angular/core';
import { IonicPage, Platform, Tabs } from 'ionic-angular';

import { BackButtonService } from "../../providers/BackButtonService";

@IonicPage()
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    tabRoots: any[];
    @ViewChild('myTabs') tabRef: Tabs;

    constructor(
        backButtonService: BackButtonService,
        platform: Platform
    ) {
        this.tabRoots = [
            {
                root: 'HomePage',
                tabTitle: '首页',
                tabIcon: 'home'
            },
            {
                root: 'AboutPage',
                tabTitle: '关于',
                tabIcon: 'information-circle'
            },
            {
                root: 'MinePage',
                tabTitle: '我的',
                tabIcon: 'contacts'
            }
        ];
        platform.ready().then(() => {
            backButtonService.registerBackButtonAction(this.tabRef);
        });
    }
}
