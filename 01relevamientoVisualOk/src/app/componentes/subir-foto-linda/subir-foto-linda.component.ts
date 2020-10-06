import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Imagen } from 'src/app/clases/imagen';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-subir-foto-linda',
  templateUrl: './subir-foto-linda.component.html',
  styleUrls: ['./subir-foto-linda.component.scss'],
})
export class SubirFotoLindaComponent implements OnInit {

  imageURL: string;
  uid;
  ucorreo;
  imagen=new Array();


  constructor(private camera: Camera,
    private imgService:ImagenService,
    private authService:AuthenticationService,
    private userServ:UsuariosService) {

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

      imgService.getImagenes().subscribe((rImg:any)=>{

        for (let index = 0; index < rImg.length; index++) {
          const element = rImg[index];
          console.log(element);
          this.imagen.push(element.payload.doc.data().image);
          console.log(this.imagen);
        }


      });



    }

  ngOnInit() {

    

  }

  options: CameraOptions = {
    // quality: 100,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.FILE_URI
    // encodingType: this.camera.EncodingType.JPEG,
    // mediaType: this.camera.MediaType.PICTURE
  }


  tomarFoto() {
    this.camera.getPicture(this.options).then((imageData) => {

      this.imageURL = 'data:image/jpeg;base64,' + imageData;

      if(imageData !== 'No Image Selected'){
        this.guardarFoto(this.imageURL);
      }else{
      }

      // console.log(this.imageURL);
    }).catch((err) => {
      console.log(err);

    });

  }


  guardarFoto(imageData){
    console.log("ENTRA");
    let image=new Imagen();
    image.esLinda = true;
    image.uid = this.uid;
    image.umail = this.ucorreo;
    image.image = imageData;
    image.votos = [];
    // image.votos = new Array();
    image.fecha =  new Date().toLocaleString();

    // this.imgService.savePhoto(image).then(resp=>{
    this.imgService.savePhoto(true,this.uid,this.ucorreo,imageData).then(resp=>{
      console.log("SI");
      console.log(resp);

    }).catch(error=>{
      console.log("NO");
      console.log(error);
    });

  }





  // takePicture() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     sourceType: this.camera.PictureSourceType.CAMERA
  //   };
  //   this.camera.getPicture(options)
  //   .then((imageData) => {
  //     this.image = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }


}
