import { Component } from '@angular/core';
import { AuthenticationService } from '../servicios/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuarioActivo=false;

  public animales;
  public colores;
  public numeros;

  public espaniol;
  public ingles;
  public portugues;

  constructor(private authService: AuthenticationService) {
    authService.currentUser().then(resp=>{
      if(resp != null)
      this.usuarioActivo = true;
  
    }).catch(error=>{
      this.usuarioActivo = false;
  
    });
  }

  activar(tipo){
    console.log(tipo);
    switch(tipo){
      case 'animales':
        this.animales=true;
        this.colores=false;
        this.numeros=false;
        break;
      case 'colores':
        this.animales=false;
        this.colores=true;
        this.numeros=false;
        break;
      case 'numeros':
        this.animales=false;
        this.colores=false;
        this.numeros=true;
        break;
    }
  }





}
