import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-individual-project',
  templateUrl: './individual-project.component.html',
  styleUrls: ['./individual-project.component.css']
})
export class IndividualProjectComponent implements OnInit {

  posts = [
    {
      title: 'Web page made with Spring Framework',
      date: 'July 27th, 2016',
      postUrl: '/assets/projects/1.md'
    },
    {
      title: 'Broker using RMI',
      date: 'June 27th, 2016',
      postUrl: '/assets/projects/0.md'
    }
  ]

  post;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.post = this.posts[id];
  }

}
