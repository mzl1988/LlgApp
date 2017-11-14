import { Component } from '@angular/core';
import { IonicPage, App, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import { NativeService } from '../../providers/NativeService';
declare let $: any;

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
    videoConfig: any;

    constructor(
        private appCtrl: App,
        private nativeService: NativeService,
        navParams: NavParams
    ) {
        this.id = navParams.data.id;
    }

    ionViewDidLoad() {
        this.videoConfig = {
            page: 'page-movie-subject',
            id: `player_${this.id}`,
            autoplay: true,
            poster: 'https://img3.doubanio.com/img/trailer/medium/2493838601.jpg',
            src: 'https://vt1.doubanio.com/201711141605/9d439465359e52e5a53558fdb7fbe020/view/movie/M/302230170.mp4'
        };
        $('page-movie-subject ion-header').eq(0).css({ 'background-color': `rgba(66, 189, 86, ${this.rgba})` });
        this.movieMarginTop = this.nativeService.isIos() ? $('page-movie-subject ion-header').height() + 20 : $('page-movie-subject ion-header').height() + 25;
        this.getMovieSubject();
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
                this.movieSubject = json;
                if (this.movieSubject.ratings_count / 10000 >= 1) {
                    this.movieSubject.ratings_count_text = (this.movieSubject.ratings_count / 10000).toFixed(1) + '万人';
                } else {
                    this.movieSubject.ratings_count_text = this.movieSubject.ratings_count + '人';
                }
                this.movieSubject.ratingRgba = (this.movieSubject.rating.average / this.movieSubject.rating.max) * 100;
                setTimeout(() => {
                    $('page-movie-subject .rating-box .rgba').animate({ 'width': this.movieSubject.ratingRgba + '%' });
                }, 200);

            }
        });
    }
}