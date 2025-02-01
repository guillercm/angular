import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDividerModule} from '@angular/material/divider';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { OptionsButtomSheetComponent } from './ui/options-buttom-sheet/options-buttom-sheet.component';

@Component({
  selector: 'app-material',
  imports: [CommonModule, MatSlideToggleModule, MatIconModule, MatButtonModule, MatBadgeModule, MatDividerModule, MatBottomSheetModule],
  templateUrl: './material.component.html',
  styleUrl: './material.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class MaterialComponent {

  private _bottomSheet = inject(MatBottomSheet);

  openBottomSheet(): void {
    this._bottomSheet.open(OptionsButtomSheetComponent);
  }
}
