import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Request } from '../requests.service';
import { addOffset } from '../utils';

@Component({
  selector: 'app-request-list-item',
  templateUrl: './request-list-item.component.html',
  styleUrls: ['./request-list-item.component.css']
})
export class RequestListItemComponent implements OnInit {
  @Input() request: Request;
  @Input() deleteRequest: (id: number) => void;

  constructor() { }

  ngOnInit() {
  }

  get startDate() {
    return moment(addOffset(this.request.startDate)).format('MM-DD-YYYY');
  }

  get endDate() {
    return moment(addOffset(this.request.endDate)).format('MM-DD-YYYY');
  }

  removeRequest() {
    const { id } = this.request;
    return this.deleteRequest(id);
  }
}
