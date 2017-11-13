import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovieSubjectPage } from './movie-subject';
import { VideoPlayerModule } from '../../components/';

@NgModule({
    declarations: [
        MovieSubjectPage
    ],
    imports: [
        VideoPlayerModule,
        IonicPageModule.forChild(MovieSubjectPage),
    ],
    entryComponents: [
        MovieSubjectPage
    ]
})
export class MovieSubjectModule { }