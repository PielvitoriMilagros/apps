import { Component } from '@angular/core';
import { AuthenticationService } from '../servicios/authentication.service';
// import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { AlertController } from '@ionic/angular';
import { UsuariosService } from '../servicios/usuarios.service';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion,DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { timer } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuarioActivo = false;
  public passCorrecta;
  public emailActivo;

  public alarmaActiva = false;
  public quiereDesactivar = false;

  public passIngresada = null;
  public cancelAlert = false;

  public listaUsuarios;

  private subscription;

  public audioIzq=new Audio();
  public audioDer=new Audio();
  public audioVer=new Audio();
  public audioHor=new Audio();


  // public xOrient:any;
  // public yOrient:any;
  // public zOrient:any;
  // public timestamp:any
  public accX:any;
  public accY:any;
  public accZ:any;


  constructor(private authService: AuthenticationService, 
    private alertCtrl: AlertController, private user: UsuariosService,
    private gyroscope:Gyroscope, private deviceMotion: DeviceMotion,
    private androidPermissions:AndroidPermissions,
    private vibration:Vibration, private camera:Camera,
    private flashlight:Flashlight) {

    authService.currentUser().then(resp => {
      this.emailActivo = resp.email;
      if (resp != null)
        this.usuarioActivo = true;
    }).catch(error => {
      this.usuarioActivo = false;
    });

    user.getUsuarios().subscribe((resp: any) => {
      this.listaUsuarios = resp;
    });

    this.audioIzq.src = '../../../assets/sonidos/izquierda.mp3';
    this.audioDer.src='../../../assets/sonidos/derecha.mp3';
    this.audioVer.src='../../../assets/sonidos/vertical.mp3';
    this.audioHor.src='../../../assets/sonidos/horizontal.mp3';

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => {
        console.log('Has permission?',result.hasPermission);
        if(!result.hasPermission)
          this.androidPermissions.requestPermissions(this.androidPermissions.PERMISSION.CAMERA);
      },
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
    



  }


  activar() {
    this.alarmaActiva = true;
    this.Accelerometer();  
  }

  desactivar() {
    this.cancelAlert = false;
    this.passIngresada = null;
    this.alertPass();
  }

  public validarPass() {
    var error = false;
    for (let index = 0; index < this.listaUsuarios.length; index++) {
      const element = this.listaUsuarios[index];
      if (element.payload.doc.data().correo == this.emailActivo) {
        this.passCorrecta = element.payload.doc.data().clave;
        if (this.passIngresada == this.passCorrecta) {
          this.subscription.unsubscribe();
          this.alarmaActiva = false;
        }
      }
    }
    if (this.alarmaActiva == true)
      this.alertError();
  }

  //#region Alerts
  async alertPass() {
    const alertModal = await this.alertCtrl.create({
      // title: 'Desactivar',
      cssClass: 'alertPassword',
      header: 'Desactivar Alarma',
      message: 'Verifique su identidad para continuar',
      inputs: [{ name: 'password', placeholder: 'Ingrese su contraseña aquí', type: 'password' }],
      buttons: [
        {
          text: 'Aceptar',
          handler: (resp) => {
            this.passIngresada = resp.password;
            this.validarPass();
          }
        },
        {
          text: 'Cancelar',
          handler: (cancel) => {
            this.cancelAlert = true;
            this.passIngresada = null;
            this.alertError();
          }
        }]
    });

    alertModal.present();

  }


  async alertError() {
    const alertModalError = await this.alertCtrl.create({
      cssClass: 'alertError',
      header: 'Error',
      message: 'La alarma continuará encendida',
      buttons: [
        {
          text: 'Continuar'
        }]
    });

    alertModalError.present();

  }
//#endregion

  

  Accelerometer(){

    let flag = true;
    let flagAcostado = false;
    let flagIzq =  true;
    let flagDer = true;
    
    // Watch device acceleration
    this.subscription = this.deviceMotion.watchAcceleration({frequency: 200}).subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);
      this.accX=acceleration.x;
      this.accY=acceleration.y;
      this.accZ=acceleration.z;


      if ( this.accY < 1 && this.accX < 1 && this.accX > -1 &&  flagAcostado === true) {
        flagAcostado = false;
        timer(500).subscribe(() => {
          if (this.accX < 3) {
            this.audioHor.load();
            this.audioHor.play();
            flagAcostado = false;
            this.vibration.vibrate(5000);
          } 
        });
      } else if ( this.accY > 5 || this.accX > 5 || this.accX < -5  && flagAcostado === false ) {
        flagAcostado = true;
      }
        // vertical y linterna
        if(this.accY > 3 && flag == true){
          flag = false;
          this.flashlight.switchOn();
          this.audioVer.load();
          this.audioVer.play();
          timer(5000).subscribe(() => {
            if ( this.accY > 3) {
              flag = false;
              this.flashlight.switchOff();
            }
          });
          } else if ( this.accY < 3  && flag === false ) {
            this.flashlight.switchOff();
            flag = true;
          }
  
        // izquierda
        if ( this.accX > 3 && flagIzq === true) {
            flagIzq = false;
            timer(500).subscribe(() => {
              if (this.accX > 3) {
                flagIzq = false;
                this.audioIzq.load();
                this.audioIzq.play();
              }
            });
        } else if ( this.accX < 3  && flagIzq === false ) {
          flagIzq = true;
        }
  
        // derecha
        if ( this.accX < -3 && flagDer === true) {
          flagDer = false;
          timer(500).subscribe(() => {
            if ( this.accX < -3 ) {
              flagDer = false;
              this.audioDer.load();
              this.audioDer.play();
            }
  
          });
        } else if ( this.accX > -3  && flagDer === false) {
          flagDer = true;
        }
      });
  
    
  }





  // gyrascope(){

  // //   let options: GyroscopeOptions = {
  // //     frequency: 1000
  // //  };
   
  // //  this.gyroscope.getCurrent(options)
  // //    .then((orientation: GyroscopeOrientation) => {
  // //       console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
  // //       this.xOrient=orientation.x;
  // //       this.yOrient=orientation.y;
  // //       this.zOrient=orientation.z;
  // //       this.timestamp=orientation.timestamp;

  // //     })
  // //    .catch()
   
   
  // //  this.gyroscope.watch()
  // //     .subscribe((orientation: GyroscopeOrientation) => {
  // //        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
  // //        this.xOrient=orientation.x;
  // //       this.yOrient=orientation.y;
  // //       this.zOrient=orientation.z;
  // //       this.timestamp=orientation.timestamp;
  // //     });

  // }


}