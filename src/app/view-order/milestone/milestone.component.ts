import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss'],
})
export class MilestoneComponent {

  @Input() milestone: Order.Milestone;
  @Input() participants: Order.Participant[];

  @Output() save = new EventEmitter();

  get status() {
    if (this.milestone.finished) {
      return {
        icon: 'checkmark-circle-outline',
        color: 'success'
      };
    }
    if (this.milestone.started) {
      return {
        icon: 'flag-outline',
        color: 'secondary'
      };
    }
    return {
      icon: 'time-outline',
      color: 'light'
    };
  }

  get assignee() {
    const assigneeKey = Object.keys(this.milestone.milestoneAssignments)[0];
    const participant = this.participants.find(x => x.company.id === assigneeKey);
    return participant.company;

  }

  constructor(
    private actionSheetController: ActionSheetController,
  ) { }

  switchStatus(status) {
    switch (status) {
      case 'pending':
        this.milestone.started = false;
        this.milestone.finished = false;
        this.save.emit();
        break;
      case 'confirm':
        this.milestone.started = true;
        this.milestone.finished = false;
        this.save.emit();
        break;
      case 'complete':
        this.milestone.started = true;
        this.milestone.finished = true;
        this.save.emit();
        break;
    }
    return true;
  }

  async openStatusSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: `Status: ${this.milestone.name}`,
      buttons: [
        { text: 'Pending', icon: 'time-outline', handler: () => this.switchStatus('pending') },
        { text: 'Confirmed', icon: 'flag-outline', handler: () => this.switchStatus('confirm') },
        { text: 'Completed', icon: 'checkmark-circle-outline', handler: () => this.switchStatus('complete') },
        {
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
}
