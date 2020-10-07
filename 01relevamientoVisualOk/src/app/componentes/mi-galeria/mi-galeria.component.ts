import { Component, OnInit } from '@angular/core';
import { Imagen } from 'src/app/clases/imagen';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-mi-galeria',
  templateUrl: './mi-galeria.component.html',
  styleUrls: ['./mi-galeria.component.scss'],
})
export class MiGaleriaComponent implements OnInit {

  uid;
  ucorreo;

  listadoImagenes;

  constructor(private imgServ:ImagenService,
    private userServ:UsuariosService,
    private authService: AuthenticationService) {

      authService.currentUser().then(resp=>{
        if(resp != null){
          // console.log(resp.email);
          userServ.getUsuarios().subscribe((res:any)=>{
  
            for (let index = 0; index < res.length; index++) {
              const element = res[index];
              let mail = element.payload.doc.data().correo;
              if(mail==resp.email){
                this.uid = element.payload.doc.id;
                this.ucorreo = element.payload.doc.data().correo;
              }
            }
          })
        } else console.log("no hay usuario");
  
        }).catch(error=>{
          console.log(error);
        });

  }

  ngOnInit() {

    let array=new Array();
    this.imgServ.getImagenes().subscribe((resp:any)=>{
      let img;
      for (let index = 0; index < resp.length; index++) {
        const imagen = resp[index];
        if(imagen.uid == this.uid)
        {
          img = new Imagen();
          img.esLinda = imagen.payload.doc.data().esLinda;
          img.uid = imagen.payload.doc.data().uid;
          img.umail = imagen.payload.doc.data().umail;
        img.image = imagen.payload.doc.data().image;
        img.votos = imagen.payload.doc.data().votos;
        img.fecha = imagen.payload.doc.data().fecha;
        array.push(img);
      }
      }
      
      array.sort(function(a,b){
        console.log("antes");
        console.log(a);
        console.log(b);
        a=new Date(a);
        b=new Date(b);
        console.log("dps");
        console.log(a);
        console.log(b);
        return(b.fecha - a.fecha);
      });

      this.listadoImagenes=array;
    });

  }

}
