import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { ContainerComponent } from './components/container/container.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { AuthGuard } from "./shared/guard/auth.guard";
// import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    },
    {
        path: 'home',
        component: ContainerComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'signin',
        component: SigninComponent
    },
    {
        path: 'create',
        component: CreateComponent
    },
    {
        path: 'edit/:id',
        component: EditComponent
    },
    // {
    //     path: '**',
    //     component: NotFoundComponent
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
