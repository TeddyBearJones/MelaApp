import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router'

import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service'
import { AlertController } from '@ionic/angular'


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username:string = ""
  password:string = ""
  cpassword:string = ""
  
  constructor(public alertController: AlertController, public afAuth: AngularFireAuth, public router: Router, public afstore: AngularFirestore, public user: UserService) { }

  ngOnInit() {
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['Ok']
    })

    await alert.present()
  }

  async register(){
    const { username, password, cpassword } = this
    if(password != cpassword){
      this.presentAlert('Failed', "Passwords don't match!")
      return console.error("Passwords don't match")
    }
    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@gmail.com', password)
      console.log(res)

      this.afstore.doc(`users/${res.user.uid}`).set({
        username
      })

      this.user.setUser({
        username,
        uid: res.user.uid
      })

      this.presentAlert('Success', 'You are registered!')

      this.router.navigate(['/login'])
    } catch(error) {
      console.dir(error)
      this.presentAlert('Failed', 'User already exists!')
    }
    
  }

}
