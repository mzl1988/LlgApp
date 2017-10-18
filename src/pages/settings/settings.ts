import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
        navParams: NavParams,
        private storage: Storage
    ) {
        console.log(navParams);
        
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingPage');
    }
}
