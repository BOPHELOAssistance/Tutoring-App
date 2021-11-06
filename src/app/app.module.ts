import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Camera } from '@ionic-native/camera/ngx';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyD1btk-ckGlaxGIuGJde6vDlHmFHOlAwVI",
  authDomain: "tutor-student-app.firebaseapp.com",
  projectId: "tutor-student-app",
  storageBucket: "tutor-student-app.appspot.com",
  messagingSenderId: "654726009106",
  appId: "1:654726009106:web:04594c14ebb2ebc4f1e3cb",
  measurementId: "G-RBVYCD3LT0"
};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
