import { Component, OnInit, Input } from '@angular/core';
import { Request } from '../requests.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  @Input() requests: Request[];
  @Input() deleteRequest: (id: number) => void;

  constructor() { }

  ngOnInit() {
  }

}
