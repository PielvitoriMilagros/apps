import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { UsuariosService } from 'src/app/servicios/usuarios.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})

export class RegistroComponent implements OnInit {

  public usuarioActivo;

  public mostrarMensaje=false;
  public mostrarError=false;
  public mensaje;

  public nombre;
  public apellido;
  public dni;
  public usuario;
  public clave;
  public claveDos;

  public datoLeido;
  public formatoLeido;

  types = ["PDF417", "QR Code"];



  constructor(private router:Router,
    private auth:AuthenticationService,
    private userServ:UsuariosService,
    private escaner:BarcodeScanner) { 

      auth.currentUser().then(resp=>{
        if(resp != null)
          this.usuarioActivo = true;

      }).catch(err=>{
        this.usuarioActivo = false;
      });


    }


    
  options: BarcodeScannerOptions = {
    //prompt : "Escaneando", // Android
    resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
    formats : "PDF_417", // default: all but PDF_417 and RSS_EXPANDED
    orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
    disableAnimations : true, // iOS
    disableSuccessBeep: false // iOS and Android
  };


  ngOnInit() {}


  validarRegistro(){
    if(this.nombre != null && this.apellido != null &&
      this.dni != null && this.usuario != null &&
      this.clave != null && this.claveDos != null){

        if(this.dni > 9999999 && this.dni < 99999999){

          if(this.clave == this.claveDos){
            let user = new Usuario();
            user.apellido = this.apellido;
            user.nombre = this.nombre;
            user.dni = this.dni;
            user.correo = this.usuario;
            user.clave = this.clave;

            this.userServ.saveUsuarioDni(user,'usuariosDni').then(resp=>{
              this.auth.registrarCuenta(user.correo,user.clave).then(res=>{

                this.mostrarNotificacion(true,'El usuario fue dado de alta correctamente');

              }).catch(error=>{
                console.log("rompio el authentication");
                console.log(error);
              });

            }).catch(err=>{
              console.log("FALLO la BD");
              console.log(err);
            })


          }else{
            this.mostrarNotificacion(false,'Las claves no coinciden, reingresar.',1);
          }

        }else{
          this.mostrarNotificacion(false,'El dni es incorrecto. Revisar el formato (entre 10000000 y 99999999)',2);
        }

      } else {
        this.mostrarNotificacion(false,'Falta ingresar datos, verificar',3);
      }


  }


 escanear(){
  
  this.escaner.scan(this.options).then(barcodeData =>{
    this.datoLeido = barcodeData.text;
    this.formatoLeido = barcodeData.format;
    let probando = this.datoLeido.split('@');
    this.apellido=probando[1];
    this.nombre=probando[2];
    this.dni=probando[4];

  }).catch(err => {
      console.log('Error', err);
      this.datoLeido = err;
    });

 }





  mostrarNotificacion(exito, msj,opcion=null) {
    this.mensaje = msj;
    if (exito) {
      this.mostrarMensaje = true;
      setTimeout(() => {
        this.mostrarMensaje = false;
        this.manejarEvento(true);
      }, 2000);
    } else {
      this.mostrarError = true;
      setTimeout(() => {
        this.mostrarError = false;
        this.manejarEvento(false,opcion);
      }, 2000);
    }
  }

  manejarEvento(salioBien,opc=null){
    if(salioBien){
      this.router.navigate(['/home']);
    }else{
      switch(opc){
        case 1:
          this.clave=null;
          this.claveDos=null;
          break;
        case 2:
          this.dni=null;
          break;
      }
    }
  }


}
