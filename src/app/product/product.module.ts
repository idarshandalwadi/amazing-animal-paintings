import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './produt-list/product-list.component';
import {MatCardModule} from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    ProductListComponent
  ],
  
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule, MatTooltipModule,
    FlexModule, MatInputModule, MatSelectModule
  ]
})
export class ProductModule { }
