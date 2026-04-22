import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { starOutline } from 'ionicons/icons';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { DataService } from '../services/data';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [FormsModule, NgFor, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, 
    IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonIcon, RouterLink],
})

//export is needed so this class can be exported
//there are some class fields that i use in my html and methods
export class HomePage {
  studentId = 'G00353258';
  movieID = 0;
  movies: any[] = [];
  searchQuery: string = '';



  //this is a method that is linked to  my click on the button and on the search 
  //bar when enter is clicked
  //it also has an if statement that loads trending movies if its clicked with an empty field
  //i added that after i panicked for ages.
  async Search() {
    if (this.searchQuery.trim() === "") {
      this.movies = await this.ms.getTrending();
    }
    else {
      this.movies = await this.ms.searchMovies(this.searchQuery);
    }
  }


  //this method is like an overridden method, because its called regardless i just make it do one of my methods from the
  //movie service page when it runs. it runs first thing.
  //i changed this to ngOnInit as it was on ionViewWillEnter but that reloaded
  //everytime you went back to the page not just the first enter
  async ngOnInit() {
    this.movies = await this.ms.getTrending();
  }

  async goToMovie(movie:any){
    this.data.movieID = movie.id;
    this.router.navigate(['movie-details']);
  }


  //I needed to add the addIcons to the constructor so it would register the icon first
  constructor(private ms: MovieService, private data: DataService, private router: Router) {
    addIcons({ starOutline });
  }
}
