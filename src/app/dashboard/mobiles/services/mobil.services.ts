import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MobileBD } from '../interfaces/mobileBD.interface';
import { Observable } from 'rxjs';
import { ResponseMobileBD } from '../interfaces/responsemobile.interface';


@Injectable({
  providedIn: 'root',
})
export class MobilServices {

  private baseUrl:string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ){}


  public getMobile = (limit:number,offset:number, search: string = ''):Observable<ResponseMobileBD> => {
    return this.http.get<ResponseMobileBD>(`${this.baseUrl}/mobiles?limit=${limit}&offset=${offset}&search=${search}`)
  }

  public addMobile = (mobile:MobileBD):Observable<MobileBD> => {
    return this.http.post<MobileBD>(`${ this.baseUrl }/mobiles`, mobile);
  }


  public deleteMobile = (id:string):Observable<MobileBD> => {
    return this.http.delete<MobileBD>(`${this.baseUrl}/mobiles/${id}`)
  }


}
