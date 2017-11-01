import { Component } from '@angular/core';
import { IonicPage, App, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/finally';
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

    constructor(
        private appCtrl: App,
        navParams: NavParams
    ) {
        this.id =navParams.data.id;
    }
    ionViewDidEnter() {
    }
    ionViewDidLoad() {
        this.getMovieSubject();
    }

    getMovieSubject() {
        $.ajax({
            type: "get",
            async: false,
            url: `https://api.douban.com/v2/movie/subject/${this.id}`,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "responseHandler",
            success: (json) => {
                console.log(json);
                this.movieSubject = json;
            }
        });
    }
}