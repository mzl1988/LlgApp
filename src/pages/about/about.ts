import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
    priority: 'off',
    name: 'AboutPage',
    segment: 'about'
})
@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {

    constructor() {

    }

}
