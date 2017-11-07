import { Component } from '@angular/core';
import { IonicPage, App } from 'ionic-angular';
import 'rxjs/add/operator/finally';

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
    videoConfig = {
        id: 'player_1',
        autoplay: true,
        poster: 'http://www.mediaelementjs.com/images/big_buck_bunny.jpg',
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
    };

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
