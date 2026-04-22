import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { starOutline } from 'ionicons/icons';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [NgFor, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonIcon, RouterLink],
})
export class HomePage {
  studentId = 'G00353258';
  movies: any[] = [];
  searchQuery: string = '';

async ionViewWillEnter() {
        this.movies = await this.ms.getTrending();
    }


  //I needed to add the addIcons to the constructor so it would register the icon first
  constructor(private ms:MovieService) {
    addIcons({ starOutline });
  }
}
