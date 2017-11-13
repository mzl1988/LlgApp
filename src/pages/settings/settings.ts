import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NativeService } from '../../providers/NativeService';
declare let $: any;

@IonicPage({
    priority: 'off',
    name: 'SettingsPage',
    segment: 'settings'
})
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {

    constructor(
        private nativeService: NativeService
    ) {

    }

    ionViewDidLoad() {
    }
}
