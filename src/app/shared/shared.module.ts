import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavebarComponent } from './components/navebar/navebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatrialModule } from './matrial/matrial.module';


@NgModule({
  declarations: [
    NavebarComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ToastrModule.forRoot(), // ToastrModule added
    // ReactiveFormsModule
    MatrialModule
  ],
  exports:[
    NavebarComponent,
    MatrialModule
  ]
})
export class SharedModule { }
