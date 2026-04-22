import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { MovieDetailsPage } from './movie-details/movie-details.page';
import { DetailsPage } from './details/details.page';
import { FavouritesPage } from './favourites/favourites.page';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'movie-details',
    component: MovieDetailsPage,
  },
  {
    path: 'details',
    component: DetailsPage,
  },
  {
    path: 'favourites',
    component: FavouritesPage,
  },
];