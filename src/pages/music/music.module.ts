import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { MusicPage } from './music';

@NgModule({
    declarations: [
        MusicPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicPageModule.forChild(MusicPage),
    ],
    entryComponents: [
        MusicPage
    ]
})
export class MusicModule { }