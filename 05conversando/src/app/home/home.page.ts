import { Component } from '@angular/core';
import { AuthenticationService } from '../servicios/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuarioActivo=false;

  constructor(private authService: AuthenticationService) {
    authService.currentUser().then(resp=>{
      if(resp != null)
      this.usuarioActivo = true;
  
    }).catch(error=>{
      this.usuarioActivo = false;
  
    });
  }

}
