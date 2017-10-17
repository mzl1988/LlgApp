import { Component } from '@angular/core';
import { IonicPage, ModalController, AlertController } from 'ionic-angular';
import { LoginPage } from "../login/login";

@IonicPage()
@Component({
    selector: 'page-mine',
    templateUrl: 'mine.html'
})
export class MinePage {

    constructor(
        public modalCtrl: ModalController,
        private alertCtrl: AlertController
    ) {
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingPage');
    }

    logOut() {
        this.alertCtrl.create({
            title: '确认退出登陆？',
            buttons: [
                { text: '取消' },
                {
                    text: '确定',
                    handler: () => {
                        let modal = this.modalCtrl.create(LoginPage);
                        modal.present();
                    }
                }
            ]
        }).present();
    }

}
