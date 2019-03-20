import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OilcardPage } from './oilcard';

@NgModule({
  declarations: [
    OilcardPage,
  ],
  imports: [
    IonicPageModule.forChild(OilcardPage),
  ],
})
export class OilcardPageModule {}
