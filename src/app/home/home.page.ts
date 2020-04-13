import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../@core/services/auth.service';
import { DataService } from '../@core/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  username: any;
  orders$: Observable<Order.Order[]>;
  params = {};

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingController
  ) { }

  ngOnInit(): void {
    this.username = this.authService.user.firstName;
    this.getOrders();
  }

  async refresh(ev) {
    this.getOrders();
    ev.detail.complete();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: `Welcome ${this.username}`,
      buttons: [{
        text: 'Logout',
        icon: 'log-out-outline',
        handler: async () => {
          const loading = await this.loadingController.create({
            message: 'Goodbye...',
            animated: true,
          });
          await loading.present();
          await this.authService.logout();
          await loading.dismiss();
          return true;
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  getOrders() {
    this.orders$ = this.dataService.getOrders(this.params);
  }

  async logout() {
  }

}
