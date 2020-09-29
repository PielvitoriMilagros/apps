import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

import { map } from 'rxjs/operators';
// import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../clases/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  // constructor(private firestore: AngularFirestore, private http:HttpClient) { }  

  // Esto es con CloudFirestore

  constructor(private firestore: AngularFirestore) { }

  getUsuarios() {
    return this.firestore.collection("usuarios").snapshotChanges();
  }

  public getUsuarioByEmail(email: string) {
    // return this.http.get(environment.firebaseConfig.databaseURL+"/usuarios.json").pipe(map(resp=>{
    console.log("LLEGO");

    return this.firestore.collection("usuarios").doc(email).snapshotChanges();


    // return this.getUsuarios().pipe(map(resp => {
    //   console.log(resp);
    //   return this.filtrarPorMail(resp, email)
    // }));
  }











  filtrarPorMail(res: any, email: string) {
    let usuarios;
    let aux = null;
    usuarios = this.objecToArray(res);
    for (let index = 0; index < usuarios.length; index++) {
      const element = usuarios[index];
      if (element.correo == email) {
        aux = element;
      }
    }
    return aux;
  }


  private objecToArray(datos: Object) {
    const users = [];
    if (datos == null) return [];

    Object.keys(datos).forEach(key => {
      let user: any = datos[key];
      user.id = key;
      users.push(user);

    })
    return users;
  }



}
