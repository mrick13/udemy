import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <h1>Welcome to {{pokemon [1] }}!</h1>`,
})
export class AppComponent {
  pokemon = ['Bulbizarre','Salamèche','Carapuce'];
}
