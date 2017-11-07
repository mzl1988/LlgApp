import { Component } from '@angular/core';
import { IonicPage, App, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeService } from '../../providers/NativeService';
declare let $: any;
declare let DPlayer: any;
declare let enableInlineVideo: any;

@IonicPage({
    priority: 'off', // high > low > off(链接将不会加载)
    name: 'MovieSubjectPage',
    segment: 'movie-subject/:id'
})
@Component({
    selector: 'page-movie-subject',
    templateUrl: 'movie-subject.html'
})
export class MovieSubjectPage {
    id: number;
    movieSubject: any;
    movieMarginTop: number;
    rgba = 0;
    dPlayer: any;
    webfullscreen = false;
    touch_end: any;

    constructor(
        private appCtrl: App,
        private nativeService: NativeService,
        navParams: NavParams,
        private statusBar: StatusBar,
        private screenOrientation: ScreenOrientation
    ) {
        this.id = navParams.data.id;
        if (nativeService.isMobile()) {
            screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        }
    }

    ionViewDidLoad() {
        $('page-movie-subject ion-header').eq(0).css({ 'background-color': `rgba(66, 189, 86, ${this.rgba})` });
        this.movieMarginTop = this.nativeService.isIos() ? $('page-movie-subject ion-header').height() + 20 : $('page-movie-subject ion-header').height() + 25;
        this.getMovieSubject();
        this.initVideo();
    }

    // 没视频全屏没退出禁止退出页面
    ionViewCanLeave(): boolean {
        if (this.webfullscreen) {
            $('button.dplayer-icon dplayer-full-in-icon').trigger('click');
            return false;
        } else {
            return true;
        }
    }


    ionViewWillUnload() {
        this.screenOrientation.unlock();
        this.dPlayer.destroy();
    }

    scrollHandler(e) {

        if ((e.scrollTop / $(window).width()) >= 1) {
            this.rgba = 1;
        } else if ((e.scrollTop / $(window).width()) < 1) {
            this.rgba = Number((e.scrollTop / $(window).width()).toFixed(2));
        }
        $('page-movie-subject ion-header').css({ 'background-color': `rgba(66, 189, 86, ${this.rgba})` });
    }

    getMovieSubject() {
        $.ajax({
            type: 'get',
            async: false,
            url: `https://api.douban.com/v2/movie/subject/${this.id}`,
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'responseHandler',
            success: (json) => {
                console.log(json);
                this.movieSubject = json;
                if (this.movieSubject.ratings_count / 10000 >= 1) {
                    this.movieSubject.ratings_count_text = (this.movieSubject.ratings_count / 10000).toFixed(1) + '万人';
                } else {
                    this.movieSubject.ratings_count_text = this.movieSubject.ratings_count + '人';
                }
                this.movieSubject.ratingRgba = (this.movieSubject.rating.average / this.movieSubject.rating.max) * 100;
                console.log(this.movieSubject.ratingRgba);
                $('page-movie-subject .range .rgba').animate({ 'width': this.movieSubject.ratingRgba + '%' });

            }
        });
    }

    initVideo() {
        this.dPlayer = new DPlayer({
            container: document.getElementById('movie-subject-dplayer'),
            video: {
                url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
                pic: 'http://www.mediaelementjs.com/images/big_buck_bunny.jpg'
            },
            autoplay: false,
            lang: 'zh-cn',
            iconsColor: '#42bd56'
        });
        this.addVideoListeners();
        setTimeout(() => {
            $('page-movie-subject #movie-subject-dplayer .dplayer-setting').remove();
            $('page-movie-subject #movie-subject-dplayer button.dplayer-full-icon').remove();
            // 解决 ios 不能自动播放和禁止播放自动进入全屏
            if (this.nativeService.isIos()) {
                enableInlineVideo(document.getElementById('movie-subject-dplayer').getElementsByClassName('dplayer-video')[0]);
            }
            // this.dPlayer.play();
        }, 200);
    }

    addVideoListeners() {
        this.dPlayer.on('webfullscreen', () => {
            console.log('$$$ video::webfullscreen');
            this.webfullscreen = true;
            this.statusBar.show();
            if (this.nativeService.isMobile()) {
                this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
            }
            $('page-movie-subject ion-header').hide();
        });

        this.dPlayer.on('webfullscreen_cancel', () => {
            console.log('$$$ video::webfullscreen_cancel');
            this.webfullscreen = false;
            this.statusBar.show();
            if (this.nativeService.isMobile()) {
                this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
            }
            $('page-movie-subject ion-header').show();
        });
    }

    touchStart() {
        clearInterval(this.touch_end);
        $('#movie-subject-dplayer').removeClass('dplayer-hide-controller');
    }
    touchEnd() {
        this.touch_end = setTimeout(() => {
            $('#movie-subject-dplayer').addClass('dplayer-hide-controller');
        }, 5000);
    }
}