import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { DataService } from '../services/data';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, 
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, CommonModule, FormsModule]
})

//i am using some class level fields to store data
export class MovieDetailsPage implements OnInit {
  movie: any = {};
  cast: any[] = [];
  crew: any[] = [];
  movieID: number = 0;

  //my constructor gets this movie id from my data service first. this is imortant as its needed
  //before anything else can work
  constructor(private data: DataService, private ms: MovieService) {
    this.movieID = this.data.movieID;
  }

  //this method does two things at the moment. 
  //well two mains ones. it calls a method to just get the movies name
  //so we can store it and show it on the html
  // it also calls the credits method and then stores
  //the cast in the cast array and the crew in the crew array.
  async ngOnInit() {
    this.movie = await this.ms.getMovie(this.movieID);
    const credits = await this.ms.getMovieCredits(this.movieID);
    this.cast = credits.cast;
    this.crew = credits.crew;
  }

}
