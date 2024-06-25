import { Injectable } from '@angular/core';
import { Posts } from './posts.model';
import { map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  onCreatePost(postData: Posts) {
    // Send Http request and use merge map to update the list of pipes to newly added one
    return this.http.post<{name:string}>('https://angular-course-db-b6f6a-default-rtdb.firebaseio.com/posts.json'
      ,postData
    ).pipe(mergeMap(()=>this.fetchPosts()))
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts()
  }

  onClearPosts() {
    this.http.delete('https://angular-course-db-b6f6a-default-rtdb.firebaseio.com/posts.json').subscribe(()=> {
      console.log("deleted");
    }
    )
  }

  fetchPosts()
  {
   return this.http.get<{[key:string]:Posts}>(
      'https://angular-course-db-b6f6a-default-rtdb.firebaseio.com/posts.json'
    ).pipe(map(
      (responseData) =>{
       const responseArray=[]
       for(const key in responseData){
        if(responseData.hasOwnProperty(key)) {
          responseArray.push({...responseData[key],id:key})
        }
       }
       return responseArray
      }
    ))
  }
}
