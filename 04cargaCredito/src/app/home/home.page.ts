import { Component } from '@angular/core';
import { AuthenticationService } from '../servicios/authentication.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuarioActivo = false;
  public ucorreo;
  public datoLeido;
  public formatoLeido;
  public canceladoLeido;

  public esAdmin = false;
  public creditosUsuario;
  public creditoTotal;

  public mostrarError = false;
  public mostrarMensaje = false;
  public mensaje;

  constructor(private authService: AuthenticationService,
    private escaner: BarcodeScanner,
    private userServ: UsuariosService) {

    authService.currentUser().then(resp => {
      if (resp != null)
        this.usuarioActivo = true;
      this.ucorreo = resp.email;

      userServ.getCreditos().subscribe((res: any) => {
        this.creditosUsuario = [];
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          if (resp.email == element.payload.doc.id) {
            if (resp.email == 'admin@admin.com')
              this.esAdmin = true;
            this.creditosUsuario = element.payload.doc.data().cargas;
            this.calcularCreditoTotal();

          }
        }

      });

    }).catch(error => {
      this.usuarioActivo = false;

    });
  }


  public escanear() {

    this.escaner.scan().then(barcodeData => {
      this.datoLeido = barcodeData.text;
      this.formatoLeido = barcodeData.format;
      this.canceladoLeido = barcodeData.cancelled;
      this.validarCarga();

      console.log('Barcode data', barcodeData);
    }).catch(err => {
      console.log('Error', err);
      this.datoLeido = err;
    });

  }


  calcularCreditoTotal() {
    let valor = 0;
    let acum = 0;
    for (let index = 0; index < this.creditosUsuario.length; index++) {
      const element = this.creditosUsuario[index];
      switch (element) {
        case '8c95def646b6127282ed50454b73240300dccabc':
          valor = 10;
          break;
        case 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172':
          valor = 50;
          break;
        case '2786f4877b9091dcad7f35751bfcf5d5ea712b2f':
          valor = 100;
          break;
      }
      acum += valor;
    }
    this.creditoTotal = acum;
  }


  validarCarga() {
    let repetido = false;
    if (this.datoLeido == '8c95def646b6127282ed50454b73240300dccabc' || //10
      this.datoLeido == 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172' || //50
      this.datoLeido == '2786f4877b9091dcad7f35751bfcf5d5ea712b2f') //100
    {
      for (let index = 0; index < this.creditosUsuario.length; index++) {
        const codigo = this.creditosUsuario[index];

        if (codigo == this.datoLeido) {

          if (this.esAdmin) {
            let unaVez = 0;
            for (let index = 0; index < this.creditosUsuario.length; index++) {
              const codAdmin = this.creditosUsuario[index];
              if (codAdmin == codigo)
                unaVez++;
            }
            if (unaVez > 1)
              repetido = true;

          } else repetido = true;
        }
      }
      if (repetido) {
        this.mostrarNotificacion(false, 'El código no puede volver a cargarse');
      } else {
        this.creditosUsuario.push(this.datoLeido);
        this.userServ.updateCreditos(this.ucorreo, this.creditosUsuario);
        this.mostrarNotificacion(true, 'El código fue cargado correctamente. Verifique el incremento de saldo');
      }
    }



  }


  limpiarCreditos() {
    this.creditosUsuario = [];
    this.calcularCreditoTotal();
    this.userServ.updateCreditos(this.ucorreo, this.creditosUsuario);
    this.mostrarNotificacion(true, 'El saldo de la cuenta fue reiniciado');
  }



  mostrarNotificacion(exito, msj) {
    this.mensaje = msj;
    if (exito) {
      this.mostrarMensaje = true;
      setTimeout(() => {
        this.mostrarMensaje = false;
      }, 2000);
    } else {
      this.mostrarError = true;
      setTimeout(() => {
        this.mostrarError = false;
      }, 2000);
    }
  }

// PARA PROBAR
  // simularCarga(valor) {

  //   switch (valor) {
  //     case '10':
  //       this.datoLeido = '8c95def646b6127282ed50454b73240300dccabc';
  //       this.validarCarga();
  //       break;
  //     case '50':
  //       this.datoLeido = 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172';
  //       this.validarCarga();
  //       break;
  //     case '100':
  //       this.datoLeido = '2786f4877b9091dcad7f35751bfcf5d5ea712b2f';
  //       this.validarCarga();
  //       break;
  //   }

  // }


}
