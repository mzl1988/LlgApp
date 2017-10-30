import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RadioAudioPage } from './radio-audio';

@NgModule({
    declarations: [
        RadioAudioPage
    ],
    imports: [
        IonicPageModule.forChild(RadioAudioPage),
    ],
    entryComponents: [
        RadioAudioPage
    ]
})
export class RadioAudioModule { }