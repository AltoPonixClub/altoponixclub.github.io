import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamRoutingModule } from './stream-routing.module';
import { StreamComponent } from './stream.component';


@NgModule({
  declarations: [
    StreamComponent
  ],
  imports: [
    CommonModule,
    StreamRoutingModule
  ]
})
export class StreamModule { }
