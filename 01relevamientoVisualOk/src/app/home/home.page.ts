/*
import { Component } from '@angular/core';
import { AuthenticationService } from '../servicios/authentication.service';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuarioActivo=false;
  public nombreUsuario;

  constructor(private authService: AuthenticationService, private userServ:UsuariosService) {
    authService.currentUser().then(resp=>{
      if(resp != null)
      this.usuarioActivo = true;

      
      
      //SI NO FUNCIONA METERLO EN UN OnInit()
      
      userServ.getUsuarios().subscribe((resp:any)=>{

        for (let index = 0; index < resp.length; index++) {
          const element = resp[index];
          console.log(element.payload.doc.data().correo);
          
        }

      });

      // userServ.getUsuarioByEmail(resp.email).subscribe((res:any) => {
        
        
        // for (let index = 0; index < res.length; index++) {
        //   const element = res[index];
        //   console.log(element.payload.doc.data().correo);
          
        // }

        // console.log("PASO por el for");


        // res.forEach(element => {
        //   console.log(element);
          // console.log(element.payload.data().correo);
        // });

        // var dato= res.payload.data();
        // console.log(res);
        // console.log(dato);


      // });



  
    }).catch(error=>{
      this.usuarioActivo = false;
  
    });
  }

}
*/
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

constructor(private menu: MenuController) { }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}