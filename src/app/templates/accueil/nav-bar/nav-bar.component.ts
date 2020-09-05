import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar-accueil',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarAccueilComponent implements OnInit {

  constructor(public translate: TranslateService, private cookie: CookieService) {

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


    }else{

    translate.setDefaultLang('en');

    }
  }

  switchLang(lang: string) {

    this.translate.use(lang);

    this.cookie.set('lang_translat_user', lang);
  }

  ngOnInit(): void {  }

}