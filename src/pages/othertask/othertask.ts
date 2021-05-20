import { TimelinePage } from './../timeline/timeline';
import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OthertaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-othertask',
  templateUrl: 'othertask.html',
})
export class OthertaskPage {
  categoris:any = [];
  mycat:any
  task:any 
  timeline:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private db:DatabaseProvider) {
    
    this.timeline = this.navParams.get('timeline')
    this.task= {
      title:'',
       active:'',
       category:'',
       date_deb:''
     }
  }

  
 

 
  AjouterTimeline(){
      
    if(this.task.title && this.task.description && this.task.category && this.task.date_deb){
      
      this.db.InsertTimeline(this.task.title,this.task.active,this.task.description,this.task.date_deb,this.timeline.idtask);
      this.navCtrl.push(TimelinePage,{timeline:this.timeline});
    }else{
      }

 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OthertaskPage');
    
  }
}
