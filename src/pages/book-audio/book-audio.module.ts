import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookAudioPage } from './book-audio';

@NgModule({
    declarations: [
        BookAudioPage
    ],
    imports: [
        IonicPageModule.forChild(BookAudioPage),
    ],
    entryComponents: [
        BookAudioPage
    ]
})
export class BookAudioModule { }