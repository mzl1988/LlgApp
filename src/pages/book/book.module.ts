import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookPage } from './book';

@NgModule({
    declarations: [
        BookPage
    ],
    imports: [
        IonicPageModule.forChild(BookPage),
    ],
    entryComponents: [
        BookPage
    ]
})
export class BookModule { }