import { Component } from '@angular/core';
import { IonicPage, App, NavController } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import { DuZheService } from "../../services";
import { NativeService } from '../../providers/NativeService';

@IonicPage({
    priority: 'low', // high > low > off(链接将不会加载)
    name: 'BookPage',
    segment: 'tabs/book'
})
@Component({
    selector: 'page-book',
    templateUrl: 'book.html',
    providers: [DuZheService]
})
export class BookPage {
    segment = 'new';
    newArticlesPagenum = 1;
    pagesize = 20;
    newArticleCount = 1;
    newArticles: any[] = [];
    loading = false;
    newArticlesCanLoading = true;
    constructor(
        private duZheService: DuZheService,
        private nativeService: NativeService,
        private appCtrl: App,
        private navCtrl: NavController
    ) {
    }

    ionViewDidEnter() {
        this.appCtrl.setTitle('读书');
    }

    ionViewDidLoad() {
        this.getNewArticleList(null);
    }

    getNewArticleList(infiniteScroll) {
        // http://www.tingban.cn/zj/Xv9X3UNV.html
        if (this.loading || !this.newArticlesCanLoading) {
            return;
        }
        this.loading = true;
        this.duZheService.getNewArticleList(this.newArticlesPagenum, this.pagesize)
            .finally(() => {
                this.loading = false;
                if(infiniteScroll) {
                    infiniteScroll.complete();
                }
            })
            .subscribe(res => {
                if (res.code === '10000') {
                    this.newArticlesPagenum = res.result.nextPage;
                    this.newArticleCount = res.result.count;
                    this.newArticlesPagenum === this.newArticleCount ? this.newArticlesCanLoading = false : this.newArticlesCanLoading = true;
                    this.newArticles = this.newArticles.concat(res.result.dataList);
                    this.nativeService.setStorage('newArticles', this.newArticles);
                }
            },
            error => {
            });
    }

    doInfinite(infiniteScroll){
        if(this.segment === 'new') {
            this.getNewArticleList(infiniteScroll);
        }

    }

    toBookAudio(type, audioId) {
        this.navCtrl.push('BookAudioPage', {
            type: type,
            audioId: audioId
        });
    }

}
