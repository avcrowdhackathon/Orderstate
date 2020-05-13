import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommentComponent } from './comment/comment.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { ViewOrderPageRoutingModule } from './view-order-routing.module';
import { ViewOrderPage } from './view-order.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewOrderPageRoutingModule
  ],
  declarations: [
    ViewOrderPage,
    MilestoneComponent,
    CommentComponent
  ]
})
export class ViewOrderPageModule {}
