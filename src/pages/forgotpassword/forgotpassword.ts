import { HomePage } from './../home/home';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  inputpass:any;
  inputconfpass:any;
  user_id:any;
  users:any
  user:any
  selectU: any = [];
  anass:any;
  questions:any = [];
  myqst:any
  constructor(public navCtrl: NavController, private db:DatabaseProvider,public navParams: NavParams,private toastCtrl: ToastController) {
    this.user_id=this.navParams.get('id');
    console.log('id: '+this.user_id);
    this.selectUser();  
    this.getQuestion();
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

  back(){
    this.navCtrl.pop();
 
}
getqst(){
  console.log(this.myqst);
}
getQuestion(){
  this.questions=[
   {
     qst_name:"lieu de naissance de ma mère",
      qst_id:1,  
   },
   {
    qst_name:"meilleur ami d'enfance",
    qst_id:2
 },
 {
  qst_name:"professeur préféré",
  qst_id:3
 },{
  qst_name:"personnage historique préféré",
  qst_id:4
 }
  ];

}

changePass(){
    if(this.inputpass == this.inputconfpass){
      this.db.updatePassword(this.user_id,this.inputpass);
      this.navCtrl.push(HomePage);
    }else{
      this.presentToast("Les mots de passe ne correspondent pas.");
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

}
