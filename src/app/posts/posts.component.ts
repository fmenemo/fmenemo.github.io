import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts = [
    {
      title: 'Welcome',
      postUrl: '/assets/posts/0.md'
    },
    {
      title: 'The importance of defining the project requirements properly',
      postUrl: '/assets/posts/1.md'
    },
    {
      title: 'Space Apps 2017 experience',
      postUrl: '/assets/posts/2.md'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
