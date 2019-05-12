import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import * as firebase from 'firebase';
import { Http } from '@angular/http'
import { FilePath } from '@ionic-native/file-path/ngx'
import { Router, ActivatedRoute } from '@angular/router'
import { AlertController } from '@ionic/angular'
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';

import {
  IMqttMessage,
  MqttModule,
  MqttService
} from 'ngx-mqtt';

// import { Subscription } from 'rxjs';
// import { Observable } from 'rxjs';

// import {
//   IMqttMessage,
//   MqttModule,
//   IMqttServiceOptions,
//   MqttService
// } from 'ngx-mqtt';


@Component({
  selector: 'app-addinfo',
  templateUrl: './addinfo.page.html',
  styleUrls: ['./addinfo.page.scss'],
  // template: `
  // <h1></h1>
  // `
})
export class AddinfoPage implements OnInit {

  private subscription: Subscription;
  public message: string;
  username: string = ""
  gender: string = ""
  age: number
  //no: number
  check: string
  imageURL;
  constructor(private acr: ActivatedRoute, private _mqttService: MqttService, public alertController: AlertController, public router: Router, public http: Http, private fileChooser: FileChooser, private file: File, private filePath: FilePath) {
    // this._mqttService.observe('Classification').subscribe((message: IMqttMessage) => {
    //   this.message = message.payload.toString();
    //   console.log(this.message)
    // });
   }

   public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {qos: 2, retain: true});
  }

  // public ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  //  public unsafePublish(topic: string, message: string): void {
  //   this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  // }

  // public ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

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

  choose() {
    this.fileChooser.open().then((uri) => {
      alert(uri);

      this.filePath.resolveNativePath(uri).then(filePath => {
        alert(filePath);
        let dirPathSegments = filePath.split('/');
        let fileName = dirPathSegments[dirPathSegments.length - 1];
        dirPathSegments.pop();
        let dirPath = dirPathSegments.join('/');
        this.file.readAsArrayBuffer(dirPath, fileName).then(async (buffer) => {
          await this.upload(buffer, fileName);
        }).catch((err) => {
          alert(err.toString());
        });
      });
    });
  }

  async upload(buffer, name) {
    let blob = new Blob([buffer], { type: "image/jpeg" });

    let storage = firebase.storage();

    storage.ref('images/' + name).put(blob).then((d) => {
      let fs = firebase.firestore();
      storage.ref('images/' + name).getDownloadURL().then((url) => {
        fs.collection("patients").doc('patient' + this.username).set({
          name: this.username,
          gender: this.gender,
          age: this.age,
          url: url
        })
        
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
          const myurl = {
            dname: 'patient' + this.username,
          };
          this.unsafePublish("image", JSON.stringify(myurl))
      });
      //this.no + 1;
      this.presentAlert('Success', 'Uploaded patient entry!')
      this.router.navigate(['/results'])
    }).catch((error) => {
      alert(JSON.stringify(error))
    })
  }
  // async mqtt(){
  //   this.unsafePublish('MelaImage', 'patient' + this.username)
  // }
}
