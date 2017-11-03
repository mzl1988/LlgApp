import { Injectable } from '@angular/core';
import { Platform, App, NavController, Tabs, Keyboard } from 'ionic-angular';
import { NativeService } from './NativeService';

@Injectable()
export class BackButtonService {

    // 控制硬件返回按钮是否触发，默认false
    backButtonPressed = false;

    // 构造函数 依赖注入
    constructor(public platform: Platform,
        private appCtrl: App,
        private keyboard: Keyboard,
        private nativeService: NativeService
    ) { }

    // 注册方法
    registerBackButtonAction(tabRef: Tabs): void {
        if (this.platform.is('ios')) {
            return;
        }
        // registerBackButtonAction是系统自带的方法
        this.platform.registerBackButtonAction(() => {
            if (this.keyboard.isOpen()) {
                // 按下返回键时，先关闭键盘
                this.keyboard.close();
                return;
            }
            // 获取NavController
            let activeNav: NavController = this.appCtrl.getActiveNav();
            // 如果可以返回上一页，则执行pop
            if (activeNav.canGoBack()) {
                activeNav.pop();
            } else {
                if (tabRef == null || tabRef._selectHistory[tabRef._selectHistory.length - 1] === tabRef.getByIndex(0).id) {
                    // 执行退出
                    this.showExit();
                } else {
                    // 选择首页第一个的标签
                    tabRef.select(0);
                }
            }
        });
    }

    // 退出应用方法
    private showExit(): void {
        // 如果为true，退出
        if (this.backButtonPressed) {
            this.platform.exitApp();
        } else {
            // 第一次按，弹出Toast
            this.nativeService.toastShowWithOptions({
                message: '再按一次退出应用',
                duration: 2000,
                position: 'bottom',
                styling: {
                    opacity: 1.0,
                    backgroundColor: '#42bd56',
                    textColor: '#ffffff'
                }
            });

            // 标记为true
            this.backButtonPressed = true;
            // 两秒后标记为false，如果退出的话，就不会执行了
            setTimeout(() => this.backButtonPressed = false, 2000);
        }
    }
}
