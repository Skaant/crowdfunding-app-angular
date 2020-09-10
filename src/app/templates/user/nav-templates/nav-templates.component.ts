import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { apiHttpSpringBootService } from './../../../api-spring-boot.service';
import {UserModel, MessageInterneModel} from './../../../interfaces/models';

declare var navigator: any;

@Component({
  selector: 'app-nav-user-templates',
  templateUrl: './nav-templates.component.html',
  styleUrls: ['./nav-templates.component.css']
})
export class NavTemplatesUserComponent implements OnInit {

  public infosUser: UserModel = new UserModel();

  public urlImageProfil: string;

  public tagSearchGlobal = '';

  public userLang: any;

  public users: Array<MessageInterneModel> = [];

  public nbrMessagesNonLus = 0;

  public listMessagesRecus: Array<MessageInterneModel> = [];


  constructor(private router: Router, private cookie: CookieService, public translate: TranslateService,
              private apiService: apiHttpSpringBootService) {

    translate.addLangs(['en', 'fr', 'es']);

    if (this.cookie.get('lang_translat_user')) {

      const langTranslat = this.cookie.get('lang_translat_user');

      translate.setDefaultLang(langTranslat);

    } else {

      this.userLang = navigator.language || navigator.userLanguage;

      translate.setDefaultLang(this.userLang);
    }



    this.infosUser = JSON.parse(this.cookie.get('infosUser'));

    if (this.infosUser.photoUser === '') {

      if (this.infosUser.sex === 'F') {

        this.infosUser.photoUser = './assets/img/users/user_f.png';

        this.urlImageProfil = './assets/img/users/user_f.png';
      }

      if (this.infosUser.sex === 'H') {

        this.infosUser.photoUser = './assets/img/users/user_m.png';

        this.urlImageProfil = './assets/img/users/user_m.png';
      }

    } else {

      this.urlImageProfil = this.infosUser.photoUser;

    }

    this.countMessagesNonLus();

    this.listMessagesNonLus();


  }

  countMessagesNonLus(){


    this.apiService.countListMessagesNonLus(this.infosUser).subscribe((nbrMessages: number) => {

     // alert(nbrMessages);

     this.nbrMessagesNonLus = nbrMessages;

   }, (error: any) => {


   });

  }

  listMessagesNonLus(){

    this.apiService.getListMessagesNonLus(this.infosUser).subscribe((dataMessages: Array<MessageInterneModel>) => {

     this.listMessagesRecus = dataMessages;
 

   }, (error: any) => {


   });

  }

  switchLang(lang: string) {

    this.translate.use(lang);

    this.cookie.set('lang_translat_user', lang);
  }

  ngOnInit(): void { }

  searchGlobalProjectsByMotCle() {

    this.router.navigate(['/user-search-projetcs-by-tag', { search: this.tagSearchGlobal }]);

  }

}
