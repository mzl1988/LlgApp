import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { MusicPage } from './music';
import { VideoPlayerModule } from '../../components/';

@NgModule({
    declarations: [
        MusicPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        VideoPlayerModule,
        IonicPageModule.forChild(MusicPage),
    ],
    entryComponents: [
        MusicPage
    ]
})
export class MusicModule { }