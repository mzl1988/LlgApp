import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { BackButtonService } from '../../providers/BackButtonService';
import { Toast } from '@ionic-native/toast';
import { Storage } from '@ionic/storage';

import { User } from "../../models";
import { UserService } from "../../services";
import 'rxjs/add/operator/finally';

@IonicPage({
    priority: 'high',
    name: 'LoginPage',
    segment: 'login'
})
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [UserService]
})
export class LoginPage {
    user = new User();

    constructor(
        public modalCtrl: ModalController,
        backButtonService: BackButtonService,
        platform: Platform,
        private toast: Toast,
        private storage: Storage,
        private userService: UserService,
    ) {
        platform.ready().then(() => {
            backButtonService.registerBackButtonAction(null);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    logIn(username: HTMLInputElement, password: HTMLInputElement) {
        if (username.value.length === 0) {
            this.toast.show(`请输入账号`, '2000', 'center').subscribe(
                toast => {
                }
            );
        } else if (password.value.length === 0) {
            this.toast.show(`请输入密码`, '2000', 'center').subscribe(
                toast => {
                }
            );
        } else {
            this.storage.set('token', '123456');
            let modal = this.modalCtrl.create('TabsPage');
            modal.present();

            // this.user.username = username.value;
            // this.user.password = password.value;
            // this.userService.authLogin(this.user)
            //     .finally(() => {

            //     })
            //     .subscribe(data => {
            //         // this.storage.set('token', '123456');
            //         // let modal = this.modalCtrl.create(TabsPage);
            //         // modal.present();
            //     },
            //     error => {

            //     });
        }
    }

}
