import { DatabaseProvider } from './../../providers/database/database';
import { HomePage } from './../home/home';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,App } from 'ionic-angular';
import { TasksPage } from '../tasks/tasks';
import { AddprojectPage } from '../addproject/addproject';


@IonicPage()
@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class ProjectsPage {
  projects:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage:Storage,private alertCtrl:AlertController,private app:App,
    private db:DatabaseProvider) {
      this.storage.get('user_id');
  }

  ionViewDidEnter(){
    this.storage.get('user_id').then((user_id) => {
   this.getProjects(user_id);}
    );}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectsPage');
  }

  nextPageProjects(){
    this.navCtrl.push(AddprojectPage);
  }

  getProjects(user_id){
    return new Promise((resolve) => {
      this.db.getProjects(user_id)
        .then(data => {
          this.projects = data;
        });
    });
  }

  totask(project){
    this.navCtrl.push(TasksPage,
      {
        project:project
      });
  }

  logout(){
                      this.storage.set('user_id','');
                      this.storage.set('username','');
                      this.storage.set('loggedin', false);


                      const confirm = this.alertCtrl.create({
                        title: 'Etes vous sûr ?',
                        message: '',
                        buttons: [
                          {
                            text: 'Annuler',
                            handler: () => {
                              console.log('Disagree clicked');
                            }
                          },
                          {
                            text: 'Confirmer',
                            handler: () => {
                              console.log('logout clicked');
                              this.storage.set('user_id', '');
                              this.storage.set('username', '');
                              this.storage.set('loggedin', false);
                              this.app.getRootNav().setRoot(HomePage);
                            }
                          }
                        ]
                      });
                      confirm.present();

  }
}
