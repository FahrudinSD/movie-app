import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  @Input() show: any;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.show)
  }

}
