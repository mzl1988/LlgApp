import { NgModule, ErrorHandler } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { NativeService } from '../providers/NativeService';
import { JpushService } from '../providers/JpushService';
import { BackButtonService } from '../providers/BackButtonService';
import { HttpInterceptorService } from '../providers/HttpInterceptorService';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CodePush } from '@ionic-native/code-push';
import { Toast } from '@ionic-native/toast';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { AppVersion } from '@ionic-native/app-version';

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp,
            {
                mode: 'ios',
                backButtonText: '',
                preloadModules: true // 启用预加载
            }
        ),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        SplashScreen,
        CodePush,
        NativeService,
        JpushService,
        BackButtonService,
        HttpInterceptorService,
        Toast,
        Network,
        AppVersion,
        {
            provide: Http,
            useClass: HttpInterceptorService
        },
        {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        }
    ]
})
export class AppModule { }
