import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { BookPage } from './book';

@NgModule({
    declarations: [
        BookPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicPageModule.forChild(BookPage),
    ],
    entryComponents: [
        BookPage
    ]
})
export class BookModule { }