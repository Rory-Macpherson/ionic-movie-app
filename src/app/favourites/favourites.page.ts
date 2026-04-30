import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Favourites } from '../services/favourites';
import { DataService } from '../services/data';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, 
    FormsModule, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, 
    IonCardContent, RouterLink]
})
export class FavouritesPage {
  //adding an empty array i will fill up in the constructor by calling the init method!
  faves: any[] = [];


  //when this page starts it loads up the service page which is crutial for loading data from the 
  //date base. the persistant memory!!!!! also the addicons goes here which still kinda confuses me
  constructor(private fave: Favourites, private data: DataService, private router: Router) {
    addIcons({ homeOutline });
  }

  //added the method i was uing in constructor to this as
  //it reloads when i navigate back to the page so it does not show
  //movies i have removed from favourites. this was annoying
  //this is loading the get all method from the service favourties and then listing 
  //them in an array called faves. 
  async ionViewWillEnter() {
    this.faves = await this.fave.getAll();
  }

  //this is just a simple method that saves the movie id to the 
  //data service and then navigats to the movie details page. 
  //the sercive is important so that the movie detials page can 
  //grab the id and load the specific movie that was clicked on.
  async goToMovie(movie: any) {
    this.data.movieID = movie.id;
    this.router.navigate(['movie-details']);
  }


}
