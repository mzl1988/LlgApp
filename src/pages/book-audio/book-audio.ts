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
    article: any;
    articles: any = [];
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
        let currentIndex = this.slides.getActiveIndex();
        this.article = this.articles[currentIndex];
    }

    touchStart() {
        console.log('1111111');
        
    }
    touchEnd() {
        console.log('22222');       
    }

    findArticle() {
        this.article = _.find(this.articles, { audioId: Number(this.audioId) });
        let index = _.findIndex(this.articles, { audioId: Number(this.audioId) });
        setTimeout(() => {
            this.slides.slideTo(index, 0);
        }, 500);
        $('page-book-audio ion-content').backgroundBlur({
            imageURL: this.article.uploaderImg,
            blurAmount: 10
        });
    }


}
