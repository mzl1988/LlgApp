import { Component } from '@angular/core';
import { Platform, LoadingController, ModalController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NativeService } from '../providers/NativeService';
import { JpushService } from '../providers/JpushService';
import { BackButtonService } from '../providers/BackButtonService';
import { ENV } from '../providers/Constants';

@Component({
    templateUrl: 'app.html'
})

// tslint:disable-next-line:component-class-suffix
export class MyApp {
    rootPage: any;
    loginModal: any;

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        private nativeService: NativeService,
        private jpushService: JpushService,
        backButtonService: BackButtonService,
        loadingCtrl: LoadingController,
        private modalCtrl: ModalController,
        private events: Events
    ) {
        platform.ready().then(() => {
            splashScreen.hide();
            statusBar.overlaysWebView(true);
            statusBar.backgroundColorByHexString('#00ffffff');
            nativeService.getStorage('token').then((token) => {
                if (token) {
                    // let loading = loadingCtrl.create({
                    //     content: '自动登陆中...',
                    //     duration: 1500
                    // });
                    // loading.onDidDismiss(() => {
                    //     this.rootPage = 'TabsPage';
                    //     this.events.publish('loginModal:dismiss', 'login');
                    // });
                    // loading.present();
                    this.rootPage = 'TabsPage';
                    this.events.publish('loginModal:dismiss', 'login');
                    // jpush
                    if (nativeService.isMobile()) {
                        this.initJpush();
                    }
                    // 检测网络
                    this.checkNetwork();
                } else {
                    this.loginModal = this.modalCtrl.create('LoginPage');
                    this.loginModal.present();
                }
            });
            // code push
            if (String(ENV) === 'prod' && nativeService.isMobile()) {
                nativeService.codePushReady();
            }
            this.listenToLoginEvents();
        });
    }

    initJpush() {
        this.jpushService.initJpush();
        this.jpushService.setTags(1988);
        this.jpushService.setAlias(1988, `llg_app_user_1988`);
    }

    listenToLoginEvents() {
        this.events.subscribe('user:login', (str) => {
            this.rootPage = 'TabsPage';
            this.initJpush();
        });
        this.events.subscribe('user:logout', (str) => {
            this.nativeService.removeStorage('token');
            this.loginModal = this.modalCtrl.create('LoginPage');
            this.loginModal.present();
            this.rootPage = 'TabsPage';
        });
    }

    checkNetwork() {
        if (!this.nativeService.isConnecting()) {
            this.nativeService.toastShowWithOptions({
                message: '未检测到网络,请连接网络',
                duration: 2000,
                position: 'top',
                styling: {
                    opacity: 1.0,
                    backgroundColor: '#f53d3d',
                    textColor: '#FFFFFF'
                }
            });
        }
    }
}
