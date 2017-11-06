import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NativeService } from '../../providers/NativeService';
declare let $: any;
declare let DPlayer: any;
declare let enableInlineVideo: any;

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
        private nativeService: NativeService
    ) {
        console.log(navParams);

    }

    ionViewDidLoad() {
        let dp = new DPlayer({
            container: document.getElementById('dplayer'),
            video: {
                url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
                pic: 'http://www.mediaelementjs.com/images/big_buck_bunny.jpg'
            },
            autoplay: false,
            lang: 'zh-cn',
            iconsColor: '#42bd56'
        });
        setTimeout(() => {
            $('#dplayer button.dplayer-full-icon').remove();
            // 解决 ios 不能自动播放和禁止播放自动进入全屏
            if (this.nativeService.isIos()) {
                enableInlineVideo(document.getElementById('dplayer').getElementsByClassName('dplayer-video')[0]);
            }
            dp.play();
        }, 200);
    }
}
