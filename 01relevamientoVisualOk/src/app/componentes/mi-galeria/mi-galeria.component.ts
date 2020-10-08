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
          userServ.getUsuarios().subscribe((res:any)=>{
            
            for (let index = 0; index < res.length; index++) {
              const element = res[index];
              let mail = element.payload.doc.data().correo;
              if(mail==resp.email){
                this.uid = element.payload.doc.id;
                this.ucorreo = element.payload.doc.data().correo;
                // console.log("current user");
                // console.log(this.ucorreo);
                
                
          // Estaba en el ngOnInit          
          // console.log("onInitFalso");
          // console.log(this.ucorreo);
          let array=new Array();
          imgServ.getImagenes().subscribe((rImg:any)=>{
            let img;
            for (let index = 0; index < rImg.length; index++) {
              const imagen = rImg[index];
              if(imagen.payload.doc.data().umail == this.ucorreo)
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
            array.sort((a,b) => {
              // console.log(new Date(b.fecha.substr(0,19).trim()).getTime() - new Date(a.fecha.substr(0,19).trim()).getTime());
              return new Date(b.fecha.substr(0,19).trim()).getTime() - new Date(a.fecha.substr(0,19).trim()).getTime();
            });
            
            this.listadoImagenes=array;
            
          });
          

        }
      }
    });
          
          
          
        } else console.log("no hay usuario");
        
        }).catch(error=>{
          console.log(error);
        });

  }

  ngOnInit() {

    // let array=new Array();
    // console.log(this.ucorreo);
    // this.imgServ.getImagenes().subscribe((resp:any)=>{
    //   let img;
    //   console.log(this.ucorreo);
    //   for (let index = 0; index < resp.length; index++) {
    //     const imagen = resp[index];
    //     if(imagen.payload.doc.data().umail == this.ucorreo)
    //     {
    //       img = new Imagen();
    //       img.esLinda = imagen.payload.doc.data().esLinda;
    //       img.uid = imagen.payload.doc.data().uid;
    //       img.umail = imagen.payload.doc.data().umail;
    //     img.image = imagen.payload.doc.data().image;
    //     img.votos = imagen.payload.doc.data().votos;
    //     img.fecha = imagen.payload.doc.data().fecha;
    //     array.push(img);
    //   }
    //   }
    //   array.sort((a,b) => {
    //     console.log(new Date(b.fecha.substr(0,19).trim()).getTime() - new Date(a.fecha.substr(0,19).trim()).getTime());
    //     return new Date(b.fecha.substr(0,19).trim()).getTime() - new Date(a.fecha.substr(0,19).trim()).getTime();
    //   });

    //   this.listadoImagenes=array;
      
    // });

  }

}
