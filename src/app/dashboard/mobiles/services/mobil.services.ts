import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MobileBD } from '../interfaces/mobileBD.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobilServices {

  private baseUrl:string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ){}

  
  public addMobile = (mobile:MobileBD):Observable<MobileBD> => {
    return this.http.post<MobileBD>(`${ this.baseUrl }/mobiles`, mobile);
  }

}
