import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IData, IResult} from '../core/models/result';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getResults(): Observable<IData[]> {
    return this.http.get<IResult>(environment.apiUrl).pipe(
      map((item) => {
        return [...item.results];
      }),
    );
  }

  saveType(type: string): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/saveType`, type);
  }
}
