import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/@core/services/data.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {

  @Input() showDivider;

  @Input() order: Order.Order;

  get participants() {
    if (!this.order.participants) { return 'no participants'; }
    return this.order.participants.map(p => p.company ? p.company.name : '').join(', ');
  }

  get milestone(): Order.Milestone {
    if (!this.order.mileStones || !this.order.mileStones.length) { return { name: 'no milestone' }; }

    const activeMilestones = this.order.mileStones.filter(m => !m.finished);
    if (activeMilestones.length) {
      return activeMilestones[0];
    }
    return { name: 'no active milestone' };
  }

  get status() {
    if (this.order.draft) { return 'draft'; }
    if (this.order.status === 'DELIVERED') { return 'delivered'; }
    if ((new Date(this.order.expectedAt)).getTime() < (new Date()).getTime()) { return 'delayed'; }
    if (this.order.status === 'ACTIVE') { return 'active'; }
    return 'uknown';
  }

  get nextStatus() {
    if (this.milestone.finished) {
      return null;
    }
    if (this.milestone.started) {
      return {
        label: 'COMPLETE',
        color: 'success'
      };
    }
    return {
      label: 'CONFIRM',
      color: 'secondary'
    };
  }

  get progress() {
    const complete = this.order.mileStones.filter(m => m.finished).length;
    return complete / this.order.mileStones.length;
  }

  constructor(
    private dataService: DataService
  ) { }

  async switchNextStatus(slider) {
    if (this.milestone.started) {
      this.milestone.finished = true;
    } else {
      this.milestone.started = true;
    }
    // await this.dataService.updateOrder(this.order).toPromise();
    slider.close();
  }
}
