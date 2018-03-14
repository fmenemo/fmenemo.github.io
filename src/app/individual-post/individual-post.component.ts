import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsComponent } from '../posts/posts.component';

@Component({
  selector: 'app-individual-post',
  templateUrl: './individual-post.component.html',
  styleUrls: ['./individual-post.component.css']
})
export class IndividualPostComponent implements OnInit {

  posts = [
    {
      title: 'Space Apps 2017 experience',
      date: 'May 4th, 2017',
      postUrl: '/assets/posts/2.md'
    },
    {
      title: 'The importance of defining the project requirements properly',
      date: 'July 27th, 2016',
      postUrl: '/assets/posts/1.md'
    },
    {
      title: 'Welcome',
      date: 'June 27th, 2016',
      postUrl: '/assets/posts/0.md'
    }
  ]

  post;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.post = this.posts[id];
  }

}
