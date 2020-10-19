import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Router} from '@angular/router';
import { apiHttpSpringBootService } from './../api-spring-boot.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
import {CategorieProjectModel, ProjectModel, templteProjectModel, UserModel} from '../interfaces/models';
import { CookieService } from 'ngx-cookie-service';

declare var navigator: any;

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  public listProjects: Array<ProjectModel> = [];

  public templateRandomProject: templteProjectModel = new templteProjectModel();

  public randomCategorie = {id: 0 , nom : '', nbr_projects : 0};

  public listtemplateProjects: Array<templteProjectModel> = [];

  public listDiffrenceJours  = [];

  public listCategorieProjects = [];

  public pollingListProject: any;

  public paramObjectUpdate = {action_update : false};

  public userLang: any;



  constructor(private router: Router, private apiService: apiHttpSpringBootService, private titleService: Title
              // tslint:disable-next-line:align
              , private ngxService: NgxUiLoaderService, private datePipe: DatePipe, private cookie: CookieService) {

                this.titleService.setTitle('accueil');                

                this.templateRandomProject.setProject(new ProjectModel());

                this.templateRandomProject.getProject().setUserProject(new UserModel());

                this.templateRandomProject.getProject().setCategorieProject(new CategorieProjectModel());

                this.getListCategoriesProjects();

                this.getRandomProject();

                this.getListProjects();

   }

  ngOnInit(): void {


            this.userLang = navigator.language || navigator.userLanguage;
            // alert('this.userLang = ' + this.userLang );


   }

   getListProjectsBis(){

    this.apiService.listAllProjectsForVisitor().subscribe((data: any) => {

     }, (error: any) => {


    });

   }

   getRandomProject(){

    this.apiService.getRandomProject().subscribe((data: ProjectModel) => {

      // console.log(data);

      if (data){

       this.templateRandomProject.project = data;

       this.randomCategorie.id = this.templateRandomProject.project.categoryProject.id;

       this.randomCategorie.nom = this.templateRandomProject.project.categoryProject.nom;

       // tslint:disable-next-line:only-arrow-functions
       const categorie =  this.listCategorieProjects.filter(function(categorieProject) {

                              return categorieProject.nom === data.categoryProject.nom;
                        });

       this.randomCategorie =  categorie[0];

       this.templateRandomProject.nbrJours = this.calculNombredeJoursProjectRandom();


       this.templateRandomProject.tauxFinance = (data.total_fonds / data.montant_minimun) * 100;       

       console.log('this.templateRandomProject.tauxFinance = ', this.templateRandomProject.tauxFinance);

       console.log('categorie = ', categorie);

      }


     }, (error: any) => { });

   }


  getListProjects(){



    this.apiService.listAllProjectsTopConsulteForVisitor().subscribe((data: any) => {

      // console.log(data);

      if (data){

       this.listProjects = data;

       // tslint:disable-next-line:prefer-for-of
       for (let index = 0; index < this.listProjects.length; index++) {


            const  objectTemplteProjectModel: templteProjectModel = new templteProjectModel();

            objectTemplteProjectModel.project = this.listProjects[index];

            objectTemplteProjectModel.nbrJours =  this.calculNombredeJours(index);

            this.listtemplateProjects.push(objectTemplteProjectModel);


       }

       this.formaterListProject();

     /*  this.pollingListProject = setInterval(() => {

             this.paramObjectUpdate.action_update = true;

             this.getListProjects(this.paramObjectUpdate);

         }, 300 * 1000); */ // 5*60*1000 = 5 minute

      }else{

          // alert("pas de projects-1");
      }


  }, (error: any) => {


 });


 }

 getListCategoriesProjects(){


  this.apiService.getCustumListCategorieProject().subscribe((data: any) => {

    // console.log(data);

    if (data){

       this.listCategorieProjects = data;


    }else{

        // alert("pas de projects-1");
    }


   }, (error: any) => {});


}

 calculNombredeJoursProjectRandom(){

  const date1 = new Date();

  const date2 = new Date(this.templateRandomProject.project.date_limite_collecte);

  const diff = this.dateDiff(date1, date2);

  return  'J-' + diff.day;

    // this.listProjects[indexProject].nbrJoursRestant = 'J-' + diff.day;

   // tslint:disable-next-line:max-line-length
   //  console.log('Entre le ' + date1.toString() + ' et ' + date2.toString() + ' il y a ' + diff.day + ' jours, ' + diff.hour + ' heures, ' + diff.min + ' minutes et ' + diff.sec + ' secondes');

 }

  calculNombredeJours(indexProject){

    const date1 = new Date();

    const date2 = new Date(this.listProjects[indexProject].date_limite_collecte);

    const diff = this.dateDiff(date1, date2);

    return  'J-' + diff.day;

   // this.listProjects[indexProject].nbrJoursRestant = 'J-' + diff.day;

     // tslint:disable-next-line:max-line-length
     //  console.log('Entre le ' + date1.toString() + ' et ' + date2.toString() + ' il y a ' + diff.day + ' jours, ' + diff.hour + ' heures, ' + diff.min + ' minutes et ' + diff.sec + ' secondes');

  }

  dateDiff(date1, date2){

    const diff = {day : 0, hour: 0, min : 0, sec : 0 };                           // Initialisation du retour
    let tmp = date2 - date1;

    tmp = Math.floor(tmp / 1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes

    tmp = Math.floor((tmp - diff.sec) / 60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes

    tmp = Math.floor((tmp - diff.min) / 60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures

    tmp = Math.floor((tmp - diff.hour) / 24);   // Nombre de jours restants
    diff.day = tmp;

    console.log('diff', diff);

    return diff;
}



formaterListProject() {

  // tslint:disable-next-line:prefer-for-of
  for (let index = 0; index < this.listProjects.length; index++) {


    /****************************************************************** */

    this.listtemplateProjects[index].tauxFinance = (this.listProjects[index].total_fonds / this.listProjects[index].montant_minimun) * 100;


   /******************************************************************* */


    if (this.listProjects[index]._statut_project.nom === 'Attente'){


     this.listProjects[index]._statut_project.nom = 'Attente';

    }

    if (this.listProjects[index]._statut_project.nom === 'Valide'){


     this.listProjects[index]._statut_project.nom = 'Validé';

    }

    if (this.listProjects[index]._statut_project.nom === 'Termine'){


     this.listProjects[index]._statut_project.nom = 'Terminé';

    }

    if (this.listProjects[index]._statut_project.nom === 'Annule'){


     this.listProjects[index]._statut_project.nom = 'Annulé';

    }

    if (this.listProjects[index]._statut_project.nom === 'En cours'){


     this.listProjects[index]._statut_project.nom = 'En cours';

    }

    if (this.listProjects[index]._statut_project.nom === 'Renouvele'){


     this.listProjects[index]._statut_project.nom = 'Renouvele';

    }

     /********************************************************** */

    this.listtemplateProjects[index].dateLimiteCollecteFormate = this.datePipe.transform(this.listProjects[index].date_limite_collecte, 'dd-MM-yyyy');


  /********************************************************** */


  }


}

}
