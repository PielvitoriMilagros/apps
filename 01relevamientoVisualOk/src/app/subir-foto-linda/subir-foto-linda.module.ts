import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubirFotoLindaPageRoutingModule } from './subir-foto-linda-routing.module';

import { SubirFotoLindaPage } from './subir-foto-linda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubirFotoLindaPageRoutingModule
  ],
  declarations: [SubirFotoLindaPage]
})
export class SubirFotoLindaPageModule {}
