import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage({
    priority: 'off',
    name: 'SettingsPage',
    segment: 'settings/:id'
})
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {

    constructor(
        navParams: NavParams
    ) {
        console.log(navParams);

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingPage');
    }
}
