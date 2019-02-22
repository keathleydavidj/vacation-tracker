import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export class Request {
  id: number;
  owner: String = '';
  status: String = '';
  startDate: Date = null;
  endDate: Date = null;

  constructor({ id, owner, status, startDate, endDate }) {
    this.id = id;
    this.owner = owner;
    this.status = status;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
  }
}

interface RequestPayload {
  requests: Request[];
}

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  API_URL = '/api/requests';

  constructor(private http: HttpClient) { }

  getRequests(): Observable<Request[]> {
    return this.http.get(`${this.API_URL}`)
      .pipe(
        map((data: RequestPayload) => data.requests.map(d => new Request(d)))
      );
  }

  deleteRequest(id: number): Observable<{}> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
