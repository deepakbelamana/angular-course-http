import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Posts } from './posts.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts : Posts[] = [];
  isLoading=false;
  constructor(private postService : PostsService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Posts) {
    // Send Http request
   this.postService.onCreatePost(postData).subscribe(
    (posts) => this.loadedPosts=posts
   )
  
  }

  onFetchPosts() {
    // Send Http request
    this.isLoading=true;
    this.postService.fetchPosts().subscribe((responseData)=>{
      this.isLoading=false;
      this.loadedPosts=responseData;
    })
  }

  onClearPosts() {
   this.postService.onClearPosts()
  }

}
