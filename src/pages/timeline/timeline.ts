import { OthertaskPage } from './../othertask/othertask';


import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import {ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { TasksviewPage } from '../tasksview/tasksview';


/**
 * Generated class for the TimelinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {
  items:any = [];
 toggleValue : boolean = false;
 style:any;
 timelines:any
 timeline:any
 tasks:any
 task:any
  constructor(public modalCtrl: ModalController,public navCtrl: NavController,public navparam: NavParams,private db:DatabaseProvider) {
    this.task = this.navparam.get('task')
  }

  ionViewDidEnter(){
    this.getTimeline(this.task.idtask);
   }
   ionViewDidLoad() {
     console.log('ionViewDidLoad TimelinePage');
   }

   getTimeline(idtask){
     return new Promise((resolve) => {
       this.db.getTimeline(idtask)
         .then(data => {
           this.tasks = data;
         });
     });
   }
  othertask(task){
    this.navCtrl.push(OthertaskPage,
      {
        task:task
      });
  }
  presentProfileModal(task) {
    let profileModal = this.modalCtrl.create(TasksviewPage,{
    detail:task
    });
    profileModal.present();
  }
  gettimeline(){
    this.items = [
      {
        title: 'Courgette anass',
        content: `Parsley amaranth tigernut silver beet maize fennel spinach. Ricebean black-eyed pea maize
                  .`,
        icon: 'calendar',
        time: { subtitle: '4/16/2013', title: '21:30' },
        active: 'on'
      },
      {
        title: ' daikon',
        content: ` Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize
                  chicory burdock tatsoi dulse radish wakame beetroot.`,
        icon: 'calendar',
        time: { subtitle: '4/16/2019', title: '21:30' },
        active: 'off'
      },
      {
        title: 'Courgette',
        content: `.Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize
                  `,
        icon: 'calendar',
        time: { subtitle: '4/16/2015', title: '21:30' },
        active: 'off'
      },
    ];
  
  }

 
  
}
