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
    const url = environment.baseUrlV2 + '/action/find';
    
    let requestBody: any = {
      "collection": environment.collection,
      "database": environment.database,
      "dataSource": environment.dataSource,
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://common-services-26irurkwt-andrews-projects-22fa37f5.vercel.app/mileageCalc/data',
      'api-key': environment.apiKey,
      'Accept': 'application/json'
    });

    return this.http.post<any>(url, requestBody, { headers });
  }

  update(req: any) {
    const url = environment.baseUrl + '/action/updateOne';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://us-east-1.aws.data.mongodb-api.com',
      'api-key': environment.apiKey,
      'Accept': 'application/json'
    });
    
    let requestBody: any = {
      "collection": environment.collection,
      "database": environment.database,
      "dataSource": environment.dataSource,
      "filter": req.filter,
      "update": req.update
    }
    
    return this.http.post<any>(url, requestBody, { headers });
  }

  insert(document: any): Observable<any> {
    const url = environment.baseUrl + '/action/insertOne';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://us-east-1.aws.data.mongodb-api.com',
      'api-key': environment.apiKey,
      'Accept': 'application/json'
    });
    
    let requestBody: any = {
      "collection": environment.collection,
      "database": environment.database,
      "dataSource": environment.dataSource,
      "document": document
    }

    return this.http.post<any>(url, requestBody, { headers });
  }

}
