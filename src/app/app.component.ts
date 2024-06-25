import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Posts } from './posts.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts : Posts[] = [];
  isLoading=false;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts()
  }

  onCreatePost(postData: Posts) {
    // Send Http request
    this.http.post<{name:string}>('https://angular-course-db-b6f6a-default-rtdb.firebaseio.com/posts.json'
      ,postData
    ).subscribe(
      responseData => console.log(responseData)
    )
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts()
  }

  onClearPosts() {
    // Send Http request
  }

  fetchPosts()
  {
    this.isLoading=true;
    this.http.get<{[key:string]:Posts}>(
      'https://angular-course-db-b6f6a-default-rtdb.firebaseio.com/posts.json'
    ).pipe(map(
      responseData =>{
       const responseArray=[]
       for(const key in responseData){
        if(responseData.hasOwnProperty(key)) {
          responseArray.push({...responseData[key],id:key})
        }
       }
       return responseArray
      }
    ))
    .subscribe(
      (responseData)=>{
        this.isLoading=false;
        this.loadedPosts=responseData;
        console.log(this.loadedPosts)
      }
    )
  }
}
