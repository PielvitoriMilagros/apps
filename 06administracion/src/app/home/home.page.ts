import { Component } from '@angular/core';
import { Usuario } from '../clases/usuario';
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
  public listadoUsuarios;

  constructor(private authService: AuthenticationService,
    private userServ:UsuariosService) {
    authService.currentUser().then(resp=>{
      if(resp != null){

        this.usuarioActivo = true;
        this.ucorreo = resp.email;
      if(this.ucorreo == 'admin@admin.com')
        this.esAdmin=true;
        
        
        userServ.getUsuarios().subscribe((res:any)=>{
          let usu;
          let array = new Array();
          this.listadoUsuarios=[];
          for (let index = 0; index < res.length; index++) {
            const element = res[index];
            usu=new Usuario();
            usu.apellido = element.payload.doc.data().apellido;
            usu.nombre = element.payload.doc.data().nombre;
            usu.dni = element.payload.doc.data().dni;
            usu.correo = element.payload.doc.data().correo;
            array.push(usu);
          }
          array.sort(function (a, b) {
            // return new Date(a.fecha.substr(0, 19).trim()).getTime() - new Date(b.fecha.substr(0, 19).trim()).getTime();
            return (a.apellido - b.apellido)
          });
          
          this.listadoUsuarios = array;
        });
        
        
        
      }else console.log("no hay usuario");
    }).catch(error=>{
      this.usuarioActivo = false;
  
    });
  }

}
