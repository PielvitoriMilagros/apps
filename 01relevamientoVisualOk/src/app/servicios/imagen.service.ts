import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';

import { Imagen } from '../clases/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  imagenes;


  constructor(private firestore: AngularFirestore) {

    this.imagenes = this.firestore.collection("imagenes").snapshotChanges();

    // this.imagenes = firestore.collection("imagenes").snapshotChanges().subscribe(x => {
    // });

  }

  getImagenes() {
    return this.firestore.collection("imagenes").snapshotChanges();
  }


  savePhoto(linda, uid, ucorreo, data) {
    console.log("save");
    let dia = new Date().getDate();
    let mes = new Date().getMonth();
    let year = new Date().getFullYear();
    let fecha = year + '-' + mes + '-' + dia;
    return this.firestore.collection("imagenes").add({
      esLinda: linda,
      uid: uid,
      umail: ucorreo,
      image: data,
      votos: [],
      fecha: new Date().toLocaleString()
      // fecha: new Date().toString()
    });
    // .then(function (docRef) {
    //   console.log("Document written with ID: ", docRef.id);
    // })
    //   .catch(function (error) {
    //     console.error("Error adding document: ", error);
    //   });

  }



  updateFoto(key: string, valor: string) {
    var imagenRef = this.firestore.collection("imagenes").doc(key);

    return imagenRef.update({
      votos: valor
    })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });

  }




}
