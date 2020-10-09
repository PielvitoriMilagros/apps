import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore:AngularFirestore) { }

  getUsuarios() {
    return this.firestore.collection("usuarios").snapshotChanges();
  }
  
  getCreditos(){
    return this.firestore.collection("creditos").snapshotChanges();
  }






  updateCreditos(key: string, valor: string) {
    var creditRef = this.firestore.collection("creditos").doc(key);

    return creditRef.update({
      cargas: valor
    })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });

  }



}
