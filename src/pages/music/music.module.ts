import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicPage } from './music';

@NgModule({
    declarations: [
        MusicPage
    ],
    imports: [
        IonicPageModule.forChild(MusicPage),
    ],
    entryComponents: [
        MusicPage
    ]
})
export class MusicModule { }