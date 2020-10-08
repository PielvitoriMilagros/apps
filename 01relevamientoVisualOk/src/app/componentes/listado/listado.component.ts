import { Component, OnInit } from '@angular/core';
import { Imagen } from 'src/app/clases/imagen';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit {

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


                imgServ.getImagenes().subscribe((resp:any)=>{
                  let img;
                  let array=new Array();
                  for (let index = 0; index < resp.length; index++) {
                    const imagen = resp[index];
                    img = new Imagen();
                    img.key = imagen.payload.doc.id;
                    img.esLinda = imagen.payload.doc.data().esLinda;
                    img.uid = imagen.payload.doc.data().uid;
                    img.umail = imagen.payload.doc.data().umail;
                    img.image = imagen.payload.doc.data().image;
                    img.votos = imagen.payload.doc.data().votos;
                    img.votada = this.verificarVoto(img.votos);
                    img.fecha = imagen.payload.doc.data().fecha;
                    array.push(img);
                  }
            
                  
                  array.sort(function(a,b){
                    // console.log(new Date(b.fecha.substr(0,19).trim()).getTime() - new Date(a.fecha.substr(0,19).trim()).getTime());
                    return new Date(b.fecha.substr(0,19).trim()).getTime() - new Date(a.fecha.substr(0,19).trim()).getTime();
                  });
            console.log(array);
                  this.listadoImagenes=array;
                });

              }
            }
          })
        } else console.log("no hay usuario");
  
        }).catch(error=>{
          console.log(error);
        });

  }

  ngOnInit() {

//     this.imgServ.getImagenes().subscribe((resp:any)=>{
//       let img;
//       let array=new Array();
//       for (let index = 0; index < resp.length; index++) {
//         const imagen = resp[index];
//         img = new Imagen();
//         img.key = imagen.payload.doc.id;
//         img.esLinda = imagen.payload.doc.data().esLinda;
//         img.uid = imagen.payload.doc.data().uid;
//         img.umail = imagen.payload.doc.data().umail;
//         img.image = imagen.payload.doc.data().image;
//         img.votos = imagen.payload.doc.data().votos;
//         img.votada = this.verificarVoto(img.votos);
//         img.fecha = imagen.payload.doc.data().fecha;
//         array.push(img);
//       }

      
//       array.sort(function(a,b){
//         // console.log(new Date(b.fecha.substr(0,19).trim()).getTime() - new Date(a.fecha.substr(0,19).trim()).getTime());
//         return new Date(b.fecha.substr(0,19).trim()).getTime() - new Date(a.fecha.substr(0,19).trim()).getTime();
//       });
// console.log(array);
//       this.listadoImagenes=array;
//     });

  }



  votar(item){
    console.log(item);
    item.votos.push(this.ucorreo);
    this.imgServ.updateFoto(item.key,item.votos).then(resp=>{
      console.log("SI");
    }).catch(error=>{
      console.log("NO");
      console.log(error);
    });

  }



  verificarVoto(votos){
    console.log("verificavotos");
    for (let index = 0; index < votos.length; index++) {
      const element = votos[index];
      console.log("element: "+element);
      console.log("correo " + this.ucorreo);
      if(element == this.ucorreo)
      return true;      
    }
    return false;
  }












}
