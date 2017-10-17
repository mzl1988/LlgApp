import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NativeService } from "../providers/NativeService";
import { JpushService } from "../providers/JpushService";
import { BackButtonService } from "../providers/BackButtonService";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any = 'LoginPage';

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        nativeService: NativeService,
        jpushService: JpushService,
        backButtonService: BackButtonService
    ) {
        platform.ready().then(() => {
            splashScreen.hide();
            // jpush
            jpushService.initJpush();
            jpushService.setTags(1988);
            jpushService.setAlias(1988, `llg_app_user_1988`);
            // code push
            nativeService.codePushReady();
        });
    }
}
