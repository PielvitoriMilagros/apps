import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Partido } from 'src/app/clases/partido';
// import { Plugins } from '@':

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

  public jugadorUno;
  public jugadorDos;
  public fecha;



  constructor(private router:Router,
    private auth:AuthenticationService,
    private userServ:UsuariosService) { 

      auth.currentUser().then(resp=>{
        if(resp != null)
          this.usuarioActivo = true;

      }).catch(err=>{
        this.usuarioActivo = false;
      });


    }


  ngOnInit() {}


  validarRegistro(){
    if(this.jugadorUno != null && this.jugadorDos != null &&
      this.fecha != null){

    
            let partido = new Partido();
            partido.jugadorUno = this.jugadorUno;
            partido.jugadorDos = this.jugadorDos;
            partido.fecha = this.fecha;

            this.userServ.savePartido(partido,'partidos').then(resp=>{
              this.mostrarNotificacion(true,'El partido se encuentra programado');
            }).catch(err=>{
              console.log("FALLO la BD");
              console.log(err);
            })


      } else {
        this.mostrarNotificacion(false,'Falta ingresar datos, verificar');
      }


  }

















  mostrarNotificacion(exito, msj) {
    this.mensaje = msj;
    if (exito) {
      this.mostrarMensaje = true;
      setTimeout(() => {
        this.mostrarMensaje = false;
        this.router.navigate(['/home']);
      }, 2000);
    } else {
      this.mostrarError = true;
      setTimeout(() => {
        this.mostrarError = false;
      }, 2000);
    }
  }



}
