import { Component, ViewChild } from '@angular/core';
import { Platform, IonicPage, Tabs } from 'ionic-angular';

import { BackButtonService } from '../../providers/BackButtonService';
import { NativeService } from '../../providers/NativeService';

@IonicPage({
    priority: 'high'
})
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    tabRoots: any[];
    @ViewChild('myTabs') tabRef: Tabs;

    constructor(
        backButtonService: BackButtonService,
        nativeService: NativeService,
        platform: Platform
    ) {
        this.tabRoots = [
            {
                root: 'FilmPage',
                tabTitle: '电影',
                tabIcon: 'film'
            },
            {
                root: 'RadioPage',
                tabTitle: '电台',
                tabIcon: 'radio'
            },
            {
                root: 'MusicPage',
                tabTitle: '音乐',
                tabIcon: 'musical-notes'
            },
            {
                root: 'MinePage',
                tabTitle: '我的',
                tabIcon: 'person'
            }
        ];
        platform.ready().then(() => {
            if(nativeService.isAndroid()) {
                backButtonService.registerBackButtonAction(this.tabRef);
            }
        });
    }
}
