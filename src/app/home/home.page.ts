import { Component, OnInit } from '@angular/core';
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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.username = this.authService.user.firstName;
    this.getOrders();
  }

  async refresh(ev) {
    this.getOrders();
    ev.detail.complete();
  }

  getOrders() {
    this.orders$ = this.dataService.getOrders(this.params);
  }

  async logout() {
    await this.authService.logout();
  }

}
