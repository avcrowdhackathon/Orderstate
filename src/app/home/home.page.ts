import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../@core/services/auth.service';
import { DataService } from '../@core/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  orders$: Observable<Order.Order[]>;
  orders: Order.Order[] = null;
  params: Order.SearchParams = {
    page: 0,
    size: 20
  };

  get username() {
    return this.authService.user.firstName;
  }

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingController
  ) { }

  ngAfterViewInit() {
    this.infiniteScroll.disabled = true;
  }

  async ngOnInit() {
    this.params.page = 0;
    this.orders = await this.dataService.getOrders(this.params).toPromise();
    this.infiniteScroll.disabled = false;
  }

  async refresh(ev) {
    this.params.page = 0;
    this.orders = await this.dataService.getOrders(this.params).toPromise();
    ev.detail.complete();
    this.infiniteScroll.disabled = false;
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

  async search(event) {
    this.params.term = event.target.value;
    this.params.page = 0;
    this.orders = await this.dataService.getOrders(this.params).toPromise();
    this.infiniteScroll.disabled = false;
  }

  async loadData(event) {
    this.params.page++;
    const newOrders = await this.dataService.getOrders(this.params).toPromise();
    this.orders = this.orders.concat(newOrders);
    setTimeout(() => {
      event.target.complete();
      if (newOrders.length < this.params.size) {
        event.target.disabled = true;
      }
    }, 500);
  }

  async logout() {
  }

}
