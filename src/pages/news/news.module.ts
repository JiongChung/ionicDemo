import { NgModule } from '@angular/core';
import { IonicPageModule ,IonicModule } from 'ionic-angular'; 
import { NewsPage } from './news';

@NgModule({
  declarations: [
    NewsPage,
  ],
  imports: [
    IonicModule,
    IonicPageModule.forChild(NewsPage),
  ],
})
export class NewsPageModule {}
