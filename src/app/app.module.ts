import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { MatInputModule } from '@angular/material/input';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AuthService } from './components/auth/auth.service';
import { environment } from 'src/environments/environment';
import { SigninComponent } from './components/auth/signin/signin.component';
import { MatSelectModule } from '@angular/material/select';
import { CreateComponent } from './components/create/create.component';
import { SwiperModule } from 'swiper/angular';
import { SearchComponent } from './components/search/search.component';
import { EditComponent } from './components/edit/edit.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GalleryComponent } from './components/gallery/gallery.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { ResultsComponent } from './components/results/results.component';
import { MyaddsComponent } from './components/myadds/myadds.component';
import { DetailsComponent } from './components/details/details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';


// Factory function required during AOT compilation
export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    ContainerComponent,
    SigninComponent,
    CreateComponent,
    SearchComponent,
    EditComponent,
    GalleryComponent,
    ResultsComponent,
    MyaddsComponent,
    DetailsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MatSelectModule,
    SwiperModule,
    MatCheckboxModule,
    NgxGalleryModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
