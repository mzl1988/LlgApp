import { Injectable } from '@angular/core';
import { NativeService } from './NativeService';
import { ENV } from './Constants';

/**
 * JpushService类存放和极光推送业务有关的公共方法
 * @description
 */
@Injectable()
export class JpushService {

    constructor(
        private nativeService: NativeService
    ) {
    }

    initJpush() {
        if (!this.nativeService.isMobile()) {
            return;
        }
        window['plugins'].jPushPlugin.init();
        if (this.nativeService.isIos() && String(ENV) !== 'prod') {
            window['plugins'].jPushPlugin.setDebugModeFromIos();
        }
        if (this.nativeService.isAndroid() && String(ENV) !== 'prod') {
            window['plugins'].jPushPlugin.setDebugMode(false);
        }

        this.jPushAddEventListener();
    }

    private jPushAddEventListener() {
        window['plugins'].jPushPlugin.getUserNotificationSettings((result) => {
            if (result === 0) {
                // 系统设置中已关闭应用推送。
            } else if (result > 0) {
                // 系统设置中打开了应用推送。
            }
        });

        // 点击通知进入应用程序时会触发的事件
        document.addEventListener('jpush.openNotification', event => {
            //  window['plugins'].window['plugins'].jPushPlugin.resetBadge();
            let content = this.nativeService.isIos() ? event['aps'].alert : event['alert'];
            // console.log('jpush.openNotification' + content);
        }, false);

        // 收到通知时会触发该事件
        document.addEventListener('jpush.receiveNotification', event => {
            let content = this.nativeService.isIos() ? event['aps'].alert : event['alert'];
            // console.log('jpush.receiveNotification' + content);
        }, false);

        // 收到自定义消息时触发这个事件
        document.addEventListener('jpush.receiveMessage', event => {
            let message = this.nativeService.isIos() ? event['content'] : event['message'];
            // console.log('jpush.receiveMessage' + message);
        }, false);


        // 设置标签/别名回调函数
        document.addEventListener('jpush.setTagsWithAlias', event => {
            // console.log('onTagsWithAlias');
            let result = 'result code:' + event['resultCode'] + ' ';
            result += 'tags:' + event['tags'] + ' ';
            result += 'alias:' + event['alias'] + ' ';
            // console.log(result);
        }, false);

    }

    // 设置标签
    public setTags(sequence) {
        if (!this.nativeService.isMobile()) {
            return;
        }
        let tags = [];
        if (this.nativeService.isAndroid()) {
            tags.push('android');
        }
        if (this.nativeService.isIos()) {
            tags.push('ios');
        }
        // console.log('设置setTags:' + tags);
        window['plugins'].jPushPlugin.setTags({ sequence: sequence, tags: tags },
            (result) => {
                let sequence = result.sequence;
                let tags = result.tags;  // 数组类型
            }, (error) => {
                let sequence = error.sequence;
                let errorCode = error.code;
            });
    }

    // 设置别名,一个用户只有一个别名
    public setAlias(sequence, alias) {
        if (!this.nativeService.isMobile()) {
            return;
        }
        window['plugins'].jPushPlugin.setAlias({ sequence: 1, alias: alias },
            (result) => {
                let sequence = result.sequence;
                let alias = result.alias;
            }, (error) => {
                let sequence = error.sequence;
                let errorCode = error.code;
            });
    }
}
