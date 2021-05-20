import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TasksviewPage } from './tasksview';

@NgModule({
  declarations: [
    TasksviewPage,
  ],
  imports: [
    IonicPageModule.forChild(TasksviewPage),
  ],
})
export class TasksviewPageModule {}
