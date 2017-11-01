import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, Slides, App } from 'ionic-angular';
import { NativeService } from '../../providers/NativeService';
declare let $: any;
import _ from 'lodash';

@IonicPage({
    priority: 'off', // high > low > off(链接将不会加载)
    name: 'RadioAudioPage',
    segment: 'radio-audio/:id'
})
@Component({
    selector: 'page-radio-audio',
    templateUrl: 'radio-audio.html'
})
export class RadioAudioPage {
    @ViewChild(Slides) slides: Slides;
    type: string;
    id: number;
    audioIndex = 0;
    audio: any;
    audios: any = [];
    audioPlayer: any;
    isPlay = false;
    seeking = false;
    currentTime = '00';
    totalTime = '00';
    hasError = false;
    duration = 0;
    saturation = 0;
    rangeTouch = false;
    constructor(
        private appCtrl: App,
        nativeService: NativeService,
        navParams: NavParams
    ) {
        this.id = navParams.data.id;
        nativeService.getStorage('audios').then((audios) => {
            if (audios) {
                this.audios = audios;
                this.findAudio();
            }
        });

    }

    ionViewDidLoad() {
    }

    slideChanged() {
        this.audioIndex = this.slides.getActiveIndex();
        this.audio = this.audios[this.audioIndex];
        this.appCtrl.setTitle(this.audio.audioName);
        $('page-radio-audio ion-content').backgroundBlur(this.audio.audioPic);
    }

    // 上一
    audioBackward() {
        this.slides.slideTo(this.audioIndex - 1, 500);
    }
    // 下一
    audioForward() {
        this.slides.slideTo(this.audioIndex + 1, 500);
    }

    touchStart() {
        // console.log('1111111'); 
    }
    touchEnd() {
        // console.log('2222222');       
    }

    rangeTouchStart() {
        this.rangeTouch = true;
    }

    rangeTouchEnd() {
        setTimeout(() => {
            this.rangeTouch = false;
            this.audioPlayer.currentTime = this.saturation;
        }, 1000);
    }

    rangeChange() {
        if (this.rangeTouch) {
            // console.log(this.saturation);
        }
    }

    findAudio() {
        this.audio = _.find(this.audios, { audioId: Number(this.id) });
        this.audioPlayer = document.getElementById("audio-audio");
        this.initEventListener();
        this.audioIndex = _.findIndex(this.audios, { audioId: Number(this.id) });
        setTimeout(() => {
            this.slides.slideTo(this.audioIndex, 0);
        }, 500);
        $('page-radio-audio ion-content').backgroundBlur({
            imageURL: this.audio.audioPic,
            blurAmount: 10
        });
    }

    initEventListener() {
        this.audioPlayer.onloadstart = () => {
            this.seeking = true;
            console.log('$$$ audioElement::loadstart');
        };

        this.audioPlayer.onloadeddata = () => {
            console.log('$$$ audioElement::loadeddata');
        };
        this.audioPlayer.oncanplay = () => {
            this.hasError = false;
            this.seeking = false;
            this.audioPlayer.play();
            this.duration = Math.floor(this.audioPlayer.duration);
            this.totalTime = Math.floor(this.duration / 60) + ':' + Math.floor(this.duration % 60);
            console.log('$$$ audioElement::canplay');
        };
        this.audioPlayer.onplaying = () => {
            console.log('$$$ audioElement::playing');
            this.isPlay = true;
        };
        this.audioPlayer.onpause = () => {
            this.isPlay = false;
            console.log('$$$ audioElement::pause');
        };

        this.audioPlayer.ontimeupdate = () => {
            if (!this.rangeTouch) {
                this.saturation = Math.floor(this.audioPlayer.currentTime);
                this.currentTime = Math.floor(this.saturation / 60) + ':' + Math.floor(this.saturation % 60);
            }
        };

        // 播放结束
        this.audioPlayer.onended = () => {
            console.log('$$$ audioElement::播放结束');
            if (this.audioIndex !== this.audios.length) {
                this.audioForward();
            }
        };
        // 客户端主动终止下载（不是因为错误引起）
        this.audioPlayer.onabort = () => {
            console.log('$$$ audioElement::abort');
        };
        // 请求数据时遇到错误
        this.audioPlayer.onerror = () => {
            this.hasError = true;
            this.isPlay = false;
            console.log('$$$ audioElement::error');
        };
    }

    toPlay() {
        if (!this.hasError) {
            if (this.isPlay) {
                this.audioPlayer.pause()
            } else {
                this.audioPlayer.play();
            }
        } else {
            this.audioPlayer.play();
        }
    }
}
