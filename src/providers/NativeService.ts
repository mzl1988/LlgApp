import { Injectable, NgZone } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { CodePush, SyncStatus } from '@ionic-native/code-push';

@Injectable()
export class NativeService {
    appDetail: any;
    messageText: string;

    constructor(
        private platform: Platform,
        private alertCtrl: AlertController,
        private codePush: CodePush,
        private ngZone: NgZone
    ) {
    }

    /**
     * 是否真机环境
     * @return {boolean}
     */
    isMobile(): boolean {
        return this.platform.is('mobile') && !this.platform.is('mobileweb');
    }

    /**
     * code push
     */
    codePushReady() {
        if(!this.isMobile()) {
            return;
        }
        this.codePush.sync().subscribe((syncStatus) => {

            if (syncStatus === SyncStatus.UP_TO_DATE) {

                // facing some zoning problems here !!
                // why ??

                // forcing to run in the ngzone
                this.ngZone.run(() => {
                    this.messageText = '应用程式是最新的！';
                });
            }

            // not facing zoning issue here ?

            switch (syncStatus) {
                case SyncStatus.IN_PROGRESS:
                    this.messageText = '正在进行更新 ..';
                    break;

                case SyncStatus.CHECKING_FOR_UPDATE:
                    this.messageText = '检查更新 ..';
                    break;

                case SyncStatus.DOWNLOADING_PACKAGE:
                    this.messageText = '下载包 ..';
                    break;

                case SyncStatus.INSTALLING_UPDATE:
                    this.messageText = '安装更新 ..';
                    break;

                case SyncStatus.UPDATE_INSTALLED:
                    this.messageText = '安装更新 ..';
                    const alert = this.alertCtrl.create({
                        title: '更新',
                        message: '安装了一个新的更新，并将在下次重新启动应用程序时可用',
                        buttons: ['好']
                    });
                    alert.present();
                    alert.onDidDismiss(() => {
                    });
                    break;

                case SyncStatus.ERROR:
                    this.messageText = '发生错误 :( ...';
                    break;

                default:
                    this.messageText = '未处理的同步状态 ..';
                    break;
            }

        });
    }
}
