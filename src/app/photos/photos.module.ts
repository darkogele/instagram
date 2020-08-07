import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';
import { PhotosListComponent } from '../photos/photos-list/photos-list.component';
import { EditPhotoComponent } from './dialogs/edit-photo/edit-photo.component';
import { UploadPhotoComponent } from './dialogs/upload-photo/upload-photo.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    PhotosListComponent,
    EditPhotoComponent,
    UploadPhotoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FileUploadModule
  ]
})
export class PhotosModule { }
