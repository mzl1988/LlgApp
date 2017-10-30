import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RadioInfoPage } from './radio-info';

@NgModule({
    declarations: [
        RadioInfoPage
    ],
    imports: [
        IonicPageModule.forChild(RadioInfoPage),
    ],
    entryComponents: [
        RadioInfoPage
    ]
})
export class RadioInfoModule { }