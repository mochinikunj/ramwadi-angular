import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}

  saveContactUsForm(request: object): Observable<object> {
    const endPoint = `${environment.nodeUrl}/api/saveContactUsForm`;
    return this.http.post(endPoint, request);
  }
}
