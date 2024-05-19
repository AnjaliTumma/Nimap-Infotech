import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { JobsComponent } from './jobs/jobs.component';
import { ClientsComponent } from './clients/clients.component';
import { EmployeeComponent } from './employee/employee.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorComponent } from './error/error.component';
import { UserComponent } from './user/user.component';


export const routes: Routes = [
    {path:'home', component:HomeComponent},
    {path:'about', component:AboutComponent},
    {path:'job', component:JobsComponent},
    {path:'client', component:ClientsComponent},
    {path:'contact', component:ContactComponent},
    {path:'employee', component:EmployeeComponent},
    {path:'user', component:UserComponent},
    {path:'', component:HomeComponent},
    {path:'error', component:ErrorComponent},
    {path:'**', component:ErrorComponent}
];
