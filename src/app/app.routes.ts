import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
];
