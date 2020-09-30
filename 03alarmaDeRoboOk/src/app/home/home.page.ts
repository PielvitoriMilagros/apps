import { Component } from '@angular/core';
import { AuthenticationService } from '../servicios/authentication.service';
// import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { AlertController } from '@ionic/angular';
import { UsuariosService } from '../servicios/usuarios.service';



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


  constructor(private authService: AuthenticationService, private alertCtrl: AlertController, private user: UsuariosService) {
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


  }


  activar() {
    this.alarmaActiva = true;
  }


  desactivar() {

    this.cancelAlert = false;
    this.passIngresada = null;

    this.alertPass();

    // this.alarmaActiva=false;
  }
  public validarPass() {

    var error = false;
    for (let index = 0; index < this.listaUsuarios.length; index++) {
      const element = this.listaUsuarios[index];
      if (element.payload.doc.data().correo == this.emailActivo) {
        this.passCorrecta = element.payload.doc.data().clave;
        if (this.passIngresada == this.passCorrecta) {
          this.alarmaActiva = false;
          break;
        } else {
          error = true;
        }
      } else {
        error = true;
      }
    }
    if (error != false)
      this.alertError();

    // if(this.passIngresada=="HOLA"){
    //   this.alarmaActiva=false;
    // }



  }

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
      // title: 'Desactivar',
      cssClass: 'alertError',
      header: 'Error',
      message: 'La alarma continuará encendida',
      buttons: [
        {
          text: 'Continuar'
          // handler: (cancel) => {
          //   this.cancelAlert = true;
          //   this.passIngresada = null;
          //   this.validarPass();
          // }
        }]
    });

    alertModalError.present();

  }





}
