import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  @Output()
  modalConfirmation : EventEmitter<boolean> = new EventEmitter<boolean>;

  OnConfirm() : void {
    this.modalConfirmation.emit(true);
  }

  OnCancel() : void {
    this.modalConfirmation.emit(false);
  }
}
