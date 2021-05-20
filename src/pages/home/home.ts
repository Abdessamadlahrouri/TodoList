import { ProjectsPage } from './../projects/projects';
import { SigninPage } from './../signin/signin';

import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';

import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users:any
  user:any
  selectU: any = [];
  anass:any;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams,private db:DatabaseProvider,private toastCtrl: ToastController, private storage:Storage) {
    this.selectUser();  
  }
         ionViewDidEnter(){
          this.selectUser();  
         }

         
          selectUser(){
            return new Promise((resolve) => {
              this.db.getUsers()
                .then(data => {
                  this.users = data;
                });
            });
          }

          selectUserbyid(id){
            return new Promise((resolve) => {
              this.db.getUserbyId(id)
                .then(data => {
                  return this.user = data;
                });
            });
          }    
          change(value: any){

            this.selectU = value;
            this.selectUserbyid(this.selectU);
          } 

          login(){
  
     
            if(this.selectU != ""){
  
              if(this.anass != this.user[0].password){
                console.log(this.anass);
                console.log(this.user[0].password);
                console.log(this.selectU);
  
                this.presentToast('vérifier les informations.');
                
                  }else{
                    console.log(this.anass);
                    console.log(this.user[0].password);
                    console.log(this.selectU);
  
                    //this.db.InsertActiveUser(this.user[0].username,this.user[0].password,this.user[0].question,this.user[0].reponse);
  
                    // set a key/value
                      this.storage.set('user_id', this.user[0].user_id);
                      this.storage.set('username', this.user[0].username);
                      this.storage.set('loggedin', true);

                    this.navCtrl.push(ProjectsPage,{user:this.user[0]})
                    console.log('success');
  
                
                  }
                }else{
                  console.log('empty information');
                  this.presentToast('entrer les informations');
                }
          
    } 
    presentToast(msg) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000,
        position: 'top'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
    }
forgotPassword(){
  this.navCtrl.push(ForgotpasswordPage);
}
register(){
  this.navCtrl.push(SigninPage);
}
}