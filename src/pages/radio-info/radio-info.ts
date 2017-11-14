import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import { TestService } from '../../services';
import { NativeService } from '../../providers/NativeService';
declare let $: any;

@IonicPage({
    priority: 'off', // high > low > off(链接将不会加载)
    name: 'RadioInfoPage',
    segment: 'radio/:id'
})
@Component({
    selector: 'page-radio-info',
    templateUrl: 'radio-info.html',
    providers: [TestService]
})
export class RadioInfoPage {
    id: number;
    pagenum = 1;
    pagesize = 20;
    count = 1;
    detail: any;
    audios: any[] = [];
    loading = false;
    canLoading = true;
    marginTop: number;

    constructor(
        private testService: TestService,
        private nativeService: NativeService,
        private appCtrl: App,
        private navCtrl: NavController,
        navParams: NavParams
    ) {
        this.id = navParams.data.id;
    }

    ionViewDidEnter() {
        $('page-radio-info ion-list').show();
    }

    ionViewWillLeave () {
        $('page-radio-info ion-list').hide();
    }

    ionViewDidLoad() {
        setTimeout(() => {
            this.marginTop = this.nativeService.isIos() ? $('page-radio-info ion-header').height() : $('page-radio-info ion-header').height() + 25;
            $('page-radio-info .radio-info').css('top', `${this.marginTop}px`);
        }, 200);
        this.getRadioDetail();
        setTimeout(() => {
            this.getAudioList(null);
        }, 300);
    }

    getRadioDetail() {
        this.testService.getRadioDetail(this.id)
            .finally(() => {
            })
            .subscribe(res => {
                if (res.code === '10000') {
                    this.detail = res.result;
                }
                setTimeout(() => {
                    if (this.nativeService.isIos()) {
                        $('page-radio-info .scroll-content').css('padding-top', ($('.radio-info').height() + this.marginTop - 1) + 'px');
                    } else {
                        $('page-radio-info .scroll-content').css('padding-top', ($('.radio-info').height() + this.marginTop) + 'px');
                    }
                }, 300);
            },
            error => {
            });
    }

    getAudioList(infiniteScroll) {
        if (this.loading || !this.canLoading) {
            return;
        }
        this.loading = true;
        this.testService.getRadioAudioList(this.id, this.pagenum, this.pagesize)
            .finally(() => {
                this.loading = false;
                if (infiniteScroll) {
                    infiniteScroll.complete();
                }
            })
            .subscribe(res => {
                if (res.code === '10000') {
                    this.pagenum = res.result.nextPage;
                    this.count = res.result.count;
                    this.pagenum === this.count ? this.canLoading = false : this.canLoading = true;
                    this.audios = this.audios.concat(res.result.dataList);
                    this.nativeService.setStorage('audios', this.audios);
                }
            },
            error => {
            });
    }

    doInfinite(infiniteScroll) {
        this.getAudioList(infiniteScroll);
    }

    toAudio(id) {
        this.navCtrl.push('RadioAudioPage', {
            id: id
        });
    }
}
