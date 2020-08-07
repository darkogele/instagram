import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhotoModel } from '../_models/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  baseUrl = environment.apiUrl;
  // valuesFromApi: PhotoModel[] = new Array<PhotoModel>();

  private valuesFromSource = new BehaviorSubject<PhotoModel[]>([]);
  valuesFromSource$ = this.valuesFromSource.asObservable();

  constructor(private http: HttpClient) { }

  updatePhotosInMemory(selectedPhotos: PhotoModel[]): void {
    this.valuesFromSource.next(selectedPhotos);
  }

  // we send request to get every photo here
  getEveryPhoto(): Observable<PhotoModel[]> {
    return this.http.get<PhotoModel[]>(this.baseUrl + 'photos');
  }

  // update photo
  updatePhoto(data: PhotoModel): Observable<any> {
    return this.http.put<PhotoModel>(this.baseUrl + 'photos/' + data.id, data);
  }

  // delete photo
  deletePhoto(data: PhotoModel): Observable<any> {
    return this.http.delete<PhotoModel>(this.baseUrl + 'photos/' + data.id);
  }

  // Storage Local Idea
  // cashPhotosFromService(): void {
  //   this.getEveryPhoto().subscribe(res => {
  //     this.valuesFromApi = res;
  //   });
  // }

}
