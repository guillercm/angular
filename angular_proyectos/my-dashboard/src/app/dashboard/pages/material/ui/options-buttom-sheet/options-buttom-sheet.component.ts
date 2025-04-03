import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-options-buttom-sheet',
  imports: [CommonModule, MatListModule],
  templateUrl: './options-buttom-sheet.component.html',
  styleUrl: './options-buttom-sheet.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsButtomSheetComponent {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<OptionsButtomSheetComponent>>(MatBottomSheetRef);

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
