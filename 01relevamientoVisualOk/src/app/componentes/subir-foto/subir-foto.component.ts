import { Component, OnInit } from '@angular/core';
// import { Camera, CameraOptions, CameraOriginal } from '@ionic-native/camera';

@Component({
  selector: 'app-subir-foto',
  templateUrl: './subir-foto.component.html',
  styleUrls: ['./subir-foto.component.scss'],
})
export class SubirFotoComponent implements OnInit {

  // image: string = null;

  // constructor(private camera:CameraOriginal) { }
  constructor() { }

  ngOnInit() {}

  // getPicture(){
  //   let options: CameraOptions = {
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     targetWidth: 1000,
  //     targetHeight: 1000,
  //     quality: 100
  //   }
  //   this.camera.getPicture( options )
  //   .then(imageData => {
  //     this.image = `data:image/jpeg;base64,${imageData}`;
  //   })
  //   .catch(error =>{
  //     console.error( error );
  //   });
  // }


}
