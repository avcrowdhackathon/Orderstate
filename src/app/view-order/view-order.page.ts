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

  order: Order.Order;
  currentPage = 'milestones';
  comments: Order.Comment[];

  @ViewChild('commentInput', { static: false }) commentInput;
  @ViewChild('commentsList', { static: false }) commentsList;

  constructor(
    private data: DataService,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.order = await this.data.getOrder(id).toPromise();
  }

  async loadComments(event = null) {
    this.comments = await this.data
      .getComments(this.order.id)
      .toPromise()
      .then((comments) => comments.sort((a, b) => a.createdDate > b.createdDate ? 1 : -1));
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
        login: this.auth.user.login,
        imageUrl: this.auth.user.imageUrl
      },
      company: {
        name: this.auth.user.company.name
      },
      createdDate: new Date(),
    });
    setTimeout(() => {
      this.commentsList.scrollToBottom(300);
    }, 300);
    this.commentInput.setFocus();
    await this.data
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
}
