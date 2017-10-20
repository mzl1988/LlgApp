import { Component, ViewChild } from '@angular/core';
import { Platform, IonicPage, Tabs } from 'ionic-angular';

import { BackButtonService } from '../../providers/BackButtonService';

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
        platform: Platform
    ) {
        this.tabRoots = [
            {
                root: 'FilmPage',
                tabTitle: '电影',
                tabIcon: 'film'
            },
            {
                root: 'BookPage',
                tabTitle: '读书',
                tabIcon: 'book'
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
            backButtonService.registerBackButtonAction(this.tabRef);
        });
    }
}
