import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';

import { NativeService } from '../providers/NativeService';
import { JpushService } from '../providers/JpushService';
import { BackButtonService } from '../providers/BackButtonService';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = 'LoginPage';

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        nativeService: NativeService,
        jpushService: JpushService,
        backButtonService: BackButtonService,
        storage: Storage,
        loadingCtrl: LoadingController
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
                        this.rootPage = TabsPage;
                    });
                    loading.present();
                    // jpush
                    jpushService.initJpush();
                    jpushService.setTags(1988);
                    jpushService.setAlias(1988, `llg_app_user_1988`);
                }
            });
            // code push
            nativeService.codePushReady();
        });
    }
}
