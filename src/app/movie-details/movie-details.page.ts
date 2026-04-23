import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { DataService } from '../services/data';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, 
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, CommonModule, FormsModule]
})

//i am using some class level fields to store data
//also added childview. this is a decorator that lets me grab an element from 
//my html and control it with code. i use it to grab
//ioncontent and scrol to top on page load!
export class MovieDetailsPage {
  @ViewChild(IonContent) content!: IonContent;
  movie: any = {};
  cast: any[] = [];
  crew: any[] = [];
  movieID: number = 0;
  memberID: number = 0;

  //my constructor gets this movie id from my data service first. this is imortant as its needed
  //before anything else can work. so it needs to have the services first thing and the router
  constructor(private data: DataService, private ms: MovieService, private router: Router) {}

  //this method does two things at the moment.
  //well two mains ones. it calls a method to just get the movies name
  //so we can store it and show it on the html
  // it also calls the credits method and then stores
  //the cast in the cast array and the crew in the crew array.
  //it gets the crew and cast items from the credits
  //ionviewwillenter runs every time the page becomes active, not just the first time
  //**** added scroll to the top because it was staying down the page for some reason.
  async ionViewWillEnter() {
    this.movieID = this.data.movieID;
    this.movie = await this.ms.getMovie(this.movieID);
    const credits = await this.ms.getMovieCredits(this.movieID);
    this.cast = credits.cast;
    this.crew = credits.crew;
    this.content.scrollToTop(0);
  }


  //ok this is activated on clicka and it does two things. it saves the member id to the 
  //date service, which i am not sure i need as it should still be saved but 
  //i wanted to overwrite it just incase
  //and it also directs the user sorry. routes the user to the 
  //details page.
  //note- i had it saving to data.movieid not data.memberid. wow that was annoying
  async goToMember(member: any){
    this.data.memberID = member.id;
    this.router.navigate(['details']);
  }

}
