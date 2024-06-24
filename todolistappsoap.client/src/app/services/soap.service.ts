import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToDoItem } from '../models/todo-item.model';

@Injectable({
  providedIn: 'root'
})
export class SoapService {
  private apiUrl = 'https://localhost:32768/Service.svc';

  constructor(private http: HttpClient) { }

  private createSoapEnvelope(requestBody: string): string {
    return `<?xml version="1.0" encoding="utf-8"?>
            <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
              <soap:Body>
                ${requestBody}
              </soap:Body>
            </soap:Envelope>`;
  }

  private parseXmlResponse(response: string, responseTag: string): any {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response, "application/xml");
    const result = xmlDoc.getElementsByTagName(responseTag)[0];
    return result ? JSON.parse(result.textContent || '') : null;
  }

  getToDoItems(): Observable<ToDoItem[]> {
    const body = this.createSoapEnvelope(`<GetToDoItems xmlns="http://tempuri.org/" />`);
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://tempuri.org/IService/GetToDoItems'
    });

    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' })
      .pipe(
        map(response => this.parseXmlResponse(response, "GetToDoItemsResponse"))
      );
  }

  getToDoItem(id: number): Observable<ToDoItem> {
    const body = this.createSoapEnvelope(`<GetToDoItem xmlns="http://tempuri.org/"><id>${id}</id></GetToDoItem>`);
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://tempuri.org/IService/GetToDoItem'
    });

    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' })
      .pipe(
        map(response => this.parseXmlResponse(response, "GetToDoItemResponse"))
      );
  }

  addToDoItem(item: ToDoItem): Observable<any> {
    const body = this.createSoapEnvelope(`
      <AddToDoItem xmlns="http://tempuri.org/">
        <item>
          <Title>${item.title}</Title>
          <IsCompleted>${item.isCompleted}</IsCompleted>
          <UserId>${item.userId}</UserId>
        </item>
      </AddToDoItem>
    `);
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://tempuri.org/IService/AddToDoItem'
    });

    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' })
      .pipe(
        map(response => this.parseXmlResponse(response, "AddToDoItemResponse"))
      );
  }

  updateToDoItem(item: ToDoItem): Observable<any> {
    const body = this.createSoapEnvelope(`
      <UpdateToDoItem xmlns="http://tempuri.org/">
        <item>
          <Id>${item.id}</Id>
          <Title>${item.title}</Title>
          <IsCompleted>${item.isCompleted}</IsCompleted>
          <UserId>${item.userId}</UserId>
        </item>
      </UpdateToDoItem>
    `);
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://tempuri.org/IService/UpdateToDoItem'
    });

    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' })
      .pipe(
        map(response => this.parseXmlResponse(response, "UpdateToDoItemResponse"))
      );
  }

  deleteToDoItem(id: number): Observable<any> {
    const body = this.createSoapEnvelope(`<DeleteToDoItem xmlns="http://tempuri.org/"><id>${id}</id></DeleteToDoItem>`);
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://tempuri.org/IService/DeleteToDoItem'
    });

    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' })
      .pipe(
        map(response => this.parseXmlResponse(response, "DeleteToDoItemResponse"))
      );
  }
}
