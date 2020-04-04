import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MilestoneComponent } from './milestone/milestone.component';
import { ViewMessagePageRoutingModule } from './view-message-routing.module';
import { ViewMessagePage } from './view-message.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMessagePageRoutingModule
  ],
  declarations: [
    ViewMessagePage,
    MilestoneComponent
  ]
})
export class ViewMessagePageModule {}
