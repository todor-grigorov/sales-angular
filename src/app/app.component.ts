import { Component, SimpleChanges } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './components/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
// import { AuthService } from './components/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sales-angular';
  isLoggedIn = false;
  displayName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '').displayName : '';

  private sub = this.router.events
    .subscribe(
      event => {
        if (location.pathname === "/" || location.pathname === "/home") {
          this.isLoggedIn = this.authService.isLoggedIn;
          this.displayName = this.authService.userData.displayName;
          // this.displayName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).displayName : '';
        }
      }
    );

  constructor(private router: Router, public authService: AuthService, public translate: TranslateService) {
    this.isLoggedIn = this.loggedIn();

    // Register translation languages
    translate.addLangs(['en', 'bg']);
    // Set default language
    translate.setDefaultLang('en');
  }

  translateLanguageTo(lang: string) {
    this.translate.use(lang);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isLoggedIn = this.loggedIn();
  }

  onSignOut = () => {
    this.authService.SignOut();
    this.isLoggedIn = false;
    this.displayName = '';
  }

  loggedIn(): boolean {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : '';
    return (user !== null && user.email) ? true : false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
