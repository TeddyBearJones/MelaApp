import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import * as firebase from 'firebase';
import { Http } from '@angular/http'
import { FilePath } from '@ionic-native/file-path/ngx'
import { Router } from '@angular/router'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  imageURL: string
  constructor(public router: Router, public http: Http, private fileChooser: FileChooser, private file: File, private filePath: FilePath) { }

  ngOnInit() {
  }


  /* fileChanged(event) {
    const files = event.target.files
    console.log(files)

    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', '5872239d2806a0d0bde2')

    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe(event =>{
      console.log(event)
      this.imageURL = event.json().file
    })
  } */
  /* choose() {
    this.fileChooser.open().then((uri)=>{
      alert(uri);

      this.file.resolveLocalFilesystemUrl(uri).then((newUrl)=>{
        alert(JSON.stringify(newUrl));

        let dirPath = newUrl.nativeURL;
        let dirPathSegments = dirPath.split('/')
        dirPathSegments.pop()
        dirPath = dirPathSegments.join('/')

        this.file.readAsArrayBuffer(dirPath, newUrl.name).then(async (buffer)=>{
          await this.upload(buffer, newUrl.name);
          
        })
      })

    })
  } */

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
     }).catch((error)=>{
       alert(JSON.stringify(error))
     })
  }

  check(){
    this.router.navigate(['/results'])
  }

}

