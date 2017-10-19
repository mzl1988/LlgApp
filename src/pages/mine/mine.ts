import { Component } from '@angular/core';
import { IonicPage, ModalController, AlertController, NavController, Events } from 'ionic-angular';

@IonicPage({
    priority: 'low',
    name: 'MinePage',
    segment: 'tabs/mine'
})
@Component({
    selector: 'page-mine',
    templateUrl: 'mine.html'
})
export class MinePage {

    constructor(
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private navCtrl: NavController,
        private events: Events
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingPage');
    }

    toSettingsPage() {
        this.navCtrl.push('SettingsPage', {
            'id': 1
        });
    }
    toAboutPage() {
        this.navCtrl.push('AboutPage');
    }

    logOut() {
        this.alertCtrl.create({
            title: '确认退出登陆？',
            buttons: [
                { text: '取消' },
                {
                    text: '确定',
                    handler: () => {
                        this.events.publish('user:logout', 'logout');
                    }
                }
            ]
        }).present();
    }

}
