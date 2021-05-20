import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

/**
 * Generated class for the qstegoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  questions:any = [];
  myqst:any
  userdata:any
  inputpass:any
  inputconfpass:any
  constructor(public navCtrl: NavController, public navParams: NavParams,private db:DatabaseProvider,private toastCtrl: ToastController)  {
    this.getQuestion();
    this.userdata = [{
      username:'',
      password:'',
      question:'',
      reponse:''
    }]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
    
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

back(){
  this.navCtrl.pop();
}

  register(){
    if(this.userdata.username && this.userdata.password && this.userdata.question && this.userdata.reponse){
      if(this.inputpass==this.inputconfpass){
      this.db.InsertUser(this.userdata.username,this.userdata.password,this.userdata.question,this.userdata.reponse);
      this.navCtrl.push(HomePage);}
      else{this.presentToast('Les mots de passe ne correspondent pas.');}
    }else{
      this.presentToast('Tout les champs sont obligatoires');
    }
  }
}


