import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  message: string = 'Vous êtes déconnecté. (pikachu x 2)';
  name: string;
  password: string;
  auth: AuthService;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth = this.authService;
  }

  setMessage() {
    if (this.auth.isLoggedIn) {
      this.message = 'Vous êtes connecté'
    } else {
      this.message = 'Identifiant ou mot de passe incorrect'
    }
  }

  login() {
    this.message = 'Tentative de connexion en cours...';
    this.auth.login(this.name, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.setMessage();
        if (isLoggedIn) {
          this.router.navigate(['/pokemons']);
        } else {
          this.password = ''
          this.router.navigate(['/login']);
        }

      })
  }

  logout() {
    this.auth.logout();
    this.message = 'Vous êtes déconnecter'
  }
}

  // ngOnInit() {
  //   // Initialiser le formulaire
  //   var elems = document.querySelectorAll('select');
  //   var instances = M.FormSelect.init(elems)
  //   // Créer les propriétés du formulaire
  //   this.loginForm = this.formBuilder.group({
  //     email: [null, [Validators.required]],
  //     password: [null, [Validators.required, Validators.minLength(8)]],
  //   });
  // }
    
  
  // setMessage() {
  //   if(this.auth.isLoggedIn) {
  //     this.message = 'Vous êtes connecté'
  //   } else {
  //     this.message = 'Identifiant ou mot de passe incorrect'
  //   }
  // }

  // login() {
  //   this.message = 'Tentative de connexion en cours...';
  //   this.auth.login(this.name, this.password)
  //   .subscribe((isLoggedIn: boolean) => {
  //     this.setMessage();
  //     if(isLoggedIn) {
  //       this.router.navigate(['/pokemons']);
  //     } else {
  //       this.password = ''
  //       this.router.navigate(['/login']);
  //     }
      
  //   })
  // }

  // logout() {
  //   this.auth.logout();
  //   this.message = 'Vous êtes déconnecter'
  // }


