import { Component, OnInit, Input } from '@angular/core';

import { Officer } from 'src/app/_common/models/officer';

@Component({
  selector: 'ksu-gdc-officer-badge',
  templateUrl: './officer-badge.component.html',
  styleUrls: ['./officer-badge.component.scss']
})
export class OfficerBadgeComponent implements OnInit {
  @Input() position: string;
  @Input() officer: Officer;

  constructor(
  ) { }

  ngOnInit() {
  }
}
