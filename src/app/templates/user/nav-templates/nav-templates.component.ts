import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-user-templates',
  templateUrl: './nav-templates.component.html',
  styleUrls: ['./nav-templates.component.css']
})
export class NavTemplatesUserComponent implements OnInit {

  public infosUser = {
    id: '',
    nom: '',
    prenom: '',
    login: '',
    password: '',
    sex: '',
    photoUser: '',
    typeCompte: ''
  };

  public urlImageProfil: string;

  public tagSearchGlobal = '';


  constructor(private router: Router, private cookie: CookieService, public translate: TranslateService) {

    translate.addLangs(['en', 'fr', 'es', 'it', 'ru', 'zh-Hant', 'ja']);
    /* Code de langue pour l'internnationalisation de l'application :
    (contenu cf. les fichiers .json respectif dans le dossier assets/i18n)
    Les langues sont spécifiées à l'aide d'un code minuscule de deux ou trois lettres pour une langue particulière. 
    Par exemple, l'espagnol est "es", l'anglais est "en" et le français est "fr". 
    "ru" pour le russe
    "it" pour l'italien
    "zh-Hant" pour intégrer le chinois traditionnel 
    Le code de langue à deux lettres utilise la norme ISO-639 .
    cf. https://www.loc.gov/standards/iso639-2/php/code_list.php
    jpn	ja	Japanese	japonais	Japanisch       => "ja" pour intégrer le japonais 
    */

    if (this.cookie.get('lang_translat_user')) {

      const langTranslat = this.cookie.get('lang_translat_user');

      translate.setDefaultLang(langTranslat);

    } else {

      translate.setDefaultLang('en');
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
