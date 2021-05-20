import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TasksviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasksview',
  templateUrl: 'tasksview.html',
})
export class TasksviewPage {
  detail:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

   this.detail =  this.navParams.get('detail');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksviewPage');
  }

}
