import { Component } from '@angular/core';
import { IonicPage, App } from 'ionic-angular';

@IonicPage({
    priority: 'low', // high > low > off(链接将不会加载)
    name: 'MusicPage',
    segment: 'tabs/music'
})
@Component({
    selector: 'page-music',
    templateUrl: 'music.html'
})
export class MusicPage {

    constructor(
        private appCtrl: App
    ) {
    }

    ionViewDidEnter() {
        this.appCtrl.setTitle('音乐');
    }

    ionViewDidLoad() {
    }
}
