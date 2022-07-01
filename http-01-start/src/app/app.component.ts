import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model'
import { PostService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  isFetching = false;

  constructor(private http: HttpClient,
    private postService: PostService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postService.fetchPosts()
    .subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });

  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.postService.creatAndStorePost(postData.title, postData.post)


  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPosts()
    .subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });

  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts()
    .subscribe(() => {
      this.loadedPosts = [];
    })
  }

}
