import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/clases/mensaje';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-sala-cuarto-b',
  templateUrl: './sala-cuarto-b.component.html',
  styleUrls: ['./sala-cuarto-b.component.scss'],
})
export class SalaCuartoBComponent implements OnInit {
  public ucorreo;

  public msjNuevo;
  public listadoMensajes;

  constructor(private auth:AuthenticationService,
    private userServ:UsuariosService) { 

      auth.currentUser().then(resp=>{
        if(resp!=null){
          this.ucorreo = resp.email;

          userServ.getMensajesB().subscribe((res:any)=>{
            let msj;
            let array=new Array();
            this.listadoMensajes=[];
            for (let index = 0; index < res.length; index++) {
              const element = res[index];
              msj = new Mensaje();
              msj.user = element.payload.doc.data().user;
              msj.mensaje = element.payload.doc.data().mensaje;
              msj.fecha = element.payload.doc.data().fecha;
              array.push(msj);
              
            }
            array.sort(function (a, b) {
              return new Date(a.fecha.substr(0, 19).trim()).getTime() - new Date(b.fecha.substr(0, 19).trim()).getTime();
            });
            
            this.listadoMensajes = array;

          });

        }else{
          console.log("no hay usuario");
        }

      }).catch(err =>{
        console.log(err);
      });


    }

  ngOnInit() {}



enviarMensaje(){
  this.userServ.saveMsj(this.msjNuevo,this.ucorreo,'mensajesB').then(resp =>{
    this.msjNuevo=null;
  });
}




}
