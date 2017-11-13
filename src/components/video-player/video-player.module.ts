import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { VideoPlayerComponent } from './video-player.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicPageModule.forChild(VideoPlayerComponent)
    ],
    exports: [
        VideoPlayerComponent
    ],
    declarations: [
        VideoPlayerComponent
    ],
    providers: []
})
export class VideoPlayerModule { }
