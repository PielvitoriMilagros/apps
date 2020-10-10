import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: AngularFirestore) { }


  getPartidos() {
    return this.firestore.collection("partidos").snapshotChanges();
  }
  getJugadores() {
    return this.firestore.collection("jugadores").snapshotChanges();
  }
  
  
  savePartido(partido, coleccion) {
    console.log("save");
    return this.firestore.collection(coleccion).add({
      jugadorUno: partido.jugadorUno,
      jugadorDos: partido.jugadorDos,
      fecha: new Date().toLocaleString()
    });
  }





  
  saveUsuarioDni(usuario, coleccion) {
    console.log("save");
    return this.firestore.collection(coleccion).add({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      dni: usuario.dni,
      correo: usuario.correo,
      clave: usuario.clave
    });

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
