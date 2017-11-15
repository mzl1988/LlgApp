import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NativeService } from '../../providers/NativeService';

@IonicPage({
    priority: 'off',
    name: 'ArticlePage',
    segment: 'article'
})
@Component({
    selector: 'page-article',
    templateUrl: 'article.html'
})
export class ArticlePage {
    article: any;
    contentHtml = '';

    constructor(
        private nativeService: NativeService,
        navParams: NavParams
    ) {
        this.article = navParams.data.article;
    }

    ionViewDidLoad() {
        for (let index = 0; index < this.article.content.items.length; index++) {
            let item = this.article.content.items[index];
            if (index === 0 || item.type === 'segment') {
                continue;
            }
            if (item.type === 'text') {
                if (item.data.indexOf('点击上面 蓝色字关注') > -1 || item.data.indexOf('By政商内参') > -1) {
                    continue;
                }

                if (item.data.indexOf('作者：') > -1 && item.data.indexOf('来源：') > -1) {
                    continue;
                }

                if (item.data.indexOf('来源：') > -1 && item.data.indexOf('ID：') > -1) {
                    continue;
                }

                if (item.data.indexOf('来源：') > -1 && item.data.indexOf('微信号：') > -1) {
                    continue;
                }

                this.contentHtml = this.contentHtml + `<p>${item.data}</p>`;

            } else if (item.type === 'image') {
                this.contentHtml = this.contentHtml + `<img src="${item.data.original.src}">`;
            }
        }
    }

}
