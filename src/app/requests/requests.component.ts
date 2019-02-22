import { Component, OnInit } from '@angular/core';
import { RequestsService, Request } from '../requests.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  public requests: Request[] = [];

  constructor(private requestsService: RequestsService) { }

  ngOnInit() {
    this.requestsService.getRequests().subscribe(data => this.requests = data);
  }

  deleteRequest = id => {
    const newList = this.requests.filter(req => req.id !== id);
    this.requestsService.deleteRequest(id).subscribe();
    this.requests = newList;
  }
}
