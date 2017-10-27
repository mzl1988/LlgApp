import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, Slides } from 'ionic-angular';
import { NativeService } from '../../providers/NativeService';
declare let $: any;
import _ from 'lodash';

@IonicPage({
    priority: 'off', // high > low > off(链接将不会加载)
    name: 'BookAudioPage',
    segment: 'book-audio/:type/:audioId'
})
@Component({
    selector: 'page-book-audio',
    templateUrl: 'book-audio.html'
})
export class BookAudioPage {
    @ViewChild(Slides) slides: Slides;
    type: string;
    audioId: number;
    audioIndex = 0;
    article: any;
    articles: any = [];
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
        nativeService: NativeService,
        navParams: NavParams
    ) {
        this.type = navParams.data.type;
        this.audioId = navParams.data.audioId;
        let key = this.type === 'new' ? 'newArticles' : '';
        nativeService.getStorage('newArticles').then((articles) => {
            if (articles) {
                this.articles = articles;
                this.findArticle();
            }
        });
        
    }

    ionViewDidLoad() {
    }

    slideChanged() {
        this.audioIndex = this.slides.getActiveIndex();
        this.article = this.articles[this.audioIndex];
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

    rangeTouchStart () {
        this.rangeTouch = true;
    }

    rangeTouchEnd() {
        setTimeout(() => {
            this.rangeTouch = false;
        }, 1000);
    }

    rangeChange() {
        if(this.rangeTouch) {
            console.log(this.saturation);
        }
    }

    findArticle() {
        this.article = _.find(this.articles, { audioId: Number(this.audioId) });
        this.audioPlayer = document.getElementById("article-audio");
        this.initEventListener();
        this.audioIndex = _.findIndex(this.articles, { audioId: Number(this.audioId) });
        setTimeout(() => {
            this.slides.slideTo(this.audioIndex, 0);
        }, 500);
        $('page-book-audio ion-content').backgroundBlur({
            imageURL: this.article.uploaderImg,
            blurAmount: 10
        });
    }

    initEventListener () {
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
            if(!this.rangeTouch) {
                this.saturation = Math.floor(this.audioPlayer.currentTime);
                this.currentTime = Math.floor(this.saturation / 60) + ':' + Math.floor(this.saturation % 60);
            }
        };

        // 播放结束
        this.audioPlayer.onended = () => {
            console.log('$$$ audioElement::播放结束');
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
        if(!this.hasError) {
            if(this.isPlay) {
                this.audioPlayer.pause()
            } else {
                this.audioPlayer.play();
            }
        } else {
            this.audioPlayer.play();
        }
    }
}
