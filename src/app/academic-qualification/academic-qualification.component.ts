import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-academic-qualification',
  templateUrl: './academic-qualification.component.html',
  styleUrls: ['./academic-qualification.component.css']
})
export class AcademicQualificationComponent implements OnInit {

  dates = [
    new Date('09/01/2012'),
    new Date('12/01/2014'),
    new Date('07/06/2017'),
    new Date('07/17/2017'),
    new Date('11/17/2017')
  ];

  constructor() { }

  ngOnInit() {
  }

}
