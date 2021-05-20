import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OthertaskPage } from './othertask';

@NgModule({
  declarations: [
    OthertaskPage,
  ],
  imports: [
    IonicPageModule.forChild(OthertaskPage),
  ],
})
export class OthertaskPageModule {}
