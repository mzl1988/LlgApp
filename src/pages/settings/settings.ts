import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {

    constructor(
        private storage: Storage
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingPage');
    }
}
