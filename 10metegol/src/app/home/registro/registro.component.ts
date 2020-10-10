import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Partido } from 'src/app/clases/partido';
import { Jugador } from 'src/app/clases/jugador';
// import { Plugins } from '@':

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  public usuarioActivo;

  public mostrarMensaje = false;
  public mostrarError = false;
  public mensaje;

  public jugadorUno;
  public jugadorDos;
  public fecha;

  public listaJugadores;



  constructor(private router: Router,
    private auth: AuthenticationService,
    private userServ: UsuariosService) {

    auth.currentUser().then(resp => {
      if (resp != null)
        this.usuarioActivo = true;

      userServ.getJugadores().subscribe((res: any) => {
        let jugador;
        console.log(res);
        let array = new Array();
        this.listaJugadores = [];
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          jugador = new Jugador();
          jugador.id = element.payload.doc.id;
          jugador.ganados = element.payload.doc.data().ganados;
          array.push(jugador);
        }
        array.sort(function (a, b) {
          // return new Date(b.fecha.substr(0, 19).trim()).getTime() - new Date(a.fecha.substr(0, 19).trim()).getTime();
          return (b.ganados - a.ganados);
        });
        this.listaJugadores = array;
      });


    }).catch(err => {
      this.usuarioActivo = false;
    });


  }


  ngOnInit() { }


  validarRegistro() {
    if (this.jugadorUno != null && this.jugadorDos != null &&
      this.fecha != null) {


      let partido = new Partido();
      partido.jugadorUno = this.jugadorUno;
      partido.jugadorDos = this.jugadorDos;
      partido.fecha = this.fecha;

      this.userServ.savePartido(partido, 'partidos').then(resp => {
        this.mostrarNotificacion(true, 'El partido se encuentra programado');
        this.verificarJugadores();
      }).catch(err => {
        console.log("FALLO la BD");
        console.log(err);
      })


    } else {
      this.mostrarNotificacion(false, 'Falta ingresar datos, verificar');
    }


  }








  verificarJugadores() {
    let playerUno = 0;
    let playerDos = 0;
    for (let index = 0; index < this.listaJugadores.length; index++) {
      const element = this.listaJugadores[index];
      if (element.id == this.jugadorUno) {
        playerUno = 1;
      }
    }
    if (playerUno == 0)
      this.userServ.saveJugador(this.jugadorUno, 'jugadores').then(res => {
        console.log("jugador guardado");
      }).catch(err => {
        console.log("rompio ", err);
      });

    for (let index = 0; index < this.listaJugadores.length; index++) {
      const element = this.listaJugadores[index];
      if (element.id == this.jugadorDos) {
        playerDos = 1;
      }
    }
    if (playerDos == 0)
      this.userServ.saveJugador(this.jugadorDos, 'jugadores').then(res => {
        console.log("jugador guardado");
      }).catch(err => {
        console.log("rompio ", err);
      });
      
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
