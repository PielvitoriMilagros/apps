import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubirFotoFeaPageRoutingModule } from './subir-foto-fea-routing.module';

import { SubirFotoFeaPage } from './subir-foto-fea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubirFotoFeaPageRoutingModule
  ],
  declarations: [SubirFotoFeaPage]
})
export class SubirFotoFeaPageModule {}
