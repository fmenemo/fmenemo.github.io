import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  posts = [
    {
      title: 'Broker using RMI',
      image: '/assets/images/broker-rmi.png',
      postUrl: '/assets/projects/0.md'
    },
    {
      title: 'Web page made with Spring Framework',
      image: '/assets/images/PortadaSamper.jpg',
      postUrl: '/assets/projects/1.md'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
