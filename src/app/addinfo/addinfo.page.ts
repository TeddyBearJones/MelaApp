import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import * as firebase from 'firebase';
import { Http } from '@angular/http'
import { FilePath } from '@ionic-native/file-path/ngx'
import { Router } from '@angular/router'

@Component({
  selector: 'app-addinfo',
  templateUrl: './addinfo.page.html',
  styleUrls: ['./addinfo.page.scss'],
})
export class AddinfoPage implements OnInit {

  username:string = ""
  gender:string = ""
  age:number
  imageURL;

  constructor(public router: Router, public http: Http, private fileChooser: FileChooser, private file: File, private filePath: FilePath) { }

  ngOnInit() {
  }

  choose() {
    this.fileChooser.open().then((uri) => {
      alert(uri);

      this.filePath.resolveNativePath(uri).then(filePath => {
        alert(filePath);
        let dirPathSegments = filePath.split('/');
        let fileName = dirPathSegments[dirPathSegments.length-1];
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

async upload(buffer, name){
     let blob = new Blob([buffer], { type: "image/jpeg"});

     let storage = firebase.storage();

     storage.ref('images/' + name).put(blob).then((d)=>{
      alert("Done");
     let fs = firebase.firestore();
     storage.ref('images/' + name).getDownloadURL().then((url)=>{
      fs.collection("patients").doc('patient' + this.username).set({
        name: this.username,
        gender: this.gender,
        age: this.age,
        url: url
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
      });

     }).catch((error)=>{
       alert(JSON.stringify(error))
     })
  }
}
