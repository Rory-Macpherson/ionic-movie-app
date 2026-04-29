import { Component, ViewChild } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonList, IonItem, IonLabel, IonThumbnail, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline, heartOutline } from 'ionicons/icons';

//importing both the services i need.
import { DataService } from '../services/data';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  standalone: true,
  //if you are importing things for your html then they go in this array
  imports: [IonButton, IonIcon, IonList, IonItem, IonLabel, IonThumbnail, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, NgIf, CommonModule, FormsModule, RouterLink]
})
export class DetailsPage {
  @ViewChild(IonContent) content!: IonContent;
  member: any = {};
  memberID: number = 0;
  castMovies: any[] = [];
  crewMovies: any[] = [];

  //if you are importing things to be used in your ts file. they go here in the constructor
  //first thiing we do is get the member id from the data service
  //changed that to on ionview as it was not updating because the constructor did not run
  //more than once
  constructor(private data: DataService, private ms: MovieService, private router: Router) {
    addIcons({ homeOutline, heartOutline });
  }

  //ionviewwillenter runs every time the page becomes active, not just the first time
  
  async ionViewWillEnter() {
    this.memberID = this.data.memberID;
    this.member = await this.ms.getMember(this.memberID);
    const credits = await this.ms.getMemberMovieCredits(this.memberID);
    this.castMovies = credits.cast;
    this.crewMovies = credits.crew;
    this.content.scrollToTop(0);
  }


  //this method stores movieid in the data service and then navigates to the 
  //movie details page and then that page loads the movie id from the data service
  async goToMovie(movie: any){
    this.data.movieID = movie.id;
    this.router.navigate(['movie-details']);

  }

}
