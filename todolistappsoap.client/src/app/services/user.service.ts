import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:32768/UserService.svc';

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

  getUsers(): Observable<User[]> {
    const body = this.createSoapEnvelope(`<GetUsers xmlns="http://tempuri.org/" />`);
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://tempuri.org/IUserService/GetUsers'
    });

    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' })
      .pipe(
        map(response => this.parseXmlResponse(response, "GetUsersResponse"))
      );
  }

  getUser(id: number): Observable<User> {
    const body = this.createSoapEnvelope(`<GetUser xmlns="http://tempuri.org/"><id>${id}</id></GetUser>`);
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://tempuri.org/IUserService/GetUser'
    });

    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' })
      .pipe(
        map(response => this.parseXmlResponse(response, "GetUserResponse"))
      );
  }

  addUser(user: User): Observable<any> {
    const body = this.createSoapEnvelope(`
      <AddUser xmlns="http://tempuri.org/">
        <user>
          <Name>${user.name}</Name>
        </user>
      </AddUser>
    `);
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://tempuri.org/IUserService/AddUser'
    });

    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' })
      .pipe(
        map(response => this.parseXmlResponse(response, "AddUserResponse"))
      );
  }

  updateUser(user: User): Observable<any> {
    const body = this.createSoapEnvelope(`
      <UpdateUser xmlns="http://tempuri.org/">
        <user>
          <Id>${user.id}</Id>
          <Name>${user.name}</Name>
        </user>
      </UpdateUser>
    `);
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://tempuri.org/IUserService/UpdateUser'
    });

    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' })
      .pipe(
        map(response => this.parseXmlResponse(response, "UpdateUserResponse"))
      );
  }

  deleteUser(id: number): Observable<any> {
    const body = this.createSoapEnvelope(`<DeleteUser xmlns="http://tempuri.org/"><id>${id}</id></DeleteUser>`);
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://tempuri.org/IUserService/DeleteUser'
    });

    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' })
      .pipe(
        map(response => this.parseXmlResponse(response, "DeleteUserResponse"))
      );
  }
}
