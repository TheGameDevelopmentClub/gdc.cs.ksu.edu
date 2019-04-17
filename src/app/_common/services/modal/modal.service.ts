import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { ModalUserUpdateComponent } from '../../components/modal-user-update/modal-user-update.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService
  ) { }

  public verifyUserInfo(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const authUser = this.authService.authenticatedUser;
      if (!authUser.hasVerifiedInfo) {
        this.userService.getById(authUser.userId).then((user) => {
          this.dialog.open(ModalUserUpdateComponent, {
            disableClose: true,
            data: user
          });
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
}
