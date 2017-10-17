import { Component } from '@angular/core';
import { IonicPage, ModalController, AlertController, NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-mine',
    templateUrl: 'mine.html'
})
export class MinePage {

    constructor(
        public modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private storage: Storage,
        private navCtrl: NavController
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingPage');
    }

    toSettingsPage() {
        this.navCtrl.push('SettingsPage');
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
                        this.storage.remove('token');
                        let modal = this.modalCtrl.create(LoginPage);
                        modal.present();
                    }
                }
            ]
        }).present();
    }

}
