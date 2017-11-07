import { Component, Input, OnChanges } from '@angular/core';
import { NativeService } from '../../providers/NativeService';
import * as _ from 'lodash';
declare let $: any;
declare let enableInlineVideo: any;

@Component({
    selector: 'page-video-player',
    templateUrl: './video-player.component.html'
})
export class VideoPlayerComponent implements OnChanges {
    @Input() videoConfig: any;
    player: any;
    isPlay = false;
    currentTime = '00';
    totalTime = '00';
    hasError = false;
    duration = 0;
    saturation = 0;
    rangeTouch = false;
    seeking = false;
    touch_end: any;

    constructor(
        private nativeService: NativeService
    ) {
    }

    ngOnChanges() {
        this.videoConfig = this.videoConfig;
        setTimeout(() => {
            this.initVideo();
        }, 200);

    }

    initVideo() {
        if (this.nativeService.isIos()) {
            enableInlineVideo(document.getElementById(this.videoConfig.id).getElementsByClassName('video-current')[0]);
        }
        this.player = document.getElementById(this.videoConfig.id).getElementsByClassName('video-current')[0];
        this.addVideoListeners();
        if (this.videoConfig.autoplay) {
            this.player.play();
        }
    }

    addVideoListeners() {
        this.player.onloadstart = () => {
            console.log('$$$ videoElement::loadstart');
        };

        this.player.onloadeddata = () => {
            console.log('$$$ videoElement::loadeddata');
        };

        this.player.onwaiting = () => {
            this.seeking = true;
            console.log('$$$ videoElement::waiting');
        };

        this.player.oncanplay = () => {
            this.seeking = false;
            console.log('$$$ audioElement::canplay');
        };

        this.player.ondurationchange = () => {
            this.hasError = false;
            this.duration = Math.floor(this.player.duration);
            this.totalTime = Math.floor(this.duration / 60) + ':' + Math.floor(this.duration % 60);
            console.log('$$$ audioElement::durationchange');
        };

        this.player.ontimeupdate = () => {
            if (!this.rangeTouch) {
                this.saturation = Math.floor(this.player.currentTime);
                this.currentTime = Math.floor(this.saturation / 60) + ':' + Math.floor(this.saturation % 60);
            }
        };

        this.player.onplaying = () => {
            console.log('$$$ videoElement::playing');
            this.isPlay = true;
        };

        this.player.onpause = () => {
            console.log('$$$ videoElement::pause');
            this.isPlay = false;
        };

        // 播放结束
        this.player.onended = () => {
            console.log('$$$ videoElement::播放结束');
            this.isPlay = false;
        };
        // 网速失速
        this.player.onstalled = () => {
            console.log('$$$ videoElement::stalled');
        };
        // 客户端主动终止下载（不是因为错误引起）
        this.player.onabort = () => {
            console.log('$$$ videoElement::abort');
            this.isPlay = false;
        };
        // 请求数据时遇到错误
        this.player.onerror = () => {
            console.log('$$$ videoElement::error');
            this.isPlay = false;
            this.hasError = true;
        };
    }

    touchStart() {
        clearInterval(this.touch_end);
        $(`#${this.videoConfig.id} .video-player-controller`).animate({ bottom: '0' });
    }
    touchEnd() {
        this.touch_end = setTimeout(() => {
            $(`#${this.videoConfig.id} .video-player-controller`).animate({ bottom: '-50px' });
        }, 5000);
    }

    toPlay() {
        if (!this.hasError) {
            if (this.isPlay) {
                this.player.pause();
            } else {
                this.player.play();
            }
        } else {
            this.player.play();
        }
    }

    rangeTouchStart() {
        this.rangeTouch = true;
    }

    rangeTouchEnd() {
        setTimeout(() => {
            this.rangeTouch = false;
            this.player.currentTime = this.saturation;
        }, 1000);
    }


}
