import { DatabaseProvider } from './../../providers/database/database';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddtaskPage} from'../addtask/addtask'
import { TimelinePage } from '../timeline/timeline';
/**
 * Generated class for the TasksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {
  
  tasks:any
  project:any;
  constructor(public navCtrl: NavController,private db:DatabaseProvider,public navparam:NavParams) {
    this.project = this.navparam.get('project')
  }

  ionViewDidEnter(){
    this.getTasks(this.project.idprojet);
   }
   ionViewDidLoad() {
     console.log('ionViewDidLoad TasksPage');
   }

   getTasks(idprojet){
     return new Promise((resolve) => {
       this.db.getTasks(idprojet)
         .then(data => {
           this.tasks = data;
         });
     });
   }
  nextPage(project){
    this.navCtrl.push(AddtaskPage,{
      project:project
    });
  }

  deletetask(idtask){
    this.db.deletetask(idtask);
  } 

  totimeline(task){
    this.navCtrl.push(TimelinePage,{
      task:task
    });
  }

}
