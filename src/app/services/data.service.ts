import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  
  constructor(private http: HttpClient) { }

  data(): Observable<any> {
    const url = environment.baseUrl + "/data";

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://commonservices.onrender.com',
      'Accept': 'application/json'
    });

    return this.http.get<any>(url, { headers });
  }

  update(req: any) {
    const url = environment.baseUrl + '/update';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://commonservices.onrender.com',
      'Accept': 'application/json'
    });
    
    let requestBody: any = {
      "filter": req.filter,
      "update": req.update
    }
    
    return this.http.post<any>(url, requestBody, { headers });
  }

  insert(requestBody: any): Observable<any> {
    const url = environment.baseUrl + '/insert';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://commonservices.onrender.com',
      'Accept': 'application/json'
    });

    return this.http.post<any>(url, requestBody, { headers });
  }

}
