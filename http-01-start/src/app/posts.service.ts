import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService{

  error = new Subject<string> ();

  constructor(
    private http: HttpClient
  ){

  }

  creatAndStorePost(title: string, content: string){
    const postData: Post = {title: title, post: content};
    this.http.post<{name: string}>('https://ng-complete-guide-fb696-default-rtdb.firebaseio.com/posts.json',
    postData)
    .subscribe(( rsp ) => {
      console.log(rsp)
    }, error => {
      this.error.next(error.message);
    })
  }

  fetchPosts() {
    let searchParams= new HttpParams()
    searchParams = searchParams.append('print', 'pretty')
    searchParams = searchParams.append('second', 'data')


    return this.http
    .get<{ [key: string]: Post }>('https://ng-complete-guide-fb696-default-rtdb.firebaseio.com/posts.json',
    {
      headers: new HttpHeaders({"Custom-Header": 'Hello'}),
      params: searchParams
    }
    )
    .pipe(map(( rsp ) => {
      const postArray: Post[] = [];
      for (const key in rsp) {
        if(rsp.hasOwnProperty(key)){
          postArray.push({...rsp[key], id: key});
        }
      }
      return postArray;
    }),
    catchError( errorRes => {
        // Send to analytics Server
        return throwError(errorRes);
      })
    );
  }

  deletePosts(){
    return this.http.delete('https://ng-complete-guide-fb696-default-rtdb.firebaseio.com/posts.json')

  }
}
