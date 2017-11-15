import { Component } from '@angular/core';
import { IonicPage, App, NavController } from 'ionic-angular';
import { NativeService } from '../../providers/NativeService';
import _ from 'lodash';
declare let $: any;

@IonicPage({
    priority: 'low', // high > low > off(链接将不会加载)
    name: 'BookPage',
    segment: 'tabs/book'
})
@Component({
    selector: 'page-book',
    templateUrl: 'book.html'
})
export class BookPage {
    count = 0;
    pageNumber = 1;
    articles: any[] = [];
    loading = false;

    constructor(
        private appCtrl: App,
        private nativeService: NativeService,
        private navCtrl: NavController,
    ) {
    }

    ionViewDidEnter() {
        this.appCtrl.setTitle('阅读');
    }

    ionViewDidLoad() {
        this.findPage(null);
    }

    doInfinite(infiniteScroll) {
        this.findPage(infiniteScroll);
    }

    findPage(infiniteScroll) {
        if (this.loading) {
            return;
        }
        this.loading = true;
        $.ajax({
            type: 'get', // jquey是不支持post方式跨域的
            async: false,
            url: `https://author.baidu.com/list?type=article&context={"offset":"-1_${(this.pageNumber - 1) * 20}","app_id":"1552500388453128","last_time":"1510714844"}&_=1510714916623`, // 跨域请求的URL
            dataType: 'jsonp',
            // 传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonp: 'callback',
            // 自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            jsonpCallback: 'responseHandler',
            // 成功获取跨域服务器上的json数据后,会动态执行这个callback函数
            success: (json) => {
                this.count = json.data.count;
                let items = json.data.items;
                items.forEach(item => {
                    item.content = JSON.parse(item.content);
                });
                this.articles = this.articles.concat(items);
                if (json.data.has_more) {
                    this.pageNumber++;
                } else {
                    if (infiniteScroll) {
                        infiniteScroll.enable(false);
                    }
                }
                this.loading = false;
                if (infiniteScroll) {
                    infiniteScroll.complete();
                }
            }
        });
    }

    toArticle(id) {
        this.navCtrl.push('ArticlePage', {
            article: _.find(this.articles, {id: id})
        });
    }
}
