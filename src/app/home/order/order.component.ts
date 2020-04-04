import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {

  @Input() order: Order.Order;

  get participants() {
    if (!this.order.participants) { return 'no participants'; }
    return this.order.participants.map(p => p.company ? p.company.name : '').join(', ');
  }

  get milestone() {
    if (!this.order.mileStones || !this.order.mileStones.length) { return 'no milestone'; }

    const activeMilestones = this.order.mileStones.filter(m => !m.finished);
    if (activeMilestones.length) {
      return activeMilestones[0].name;
    }
    return 'no active milestone';
  }
}
