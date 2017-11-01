import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovieSubjectPage } from './movie-subject';

@NgModule({
    declarations: [
        MovieSubjectPage
    ],
    imports: [
        IonicPageModule.forChild(MovieSubjectPage),
    ],
    entryComponents: [
        MovieSubjectPage
    ]
})
export class MovieSubjectModule { }