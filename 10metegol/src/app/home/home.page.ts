import { Component } from '@angular/core';
import { Jugador } from '../clases/jugador';
import { Partido } from '../clases/partido';
import { AuthenticationService } from '../servicios/authentication.service';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuarioActivo=false;
  public ucorreo;
  public esAdmin;
  public listadoPartidos;

  public listadoJugadores;

  constructor(private authService: AuthenticationService,
    private userServ:UsuariosService) {
    authService.currentUser().then(resp=>{
      if(resp != null){

        this.usuarioActivo = true;
        this.ucorreo = resp.email;
      if(this.ucorreo == 'admin@admin.com')
        this.esAdmin=true;
        
        
        userServ.getPartidos().subscribe((res:any)=>{
          let partido;
          console.log(res);
          let array = new Array();
          this.listadoPartidos=[];
          for (let index = 0; index < res.length; index++) {
            const element = res[index];
            partido=new Partido();
            partido.jugadorUno = element.payload.doc.data().jugadorUno;
            partido.jugadorDos = element.payload.doc.data().jugadorDos;
            partido.golesUno = element.payload.doc.data().golesUno;
            partido.golesDos = element.payload.doc.data().golesDos;
            partido.finalizado = element.payload.doc.data().finalizado;
            array.push(partido);
          }
          array.sort(function (a, b) {
            return new Date(b.fecha.substr(0, 19).trim()).getTime() - new Date(a.fecha.substr(0, 19).trim()).getTime();
          });
          console.log(this.listadoPartidos);
          this.listadoPartidos = array;
          console.log(this.listadoPartidos);
        });

        
        userServ.getJugadores().subscribe((resJug:any)=>{
          let jugador;
          console.log(resJug);
          let arrayJ = new Array();
          this.listadoJugadores=[];
          for (let index = 0; index < resJug.length; index++) {
            const element = resJug[index];
            jugador=new Jugador();
            jugador.id = jugador.payload.doc.id;
            jugador.ganados = jugador.payload.doc.data().ganados;
            
            arrayJ.push(jugador);
          }
          arrayJ.sort(function (a, b) {
            // return new Date(b.fecha.substr(0, 19).trim()).getTime() - new Date(a.fecha.substr(0, 19).trim()).getTime();
            return ( b.ganados - a.ganados );
          });
          
          this.listadoJugadores = arrayJ;
        });
        
        
      }else console.log("no hay usuario");


    }).catch(error=>{
      this.usuarioActivo = false;
  
    });
  }

}
