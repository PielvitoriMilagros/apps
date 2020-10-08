import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { CommonModule } from '@angular/common';
import { LoginComponent } from './home/login/login.component';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SubirFotoLindaComponent } from './componentes/subir-foto-linda/subir-foto-linda.component';
import { SubirFotoFeaComponent } from './componentes/subir-foto-fea/subir-foto-fea.component';
import { ListadoComponent } from './componentes/listado/listado.component';
import { MiGaleriaComponent } from './componentes/mi-galeria/mi-galeria.component';
import { ResultadosComponent } from './componentes/resultados/resultados.component';

import { Chart } from "chart.js";
import * as HighCharts from 'highcharts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubirFotoLindaComponent,
    SubirFotoFeaComponent,
    ListadoComponent,
    MiGaleriaComponent,
    ResultadosComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AlertController,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
