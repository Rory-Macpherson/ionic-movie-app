import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heartOutline, homeOutline } from 'ionicons/icons';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
IonLabel, IonSegment, IonSegmentButton
 } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { DataService } from '../services/data';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [FormsModule, NgFor, NgIf, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, 
    IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonIcon, RouterLink,
  IonLabel, IonSegment, IonSegmentButton],
})

//export is needed so this class can be exported
//there are some class fields that i use in my html and methods
export class HomePage {
  studentId = 'G00353258';
  movieID = 0;
  movies: any[] = [];
  People: any[] = [];
  searchQuery: string = '';
  title: string = "";
  //adding the selected segment for the new buttons i added in. 
  //so i am linking the ngmodel which sends updates this tab 
  //when ever a button is pressed
  tab: string = '';



  //this is a method that is linked to  my click on the button and on the search 
  //bar when enter is clicked
  //it also has an if statement that loads trending movies if its clicked with an empty field
  //so this is licked to movie service and calls a method from movie service when
  //this method is called. ms == movie service. 
  //i am making a new method to return people so the people search can work!
  async Search() {
    if (this.searchQuery.trim() === "") {
    if (this.tab === 'People') {
      this.People = await this.ms.getTrendingPeople();
      this.title = "Todays Trending People";
    } else {
      this.movies = await this.ms.getTrending();
      this.title = "Todays Trending Movies";
    }
  }
    else if (this.tab === 'Movies'){
      this.movies = await this.ms.searchMovies(this.searchQuery);
      this.title = this.searchQuery + " Movies";
      }
    else{
 this.People = await this.ms.searchPeople(this.searchQuery);
      this.title = this.searchQuery + " People";
    }
    
  }


  //this method is like an overridden method, because its called regardless i just make it do one of my methods from the
  //movie service page when it runs. it runs first thing.
  //i changed this to ngOnInit as it was on ionViewWillEnter but that reloaded
  //everytime you went back to the page not just the first enter
  async ngOnInit() {
    this.movies = await this.ms.getTrending();
    this.People = await this.ms.getTrendingPeople()
    this.title = "Todays Trending Movies";
    this.tab = "Movies"
  }

  async goToMovie(movie:any){
    this.data.movieID = movie.id;
    this.router.navigate(['movie-details']);
  }

//new method for the new search query
  async goToPerson(person:any){
    this.data.memberID = person.id;
    this.router.navigate(['details']);
  }


  //I needed to add the addIcons to the constructor so it would register the icon first
  constructor(private ms: MovieService, private data: DataService, private router: Router) {
    addIcons({ heartOutline, homeOutline });
  }

  //i had to add this method to get the title to change
  //basically when the tab is changed then this method is called and changes the 
  //title to trending people
 async onTabChange(event: any) {
    this.searchQuery = '';
    if (this.tab === 'People') {
      this.title = "Todays Trending People";
    } else {
      this.title = "Todays Trending Movies";
    }
  }

}
