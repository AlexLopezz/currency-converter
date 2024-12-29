import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Currency Converter',
        component: HomeComponent  
    },
    {
        path: '**',
        redirectTo: ''
    }
];
