import { Component, Inject } from '@angular/core';
import { AppConfig } from './app.config';
import { LOCALE_ID } from '@angular/core';
declare var moment: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private config: AppConfig,
    @Inject(LOCALE_ID) locale: string) {
      //console.log(locale);
      // note that AppConfig is injected into a private property of AnyClass
      
  }

  title = 'app works!';
  lang: string = 'it'; //default

  changeLang(lang:string){
    
    this.lang = lang;

  }

  rightPath(text:string){
    return false;
  }

}
