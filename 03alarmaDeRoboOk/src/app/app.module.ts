import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AlertController, IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { CommonModule } from '@angular/common';
import { LoginComponent } from './home/login/login.component';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion,DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AlertController,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Gyroscope,
    DeviceMotion,
    AndroidPermissions,
    Vibration,
    Camera,
    Flashlight
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
