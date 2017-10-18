import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
    priority: 'high', // high > low > off(链接将不会加载)
    name: 'HomePage',
    segment: 'tabs/home'
})
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor() {
    }

}
