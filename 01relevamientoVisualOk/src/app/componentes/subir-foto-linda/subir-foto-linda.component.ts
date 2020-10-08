import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Imagen } from 'src/app/clases/imagen';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subir-foto-linda',
  templateUrl: './subir-foto-linda.component.html',
  styleUrls: ['./subir-foto-linda.component.scss'],
})
export class SubirFotoLindaComponent implements OnInit {

  imageURL: string;
  uid;
  ucorreo;
  imagenesCargadas=new Array();
  
  imagenesParaCargar=new Array();

  listoCarga=false;

  
  options: CameraOptions = {
    // quality: 100,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL
    // encodingType: this.camera.EncodingType.JPEG,
    // mediaType: this.camera.MediaType.PICTURE
  }

  constructor(private camera: Camera,
    private imgService:ImagenService,
    private authService:AuthenticationService,
    private userServ:UsuariosService,
    private alertCtrl:AlertController,
    private router:Router) {


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

      // Se repite muchas veces si lo hago acá
      // imgService.getImagenes().subscribe((rImg:any)=>{

      //   for (let index = 0; index < rImg.length; index++) {
      //     const element = rImg[index];
      //     console.log(element);
      //     this.imagenesCargadas.push(element.payload.doc.data().image);
      //     console.log(this.imagenesCargadas);
      //   }
      // });

    }


  ngOnInit() {
    this.tomarFoto();

    // acá también se repite xD

    // this.imgService.getImagenes().subscribe((rImg:any)=>{

    //   for (let index = 0; index < rImg.length; index++) {
    //     const element = rImg[index];
    //     this.imagenesCargadas.push(element.payload.doc.data().image);
    //     console.log(this.imagenesCargadas);
    //   }
    // });

  }



  tomarFoto() {
    this.camera.getPicture(this.options).then((imageData) => {

      this.imageURL = 'data:image/jpeg;base64,' + imageData;

      if(imageData !== 'No Image Selected'){
        this.imagenesParaCargar.push(this.imageURL);
        // this.guardarFoto(this.imageURL);
      }else{
      }
      // console.log(this.imageURL);
    }).catch((err) => {
      console.log(err);

    });

  }



  guardarFotos(){

    for (let index = 0; index < this.imagenesParaCargar.length; index++) {
      const foto = this.imagenesParaCargar[index];
      
      this.imgService.savePhoto(true,this.uid,this.ucorreo,foto).then(resp=>{
        console.log("SI");
      }).catch(error=>{
        console.log("NO");
        console.log(error);
      });

    }

    this.listoCarga=true;
    // this.router.navigate['/home'];


  }



//#region Alerts
  async alertOk() {
    const alertModalOk = await this.alertCtrl.create({
      header: 'Diálogo',
      message: 'Las imagenes fueron cargadas con éxito!',
      buttons: [
        {
          text: 'Continuar',
          handler:(continuar) =>{
            this.router.navigate['/home'];
          }
        }]
    });

    alertModalOk.present();
  }

  async alertError() {
    const alertModalError = await this.alertCtrl.create({
      cssClass: 'alertError',
      header: 'Error',
      message: 'La alarma continuará encendida',
      buttons: [
        {
          text: 'Continuar'
        }]
    });

    alertModalError.present();
  }
//#endregion


  


}
