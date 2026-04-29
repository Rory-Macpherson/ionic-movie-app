import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon
} from '@ionic/angular/standalone';
import { DataService } from '../services/data';
import { MovieService } from '../services/movie.service';
import { Router, RouterLink } from '@angular/router';
import { Favourites } from '../services/favourites';
import { addIcons } from 'ionicons';
import { homeOutline, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard,
    IonCardHeader, IonCardTitle, IonCardSubtitle, CommonModule, FormsModule, IonIcon, RouterLink]
})

//i am using some class level fields to store data
//also added childview. this is a decorator that lets me grab an element from 
//my html and control it with code. i use it to grab
//ioncontent and scrol to top on page load!
//added a boolean which i will use in the html to see if
//  the movie is a fave or not. pretty happpy with this
export class MovieDetailsPage {
  @ViewChild(IonContent) content!: IonContent;
  movie: any = {};
  cast: any[] = [];
  crew: any[] = [];
  movieID: number = 0;
  memberID: number = 0;
  isFave: boolean = false;

  //my constructor gets this movie id from my data service first. this is imortant as its needed
  //before anything else can work. so it needs to have the services first thing and the router
  constructor(private data: DataService,
    private ms: MovieService, private router: Router, private fave: Favourites) {
    addIcons({ homeOutline, heartOutline });
  }

  //this method does two things at the moment.
  //well two mains ones. it calls a method to just get the movies name
  //so we can store it and show it on the html
  // it also calls the credits method and then stores
  //the cast in the cast array and the crew in the crew array.
  //it gets the crew and cast items from the credits
  //ionviewwillenter runs every time the page becomes active, not just the first time
  //**** added scroll to the top because it was staying down the page when i nagivated back to it
  //also moved it to the end of the will enter so it does not scroll up on the wrong data!
  async ionViewWillEnter() {
    this.movieID = this.data.movieID;
    this.movie = await this.ms.getMovie(this.movieID);
    const credits = await this.ms.getMovieCredits(this.movieID);
    this.cast = credits.cast;
    this.crew = credits.crew;
    this.isFave = await this.fave.check(this.movieID.toString());
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


  //two methods linked to the faveorites button to add or remove
  //from favourites 
// added this.isFave = true; so that the button will change when i push it. 
  AddToFaves(){
this.fave.set(this.movieID.toString(), this.movie)
this.isFave = true;
  }
  RemoveFromFaves(){
this.fave.remove(this.movieID.toString())
this.isFave = false;
  }


}
