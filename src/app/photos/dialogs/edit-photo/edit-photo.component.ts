import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhotoModel } from 'src/app/_models/photo';
import { ConfirmComponent, ConfirmModel } from 'src/app/_shared/confirm/confirm.component';
import { FileUploader, FileDropDirective, FileUploadModule } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.css']
})
export class EditPhotoComponent implements OnInit {
  modalData: PhotoModel = new PhotoModel();
  createNewFlag = false;
  selectedFile: ImageSnippet;
  uploader: FileUploader;
  baseUrl = environment.apiUrl;
  hasBaseDropZoneOver = false;

  constructor(public dialogRef: MatDialogRef<EditPhotoComponent>, @Inject(MAT_DIALOG_DATA) public data: PhotoModel,
    public dialog: MatDialog) {
    if (data) {
      this.modalData = data;
      this.createNewFlag = false;
    } else if (data === null) { this.createNewFlag = true; this.modalData.mode = 'Create Mode'; }
  }

  ngOnInit(): void {
    this.initialiseUploader();
  }

  initialiseUploader(data?: PhotoModel): void {
    this.uploader = new FileUploader({
      // headers: Headers['Content-Transfer-Encoding: Base64'],
      url: this.baseUrl + 'photos/',
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
      method: 'POST'
    });

    this.uploader.onAfterAddingFile = (file) => {
      file._prepareToUploading();
      file.withCredentials = false;
    };
    this.uploader.onSuccessItem = (item, Response, status, Headers) => {
      if (Response) {
        // this.closeDialog();
        console.log(Response);
      }
    };
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  async doAction(action: string): Promise<void> {
    if (action === undefined) { action = 'cancel'; }
    else if (action === 'delete') {
      // if (confirm('Are you sure to delete this photo')) { this.dialogRef.close({ action, data: this.modalData });}
      const result = await this.openDialog();
      if (result) {
        this.dialogRef.close({ action, data: this.modalData });
      }
    } else {
      this.dialogRef.close({ action, data: this.modalData });
    }
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  async openDialog(): Promise<boolean> {
    const confirmDeletePhoto = new ConfirmModel();
    confirmDeletePhoto.message = 'Are you sure you wanna delete this photo ?';
    confirmDeletePhoto.title = 'Delete Photo';

    const dialog = this.dialog.open(ConfirmComponent, { data: confirmDeletePhoto });

    return dialog.afterClosed().toPromise()
      .then(res => {
        return Promise.resolve(res);
      });
  }

}

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
