import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilsService {

  constructor(private snackbar: MatSnackBar) { }

  // Common method to display snackbar
  showSnackBar(message: string, config?: MatSnackBarConfig): void {
    this.snackbar.open(message, "",
        {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        }
      )
  }
}
