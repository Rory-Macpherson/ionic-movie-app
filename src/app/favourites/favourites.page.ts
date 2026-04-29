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
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, RouterLink]
})
export class FavouritesPage {
  //adding an empty array i will fill up in the constructor by calling the init method!
  faves: any[] = [];

  constructor(private fave: Favourites, private data: DataService, private router: Router) {
    addIcons({ homeOutline });
  }

  //added the method i was uing in constructor to this as
  //it reloads when i navigate back to the page so it does not show
  //movies i have remobed from favourites 
  async ionViewWillEnter() {
    this.faves = await this.fave.getAll();
  }

  async goToMovie(movie: any) {
    this.data.movieID = movie.id;
    this.router.navigate(['movie-details']);
  }


}
