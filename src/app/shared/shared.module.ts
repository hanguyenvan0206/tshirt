import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


//component
import { MenuComponent } from './components/menu/menu.component';
import { BannerComponent } from './components/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule  } from '@angular/router';
import { NavigateService } from './services/navigate.service';
import { RatingSharedComponent } from './components/rating-shared/rating-shared.component';
import { FormatTextPipe } from './pipes/format-text.pipe';
import { ControlGuard } from './services/guards/control.guard';


@NgModule({
  
  declarations: [
    MenuComponent, 
    BannerComponent, 
    FooterComponent, RatingSharedComponent, FormatTextPipe],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    MenuComponent,
    BannerComponent,
    FooterComponent,
    RatingSharedComponent,
    FormatTextPipe
  ],
  providers: [
    NavigateService,
    ControlGuard
  ],
})
export class SharedModule { }
