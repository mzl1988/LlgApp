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

    constructor(
        private appCtrl: App,
        private nativeService: NativeService,
        navParams: NavParams
    ) {
        this.id = navParams.data.id;
    }
    ionViewDidEnter() {
    }
    ionViewDidLoad() {
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
}