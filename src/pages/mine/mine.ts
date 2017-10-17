import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { LoginPage } from "../login/login";

@IonicPage()
@Component({
    selector: 'page-mine',
    templateUrl: 'mine.html'
})
export class MinePage {

    constructor(public modalCtrl: ModalController) {
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingPage');
    }

    logOut() {
        let modal = this.modalCtrl.create(LoginPage);
        modal.present();
    }

}
