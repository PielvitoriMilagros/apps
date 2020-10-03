import { Component } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AuthenticationService } from '../servicios/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuarioActivo=false;

  public animales=true;
  public colores;
  public numeros;

  public espaniol=true;;
  public ingles;
  public portugues;

  public idioma;
  public tema;


  constructor(private authService: AuthenticationService, private nativeAudio: NativeAudio) {
    authService.currentUser().then(resp=>{
      if(resp != null)
      this.usuarioActivo = true;
  
    }).catch(error=>{
      this.usuarioActivo = false;
  
    });
  }

// 

ngOnInit(){
  this.seleccionaIdioma('E');
  this.seleccionaTema('animales');
  this.instanciaSonidos();
}



seleccionaIdioma(tipo){
this.idioma=tipo;
this.activar(tipo);
}

seleccionaTema(tema){
this.tema=tema;
this.activar(tema);
}


reproduceSonido( tipo: string){

  const id=this.idioma + '_' + tipo;
  this.nativeAudio.play(id).then(onSuccess=>{
    console.log( 'reproduciendo: ' + id );
  }, onError=>{
    console.log('Fallo al reproducir id: ' + id + 'error: ' + onError);
  });
}


instanciaSonidos(){
  console.log("ENTRA INSTANCIA SONIDOS");
  this.precargaSonido('E_uno','assets/sonidos/espaniol/uno.mp3');
  this.precargaSonido('E_dos','assets/sonidos/espaniol/dos.mp3');
  this.precargaSonido('E_tres','assets/sonidos/espaniol/tres.mp3');
  this.precargaSonido('E_cuatro','assets/sonidos/espaniol/cuatro.mp3');
  this.precargaSonido('E_cinco','assets/sonidos/espaniol/cinco.mp3');
  this.precargaSonido('E_seis','assets/sonidos/espaniol/seis.mp3');

  this.precargaSonido('E_perro','assets/sonidos/espaniol/perro.mp3');
  this.precargaSonido('E_gato','assets/sonidos/espaniol/gato.mp3');
  this.precargaSonido('E_jirafa','assets/sonidos/espaniol/jirafa.mp3');
  this.precargaSonido('E_oso','assets/sonidos/espaniol/oso.mp3');
  this.precargaSonido('E_conejo','assets/sonidos/espaniol/conejo.mp3');
  this.precargaSonido('E_pajaro','assets/sonidos/espaniol/pajaro.mp3');

  this.precargaSonido('E_amarillo','assets/sonidos/espaniol/amarillo.mp3');
  this.precargaSonido('E_azul','assets/sonidos/espaniol/azul.mp3');
  this.precargaSonido('E_rojo','assets/sonidos/espaniol/rojo.mp3');
  this.precargaSonido('E_purpura','assets/sonidos/espaniol/purpura.mp3');
  this.precargaSonido('E_naranja','assets/sonidos/espaniol/naranja.mp3');
  this.precargaSonido('E_verde','assets/sonidos/espaniol/verde.mp3');

  //sonidos ingles
  this.precargaSonido('I_uno','assets/sonidos/ingles/uno.mp3');
  this.precargaSonido('I_dos','assets/sonidos/ingles/dos.mp3');
  this.precargaSonido('I_tres','assets/sonidos/ingles/tres.mp3');
  this.precargaSonido('I_cuatro','assets/sonidos/ingles/cuatro.mp3');
  this.precargaSonido('I_cinco','assets/sonidos/ingles/cinco.mp3');
  this.precargaSonido('I_seis','assets/sonidos/ingles/seis.mp3');

  this.precargaSonido('I_perro','assets/sonidos/ingles/perro.mp3');
  this.precargaSonido('I_gato','assets/sonidos/ingles/gato.mp3');
  this.precargaSonido('I_jirafa','assets/sonidos/ingles/jirafa.mp3');
  this.precargaSonido('I_oso','assets/sonidos/ingles/oso.mp3');
  this.precargaSonido('I_conejo','assets/sonidos/ingles/conejo.mp3');
  this.precargaSonido('I_pajaro','assets/sonidos/ingles/pajaro.mp3');

  this.precargaSonido('I_amarillo','assets/sonidos/ingles/amarillo.mp3');
  this.precargaSonido('I_azul','assets/sonidos/ingles/azul.mp3');
  this.precargaSonido('I_rojo','assets/sonidos/ingles/rojo.mp3');
  this.precargaSonido('I_purpura','assets/sonidos/ingles/purpura.mp3');
  this.precargaSonido('I_naranja','assets/sonidos/ingles/naranja.mp3');
  this.precargaSonido('I_verde','assets/sonidos/ingles/verde.mp3');

  // sonidos portugues
  this.precargaSonido('P_uno','assets/sonidos/portugues/uno.mp3');
  this.precargaSonido('P_dos','assets/sonidos/portugues/dos.mp3');
  this.precargaSonido('P_tres','assets/sonidos/portugues/tres.mp3');
  this.precargaSonido('P_cuatro','assets/sonidos/portugues/cuatro.mp3');
  this.precargaSonido('P_cinco','assets/sonidos/portugues/cinco.mp3');
  this.precargaSonido('P_seis','assets/sonidos/portugues/seis.mp3');

  this.precargaSonido('P_perro','assets/sonidos/portugues/perro.mp3');
  this.precargaSonido('P_gato','assets/sonidos/portugues/gato.mp3');
  this.precargaSonido('P_jirafa','assets/sonidos/portugues/jirafa.mp3');
  this.precargaSonido('P_oso','assets/sonidos/portugues/oso.mp3');
  this.precargaSonido('P_conejo','assets/sonidos/portugues/conejo.mp3');
  this.precargaSonido('P_pajaro','assets/sonidos/portugues/pajaro.mp3');

  this.precargaSonido('P_amarillo','assets/sonidos/portugues/amarillo.mp3');
  this.precargaSonido('P_azul','assets/sonidos/portugues/azul.mp3');
  this.precargaSonido('P_rojo','assets/sonidos/portugues/rojo.mp3');
  this.precargaSonido('P_purpura','assets/sonidos/portugues/purpura.mp3');
  this.precargaSonido('P_naranja','assets/sonidos/portugues/naranja.mp3');
  this.precargaSonido('P_verde','assets/sonidos/portugues/verde.mp3');
}

 precargaSonido( id: string , path: string ){
  console.log("ENTRA PRECARGA SONIDOS");
  this.nativeAudio.preloadSimple( id, path ).then(onSuccess=>{
    console.log(onSuccess);
  }, onError=>{
    console.log(onError);
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
      case 'E':
        this.espaniol=true;
        this.portugues=false;
        this.ingles=false;
        break;
      case 'I':
        this.espaniol=false;
        this.portugues=false;
        this.ingles=true;
        break;
      case 'P':
        this.espaniol=false;
        this.portugues=true;
        this.ingles=false;
        break;
    }
  }

}
