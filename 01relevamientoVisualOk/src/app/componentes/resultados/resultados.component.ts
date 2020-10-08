import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Imagen } from 'src/app/clases/imagen';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

import { Chart } from "chart.js";
import * as HighCharts from 'highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {


  uid;
  ucorreo;

  cosasLindas = true;

  imagenesLindas;
  imagenesFeas;



  constructor(private authService: AuthenticationService,
    private userServ: UsuariosService,
    private imgServ: ImagenService) {

    authService.currentUser().then(resp => {
      if (resp != null) {
        // console.log(resp.email);
        userServ.getUsuarios().subscribe((res: any) => {

          for (let index = 0; index < res.length; index++) {
            const element = res[index];
            let mail = element.payload.doc.data().correo;
            if (mail == resp.email) {
              this.uid = element.payload.doc.id;
              this.ucorreo = element.payload.doc.data().correo;


              imgServ.getImagenes().subscribe((resp: any) => {
                let img;
                let arrayLindas = new Array();
                let arrayFeas = new Array();
                for (let index = 0; index < resp.length; index++) {
                  const imagen = resp[index];
                  img = new Imagen();
                  img.key = imagen.payload.doc.id;
                  img.esLinda = imagen.payload.doc.data().esLinda;
                  img.uid = imagen.payload.doc.data().uid;
                  img.umail = imagen.payload.doc.data().umail;
                  img.image = imagen.payload.doc.data().image;
                  img.votos = imagen.payload.doc.data().votos;
                  img.votada = this.verificarVotos(img.votos);
                  img.fecha = imagen.payload.doc.data().fecha;
                  if (img.esLinda)
                    arrayLindas.push(img);
                  else
                    arrayFeas.push(img);
                }


                arrayLindas.sort(function (a, b) {
                  // console.log(new Date(b.fecha.substr(0,19).trim()).getTime() - new Date(a.fecha.substr(0,19).trim()).getTime());
                  return new Date(b.fecha.substr(0, 19).trim()).getTime() - new Date(a.fecha.substr(0, 19).trim()).getTime();
                });
                arrayFeas.sort(function (a, b) {
                  // console.log(new Date(b.fecha.substr(0,19).trim()).getTime() - new Date(a.fecha.substr(0,19).trim()).getTime());
                  return new Date(b.fecha.substr(0, 19).trim()).getTime() - new Date(a.fecha.substr(0, 19).trim()).getTime();
                });

                this.imagenesLindas = arrayLindas;
                this.imagenesFeas = arrayFeas;
              });

            }
          }
        })
      } else console.log("no hay usuario");

    }).catch(error => {
      console.log(error);
    });



  }




  // ionViewDidEnter() {
  //   this.plotSimpleBarChart();
  // }



  
  plotSimpleBarChart() {
    let myChart = HighCharts.chart('highcharts', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Fruit Consumption'
      },
      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        }
      },
      series: [
        {
          name: 'Jane',
          type: undefined,
          data: [1, 0, 4]
        },
        {
          name: 'John',
          type: undefined,
          data: [5, 7, 3]
        }]
    });
  }










  ngOnInit() {

    const options:HighCharts.Options = {
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]
      },
      series: [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        type: 'column'
      }]
    }
    
    const chart = Highcharts.chart(options);
    // const chart = Highcharts.chart('container', options)

  }


  activarCategoria(activo) {
    this.cosasLindas = activo;
  }

  verificarVotos(arrayDeVotos) {
    if (arrayDeVotos != null) {
      return arrayDeVotos.length;
    }
    return 0;


  }
















}
