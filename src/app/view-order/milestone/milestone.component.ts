import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss'],
})
export class MilestoneComponent implements OnInit {

  @Input() milestone: Order.Milestone;
  @Input() participants: Order.Participant[];

  get status() {
    if (this.milestone.finished) {
      return {
        icon: 'checkmark-circle-outline',
        color: 'success'
      };
    }
    if (this.milestone.overdue) {
      return {
        icon: 'time-outline',
        color: 'danger'
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

  constructor() { }

  ngOnInit() { }

}
