import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeService } from '../../providers/NativeService';
import * as _ from 'lodash';
declare let $: any;
declare let enableInlineVideo: any;

@Component({
    selector: 'page-video-player',
    templateUrl: './video-player.component.html'
})
export class VideoPlayerComponent implements OnChanges, OnDestroy {
    @Input() videoConfig: any;
    player: any;
    isPlay = false;
    currentTime = '00';
    totalTime = '00';
    hasError = false;
    duration = 100;
    saturation = 0;
    rangeTouch = false;
    seeking = false;
    touch_end: any;
    lastPlayPos = 0;
    currentPlayPos = 0;
    checkLoading: any;
    fulled = false;
    scrollTop: number;

    constructor(
        private nativeService: NativeService,
        private statusBar: StatusBar,
        private screenOrientation: ScreenOrientation
    ) {
    }

    ngOnChanges() {
        setTimeout(() => {
            this.initVideo();
        }, 200);
    }

    ngOnDestroy() {
        if (this.player) {
            this.player.pause();
            this.player.src = '';
            this.player.load();
        }
    }

    initVideo() {
        if (this.nativeService.isIos()) {
            enableInlineVideo(document.getElementById(this.videoConfig.id).getElementsByClassName('video-current')[0]);
        }
        this.player = document.getElementById(this.videoConfig.id).getElementsByClassName('video-current')[0];
        this.player.muted = false;
        this.touch_end = setTimeout(() => {
            $(`#${this.videoConfig.id} .video-player-controller`).animate({ bottom: '-44px' });
        }, 4000);
        this.addVideoListeners();
        if (this.videoConfig.autoplay) {
            this.player.play();
        }
    }

    setCheckLoadingTime() {
        this.checkLoading = setInterval(() => {
            this.currentPlayPos = this.player.currentTime;
            if (!this.seeking
                && this.currentPlayPos === this.lastPlayPos
                && !this.player.paused) {
                this.seeking = true;
            }
            if (this.seeking
                && this.currentPlayPos > this.lastPlayPos
                && !this.player.paused) {
                this.seeking = false;
            }
            this.lastPlayPos = this.currentPlayPos;
        }, 100);
    }

    clearCheckLoadingTime() {
        clearInterval(this.checkLoading);
    }

    addVideoListeners() {
        this.player.onloadstart = () => {
            console.log('$$$ videoElement::loadstart');
        };

        this.player.onloadeddata = () => {
            console.log('$$$ videoElement::loadeddata');
        };

        // this.player.onwaiting = () => {
        //     this.seeking = true;
        //     console.log('$$$ videoElement::waiting');
        // };

        // this.player.oncanplay = () => {
        //     this.seeking = false;
        //     console.log('$$$ videoElement::canplay');
        // };

        this.player.ondurationchange = () => {
            this.hasError = false;
            this.duration = Math.floor(this.player.duration);
            this.totalTime = Math.floor(this.duration / 60) + ':' + Math.floor(this.duration % 60);
            console.log('$$$ videoElement::durationchange');
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
            this.clearCheckLoadingTime();
            this.setCheckLoadingTime();
        };

        this.player.onpause = () => {
            console.log('$$$ videoElement::pause');
            this.isPlay = false;
            this.clearCheckLoadingTime();
            this.setCheckLoadingTime();
        };

        // 播放结束
        this.player.onended = () => {
            console.log('$$$ videoElement::播放结束');
            this.isPlay = false;
            this.seeking = false;
            this.clearCheckLoadingTime();
        };
        // 网速失速
        this.player.onstalled = () => {
            console.log('$$$ videoElement::stalled');
        };
        // 客户端主动终止下载（不是因为错误引起）
        this.player.onabort = () => {
            console.log('$$$ videoElement::abort');
            this.isPlay = false;
            this.seeking = false;
            this.clearCheckLoadingTime();
        };
        // 请求数据时遇到错误
        this.player.onerror = () => {
            console.log('$$$ videoElement::error');
            this.isPlay = false;
            this.seeking = false;
            this.clearCheckLoadingTime();
            this.hasError = true;
        };
    }

    touchStart() {
        clearInterval(this.touch_end);
        $(`#${this.videoConfig.id} .video-player-controller`).animate({ bottom: '0' });
    }
    touchEnd() {
        this.touch_end = setTimeout(() => {
            $(`#${this.videoConfig.id} .video-player-controller`).animate({ bottom: '-44px' });
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

    toFull() {
        if (!this.fulled) {
            let scroll = $(`${this.videoConfig.page} .scroll-content`)[0];
            this.scrollTop = scroll.scrollTop;
            $(`${this.videoConfig.page} ion-header`).hide();
            $(`.ios .tabs .tabbar`).hide();
            this.fulled = true;
            if (this.nativeService.isMobile()) {
                this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
            }
            $(`${this.videoConfig.page} #${this.videoConfig.id}`).animate({
                'z-index': 100000,
                'left': 0,
                'top': 0,
                'width': '100%',
                'height': '100%',
            }).css({ 'position': 'fixed' });
        } else {
            $(`${this.videoConfig.page} #${this.videoConfig.id}`).removeAttr('style');
            $(`${this.videoConfig.page} ion-header`).show();
            $(`.ios .tabs .tabbar`).show();
            this.fulled = false;
            if (this.nativeService.isMobile()) {
                this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
            }
            setTimeout(() => {
                let scroll = $(`${this.videoConfig.page} .scroll-content`)[0];
                $(scroll).scrollTop(this.scrollTop);
            }, 200);
        }

    }
}
