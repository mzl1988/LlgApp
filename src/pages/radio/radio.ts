import { Component, ViewChild } from '@angular/core';
import { IonicPage, App, NavController, Content } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import { TestService } from '../../services';
import { NativeService } from '../../providers/NativeService';

declare let $: any;

@IonicPage({
    priority: 'low', // high > low > off(链接将不会加载)
    name: 'RadioPage',
    segment: 'tabs/radio'
})
@Component({
    selector: 'page-radio',
    templateUrl: 'radio.html',
    providers: [TestService]
})
export class RadioPage {
    @ViewChild(Content) content: Content;
    segment = 'hot';
    radios: any[] = [];
    constructor(
        private testService: TestService,
        private nativeService: NativeService,
        private appCtrl: App,
        private navCtrl: NavController
    ) {
    }

    ionViewDidEnter() {
        this.appCtrl.setTitle('电台');
    }

    ionViewDidLoad() {
        this.segmentChange();
    }

    segmentChange() {
        if (this.segment === 'hot') {
            this.getHotRadio();
        } else if (this.segment === 'fine') {
            this.getFineRadio();
        }
    }

    getHotRadio() {
        this.testService.getHotRadio()
            .finally(() => {
                this.content.scrollToTop();
            })
            .subscribe(res => {
                res.code === '10000' ? this.radios = res.result.dataList : this.radios = [];
            },
            error => {
            });
    }

    getFineRadio() {
        this.testService.getFineRadio()
            .finally(() => {
                this.content.scrollToTop();
            })
            .subscribe(res => {
                res.code === '10000' ? this.radios = res.result.dataList : this.radios = [];
            },
            error => {
            });
    }

    toRadio(radio) {
        this.navCtrl.push('RadioInfoPage', {
            'id': this.segment === 'hot' ? radio.rid : radio.id
        });
    }

}
