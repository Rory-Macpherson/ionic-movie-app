import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';

//this is a service. a service is a reusable piece of code
//it has a root injectable which means all pages or classes use the same object or iteration of this class
//like static in java

@Injectable({
  providedIn: 'root'
})

//ok so export is what it sounds like, i need to export this class so you can use it
//then its just a class name. called movieservice.
export class MovieService {
//these are two private properties, just saves me typing them out again and again
//just save them to shorter names. easy.
// private means only available inside the class
  private apiKey = 'a8bed647d67dd782282a3ede4162d19a';
  private baseUrl = 'https://api.themoviedb.org/3';

  //async means that it will work in the background so my app won't freeze

  //this is the only method that does not need any data from the user or db to work
  //it just loads the trending movies from the db
  //these urls are from the brief and we use data because that is what we are interested in.
  async getTrending() {
    const options: HttpOptions = { url: "https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.apiKey };
    return (await CapacitorHttp.get(options)).data.results;
  }

  //the rest of these methods, they need some info to work, so either it's a string that the user
  //enters into a search bar or it's a number that is taken from the db that
  //the user should never actually have to see!
  //i have the full url method all in this service, i don't pass them anything. all is hardcoded and
  //kept in this one file for easy reading. so instead of having one generic method that returns all the data
  //i have lots of methods that return exactly what i want. i found it harder to make this file but
  //easier to work with on the long run.
  //the method calls are much easier in my eyes

  //i did not add results at the end of these and it took me a long time to figure out!

  //this one returns movies based on the word that the user searched for
  async searchMovies(query: string) {
    const options: HttpOptions = { url: `${this.baseUrl}/search/movie?query=${query}&api_key=${this.apiKey}` };
    const response = await CapacitorHttp.get(options);
    return response.data.results;
  }

  //this returns a single movie, i use this just to get the movie name
  //maybe i am wrong but i dont think its on the cast page which is annoying!
  async getMovie(id: number) {
    const options: HttpOptions = { url: `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}` };
    return (await CapacitorHttp.get(options)).data;
  }

//this one returns the movie credits, the cast and the crew
  async getMovieCredits(id: number) {
    const options: HttpOptions = { url: `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}` };
    return (await CapacitorHttp.get(options)).data;
  }


  //this one returns the persons details
  //so it needs to be passed in an id, the rest is already hardcoded into the page
  async getMember(id: number) {
    const options: HttpOptions = { url: `${this.baseUrl}/person/${id}?api_key=${this.apiKey}` };
    return (await CapacitorHttp.get(options)).data;
  }


  //this one returns movie credits from each member. so its the same id i used for the one above but a different url
  //yes it took me a long time to figure this out!
  async getMemberMovieCredits(id: number) {
    const options: HttpOptions = { url: `${this.baseUrl}/person/${id}/movie_credits?api_key=${this.apiKey}` };
    return (await CapacitorHttp.get(options)).data;
  }
}
