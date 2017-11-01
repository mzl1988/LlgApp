import { Component, ViewChild } from '@angular/core';
import { IonicPage, App, Slides, NavController } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import { TestService } from "../../services";
import { NativeService } from '../../providers/NativeService';
import _ from 'lodash';
declare let $: any;
// declare let window: any;

@IonicPage({
    priority: 'high', // high > low > off(链接将不会加载)
    name: 'FilmPage',
    segment: 'tabs/film'
})
@Component({
    selector: 'page-film',
    templateUrl: 'film.html',
    providers: [TestService]
})
export class FilmPage {
    @ViewChild(Slides) slides: Slides;
    onFocusInput = false;
    animated = true;
    debounce = 500;
    searchText: string;
    movieInTheaters: any;
    movieComingSoon: any;
    searchMovies: any;

    constructor(
        private appCtrl: App,
        private testService: TestService,
        private nativeService: NativeService,
        private navCtrl: NavController
    ) {

    }

    ionViewDidEnter() {
        this.appCtrl.setTitle('电影');
    }

    ionViewDidLoad() {
        this.getHotMovie();
        this.getComingSoonMovie();
    }

    onInput(event) {
        if (this.searchText.trim().length > 0) {
            this.movieSearch();
        } else {
            this.searchMovies = _.cloneDeep(this.movieInTheaters);
            $('page-film .search-content-box .scroll-content').scrollTop(0);
        }
    }

    onCancel() {
        this.onFocusInput = false;
        let tabBarElement: any = document.querySelector('#myTabs .tabbar.show-tabbar');
        tabBarElement.style.opacity = 1;
    }

    onFocus() {
        this.onFocusInput = true;
        let tabBarElement: any = document.querySelector('#myTabs .tabbar.show-tabbar');
        tabBarElement.style.opacity = 0;
    }
    onBlur() {
    }

    getHotMovie() {
        $.ajax({
            type: "get", //jquey是不支持post方式跨域的
            async: false,
            url: `https://api.douban.com/v2/movie/in_theaters`, //跨域请求的URL
            dataType: "jsonp",
            //传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonp: "callback",
            //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            jsonpCallback: "responseHandler",
            //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
            success: (json) => {
                this.movieInTheaters = json;
                this.searchMovies = _.cloneDeep(json);
                this.movieInTheaters.subjects.forEach(subject => {
                    subject.rating.stars = Number(subject.rating.stars) / 10;
                });
            }
        });
        // window.getJSONPa('https://api.douban.com/v2/movie/in_theaters', (json) => {
        //     this.movieInTheaters = json;
        //     this.searchMovies = _.cloneDeep(json);
        //     this.movieInTheaters.subjects.forEach(subject => {
        //         subject.rating.stars = Number(subject.rating.stars) / 10;
        //     });
        // })
    }

    getComingSoonMovie() {
        $.ajax({
            type: "get",
            async: false,
            url: `https://api.douban.com/v2/movie/coming_soon`,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "responseHandler",
            success: (json) => {
                this.movieComingSoon = json;
                this.movieComingSoon.subjects.forEach(subject => {
                    subject.rating.stars = Number(subject.rating.stars) / 10;
                });
            }
        });
    }

    movieSearch() {
        $.ajax({
            type: "get",
            async: false,
            url: `https://api.douban.com/v2/movie/search?q=${this.searchText}`,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "responseHandler",
            success: (json) => {
                this.searchMovies = _.cloneDeep(json);   
                $('page-film .search-content-box .scroll-content').scrollTop(0);
            }
        });
    }

    slideTap() {
        this.toMovieSubject(25821634);
    }

    toMovieSubject(id) {
        this.navCtrl.push('MovieSubjectPage', {
            id: id
        });
    }

}
