import { Component, ElementRef, OnInit } from '@angular/core';
import { PhotosService } from '../../_services/photos.service';
import { PhotoModel } from '../../_models/photo';
import { EditPhotoComponent } from '../dialogs/edit-photo/edit-photo.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.css']
})
export class PhotosListComponent implements OnInit {
  loadPhotosFlag = false;
  photoDataFromApi: PhotoModel[] = new Array<PhotoModel>();
  photoData: PhotoModel[];
  title = 'MCA Instagram';
  response: any;

  // @ViewChild("fileInput", {static: false}) fileInput: ElementRef;
  files = [];
  constructor(private photosService: PhotosService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // if (this.photosService.valuesFromApi.length === 0) {
    //   this.loadPhotos();
    // } else if (this.photoDataFromApi.length === 0) {
    //   this.photoDataFromApi = [...this.photosService.valuesFromApi];
    // }
    this.photosService.valuesFromSource$.subscribe(
      currentPhotos => {
        if (currentPhotos.length === 0) {
          this.loadPhotos();
        } else {
          this.photoDataFromApi = [...currentPhotos];
        }
      }
    );
  }

  loadPhotos(): void {
    this.photosService.getEveryPhoto().subscribe(res => {
      // this.photoDataFromApi = res;
      this.photosService.updatePhotosInMemory(res);
      // this.photosService.valuesFromApi = [...this.photoDataFromApi];
      if (this.photoDataFromApi.length > 0) {
        this.loadPhotosFlag = true;
        // this.photoData = Object.assign({}, this.photoDataFromApi);
      }
    }, error => {
      this.loadPhotosFlag = false;
      console.log(error.error);
    });
  }

  openDialog(data: PhotoModel): void {
    let width: any;
    let height: any;
    let dataForDialog;
    if (data === null) {
      dataForDialog = null;
      width = '600px';
      height = 'auto';
    } else {
      data.mode = 'Edit Mode';
      dataForDialog = { ...data };
      height = 'auto';
      width = 'auto';
    }

    const dialog = this.dialog.open(EditPhotoComponent, {
      data: dataForDialog,
      height,
      width

    });

    dialog.afterClosed().subscribe(
      res => {
        if (res) {
          if (res.action === 'update') {
            this.editPhoto(res.data);
          } else if (res.action === 'delete') {
            this.deletePhoto(res.data);
          }
        }
      }
    );
  }

  deletePhoto(data: PhotoModel): void {

    this.photosService.deletePhoto(data).subscribe(res => {
      this.response = res;
      const index = this.photoDataFromApi.findIndex(element => element.id === data.id);

      if (index !== -1) {
        this.photoDataFromApi.splice(index, 1);
        //  this.photoDataFromApi = [...this.photoDataFromApi];
        // this.photosService.valuesFromApi = [...this.photoDataFromApi];

        this.photosService.updatePhotosInMemory(this.photoDataFromApi);
      }
    }, error => {
      console.log(error.error);
    });
  }

  editPhoto(data: PhotoModel): void {
    this.photosService.updatePhoto(data).subscribe(res => {

      this.response = res;
      const index = this.photoDataFromApi.findIndex(element => element.id === this.response.id);
      // this.photoData[elementsIndex].albumId = this.response.albumId;
      this.photoDataFromApi[index].title = this.response.title;
      this.photoDataFromApi[index].thumbnailUrl = this.response.thumbnailUrl;
      this.photoDataFromApi[index].url = this.response.url;

      this.photosService.updatePhotosInMemory(this.photoDataFromApi);
      // const newArray = [...this.photoData];
      // newArray[elementsIndex] = { ...newArray[elementsIndex].title = this.response.title };
    }, error => {
      console.log(error.error);
    });
  }
}


