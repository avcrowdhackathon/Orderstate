import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../@core/services/auth.service';
import { DataService } from '../@core/services/data.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.page.html',
  styleUrls: ['./view-order.page.scss'],
})
export class ViewOrderPage implements OnInit {

  orderId: string;
  order: Order.Order;
  currentPage = 'milestones';
  comments: Order.Comment[];

  @ViewChild('commentInput', { static: false }) commentInput;
  @ViewChild('commentsList', { static: false }) commentsList;

  dividers = {};

  get nextMilestone(): Order.Milestone {
    if (!this.order.mileStones || !this.order.mileStones.length) { return null; }

    const activeMilestones = this.order.mileStones.filter(m => !m.finished);
    if (activeMilestones.length) {
      return activeMilestones[0];
    }
    return null;
  }

  get nextStatus() {
    if (this.nextMilestone.finished) {
      return null;
    }
    if (this.nextMilestone.started) {
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

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('id');
    await this.loadOrder();
  }

  async loadOrder() {
    this.order = await this.dataService.getOrder(this.orderId).toPromise();
  }

  async loadComments(event = null) {
    this.comments = await this.dataService
      .getComments(this.order.id)
      .toPromise()
      .then((comments) => comments.sort((a, b) => a.createdDate > b.createdDate ? 1 : -1));
    this.calculateDividers();
    if (event) { event.detail.complete(); }
    setTimeout(() => {
      this.commentsList.scrollToBottom(300);
    }, 300);
  }

  async showPage(event) {
    this.currentPage = event.target.value;
    switch (this.currentPage) {
      case 'comments':
        await this.loadComments();
        break;
    }
  }

  async sendComment() {
    const text = (this.commentInput.value || '').trim();
    if (!text) { return; }
    this.commentInput.value = null;
    this.comments.push({
      text,
      user: {
        login: this.authService.user.login,
        imageUrl: this.authService.user.imageUrl
      },
      company: {
        name: this.authService.user.company.name
      },
      createdDate: new Date(),
    });
    setTimeout(() => {
      this.commentsList.scrollToBottom(300);
    }, 300);
    this.commentInput.setFocus();
    await this.dataService
      .sendComment(this.order.id, { text })
      .toPromise();
    await this.loadComments();
  }

  commentsTrackBy(e) {
    return e.id;
  }

  scrollToBottom(): void {
    if (!this.commentsList) { return; }
    setTimeout(() => {
      this.commentsList.el.scrollTop = this.commentsList.el.scrollHeight;
    }, 100);
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }

  async save() {
    this.order = await this.dataService.updateOrder(this.order).toPromise();
    // await this.loadOrder();
  }

  async toggleNextStatus() {
    switch (this.nextStatus.label) {
      case 'CONFIRM':
        this.nextMilestone.started = true;
        this.nextMilestone.finished = false;
        await this.save();
        break;
      case 'COMPLETE':
        this.nextMilestone.started = true;
        this.nextMilestone.finished = true;
        await this.save();
        break;
    }
  }

  private calculateDividers() {
    this.dividers = this.comments.reduce((l, i) => {
      const d = new Date(i.createdDate);
      const df = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      const com = Object.keys(l).find(x => l[x] === df);
      if (!com) { l[i.id] = df; }
      return l;
    }, {});
  }
}
