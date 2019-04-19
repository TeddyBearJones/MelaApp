import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router'
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username:string = ""
  password:string = ""

  constructor(public afAuth: AngularFireAuth, public router: Router, public user: UserService) {
  }

  ngOnInit() {
  }
  
  async login(){
    const {username, password} = this
  try{
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@gmail.com', password)
      
      //new stuff
      if(res.user){
        this.user.setUser({
          username,
          uid: res.user.uid
        })
        this.router.navigate(['/upload'])
      }
      //new stuff

      this.router.navigate(['/upload'])
  } catch (err){
    console.dir(err)
    if(err.code == "auth/user-not-found"){
      console.log("User not found")
    }
  }
  }

  

}