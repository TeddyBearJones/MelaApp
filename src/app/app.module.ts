import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import firebaseConfig from './firebase'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { UserService } from './user.service';
import { HttpModule } from '@angular/http'
import { FilePath } from '@ionic-native/file-path/ngx'
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { ItemsComponent } from './components/items/items.component'

import { ItemService } from './services/item.service'
import { Observable } from 'rxjs';

import {
  IMqttMessage,
  MqttModule,
  IMqttServiceOptions,
  MqttService
} from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'broker.hivemq.com',
  port: 8000,
  protocol: 'ws',
  path: '/mqtt'
  // hostname: 'm16.cloudmqtt.com',
  // port: 10034,
  // protocol: "ws",
  // username: "hyfiabxs",
  // password: "gyMTyvkJE9pa"
};

export function mqttServiceFactory() {
  return new MqttService(MQTT_SERVICE_OPTIONS);
}

@NgModule({
  declarations: [AppComponent, ItemsComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HttpModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileChooser,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    FilePath,
    AngularFirestore, ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
