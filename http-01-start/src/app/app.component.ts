import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.http.post<{name: string}>('https://ng-complete-guide-fb696-default-rtdb.firebaseio.com/posts.json',
    postData)
    .subscribe(( rsp ) => {
      console.log(rsp)
    })
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();

  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts (){
    this.isFetching = true;

    this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-fb696-default-rtdb.firebaseio.com/posts.json')
    .pipe(map(( rsp ) => {
      const postArray: Post[] = [];
      for (const key in rsp) {
        if(rsp.hasOwnProperty(key)){
          postArray.push({...rsp[key], id: key});
        }
      }
      return postArray;
    }))
    .subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts
    })
  }
}
