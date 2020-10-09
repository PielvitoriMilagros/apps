import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: AngularFirestore) { }


  getUsuarios() {
    return this.firestore.collection("usuarios").snapshotChanges();
  }
  
  
  getMensajesA(){
    return this.firestore.collection("mensajesA").snapshotChanges();
  }
  
  getMensajesB(){
    return this.firestore.collection("mensajesB").snapshotChanges();
  }
  
  saveMsj(msj, ucorreo, coleccion) {
    console.log("save");
    return this.firestore.collection(coleccion).add({
      mensaje: msj,
      user: ucorreo,
      fecha: new Date().toLocaleString()
    });

  }







}
