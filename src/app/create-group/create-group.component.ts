import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { GroupService } from 'src/app/_common/services/group/group.service';
import { Group } from 'src/app/_common/models/group';

@Component({
  selector: 'ksu-gdc-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  group = new Group({});

  constructor(
    private dialogRef: MatDialogRef<CreateGroupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private groupService: GroupService
  ) { }

  ngOnInit() {
  }

  createGroup() {
    console.log(this.group);
    // this.groupService.create(this.group)
    //   .then(() => {
    //     this.dialogRef.close(true);
    //   })
    //   .catch(error => {

    //   });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
