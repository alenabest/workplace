import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'avatar-editor',
  templateUrl: './avatar-editor-dialog.component.html',
  styleUrls: ['./avatar-editor-dialog.component.scss']
})
export class AvatarEditorDialogComponent {
  uploadedAvatar: Blob;

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<AvatarEditorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public imageChangedEvent: Event) {
  }

  imageCropped(event: ImageCroppedEvent) {
    this.uploadedAvatar = event.file;
  }
}
