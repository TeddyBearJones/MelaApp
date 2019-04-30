import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router'
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""

  constructor(public alertController: AlertController, public afAuth: AngularFireAuth, public router: Router, public user: UserService) {
  }

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

  async login() {
    const { username, password } = this
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@gmail.com', password)

      //new stuff
      if (res.user) {
        this.user.setUser({
          username,
          uid: res.user.uid
        })
        this.presentAlert('Success', 'Logged in!')
        this.router.navigate(['/upload'])
      }
      //new stuff

    } catch (err) {
      console.dir(err)
      this.presentAlert('Failed', 'Invalid Input!')
      if (err.code == "auth/user-not-found") {
        console.log("User not found")
        this.presentAlert('Failed', 'User not found, Enter valid user!')
      }
    }
  }

  // getN() {
  //   // return this.username;
  //   this.router.navigate(['addinfo',this.username])
  // }
}
