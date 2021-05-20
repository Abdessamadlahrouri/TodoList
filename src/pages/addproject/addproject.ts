import { Storage } from '@ionic/storage';
import { ProjectsPage } from './../projects/projects';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

/**
 * Generated class for the AddprojectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addproject',
  templateUrl: 'addproject.html',
})
export class AddprojectPage {

  projet:any = {
    title:''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,private db:DatabaseProvider,
    private storage:Storage) {
    
  }
  AjouterProjet(){
    this.storage.get('user_id').then((user_id) => {
      
    if(this.projet.title ){
      console.log(this.projet.title);
      console.log('userid ---->'+user_id);

      this.db.InsertProjet(this.projet.title,user_id);
      this.navCtrl.push(ProjectsPage);
    }else{
      }

    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddprojectPage');
  }

}
