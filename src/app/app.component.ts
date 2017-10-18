import { Component } from '@angular/core';
import { Platform, LoadingController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';

import { NativeService } from '../providers/NativeService';
import { JpushService } from '../providers/JpushService';
import { BackButtonService } from '../providers/BackButtonService';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage = 'LoginPage';
    
    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        private nativeService: NativeService,
        jpushService: JpushService,
        backButtonService: BackButtonService,
        storage: Storage,
        loadingCtrl: LoadingController,
        private toast: Toast,
        private modalCtrl: ModalController
    ) {
        platform.ready().then(() => {
            splashScreen.hide();
            storage.get('token').then((token) => {
                if (token) {
                    let loading = loadingCtrl.create({
                        content: '自动登陆中...',
                        duration: 2000
                    });
                    loading.onDidDismiss(() => {
                        let modal = this.modalCtrl.create('TabsPage');
                        modal.present();
                    });
                    loading.present();
                    // jpush
                    jpushService.initJpush();
                    jpushService.setTags(1988);
                    jpushService.setAlias(1988, `llg_app_user_1988`);
                    // 检测网络
                    this.checkNetwork();
                }
            });
            // code push
            nativeService.codePushReady();
        });
    }

    checkNetwork() {
        if (!this.nativeService.isConnecting()) {
            this.toast.showWithOptions(
                {
                    message: '未检测到网络,请连接网络',
                    duration: 2000,
                    position: 'top',
                    styling: {
                        opacity: 1.0,
                        backgroundColor: '#f53d3d',
                        textColor: '#FFFFFF'
                    }
                }
            ).subscribe(
                toast => {
                }
                );
        }
    }
}
