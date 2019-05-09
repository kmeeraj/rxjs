import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {CourseComponent} from './course/course.component';

const routes: Routes = [{path: 'about', component: AboutComponent},
  {path: 'home', component: HomeComponent},
  {path: 'courses/:id', component: CourseComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
