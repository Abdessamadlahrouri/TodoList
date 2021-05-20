import { DatabaseProvider } from '../../providers/database/database';
import { TasksPage } from '../tasks/tasks';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addtask',
  templateUrl: 'addtask.html',
})
export class AddtaskPage {
  categoris:any = [];
  mycat:any
  task:any 
   project:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private db:DatabaseProvider) {
    this.getCategory();
    this.project = this.navParams.get('project')
    this.task= {
      title:'',
       description:'',
       category:'',
       date_deb:''
     }
  }

  
 
  getcat(){
    console.log(this.mycat);
  }
  getCategory(){
    this.categoris=[
     {
       cat_name:'Desktop Software Development',
        cat_id:0,  
     },
     {
      cat_name:'Design',
      cat_id:1
   },
    ];

  }

 
  AjouterTask(){
      
    if(this.task.title && this.task.description && this.task.category && this.task.date_deb){
      
      this.db.InsertTask(this.task.title,this.task.description,this.task.category,this.task.date_deb,this.project.idprojet);
      this.navCtrl.push(TasksPage,{project:this.project});
    }else{
      }

 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddtaskPage');
    
  }
}
