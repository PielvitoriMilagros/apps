import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Imagen } from '../clases/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  imagenes;


  constructor(private firestore: AngularFirestore) {

    this.imagenes = this.firestore.collection("imagenes").snapshotChanges();

    this.imagenes = firestore.collection("imagenes").snapshotChanges().subscribe(x => {
    });

  }

  getImagenes() {
    return this.firestore.collection("imagenes").snapshotChanges();
  }


  savePhoto(linda,uid,ucorreo,data) {
    console.log("save");
    return this.firestore.collection("imagenes").add({
      esLinda:true,
      uid:uid,
      umail:ucorreo,
      image:data,
      votos:[],
      fecha: new Date().toString()
    });
    // .then(function (docRef) {
    //   console.log("Document written with ID: ", docRef.id);
    // })
    //   .catch(function (error) {
    //     console.error("Error adding document: ", error);
    //   });

  }






}
