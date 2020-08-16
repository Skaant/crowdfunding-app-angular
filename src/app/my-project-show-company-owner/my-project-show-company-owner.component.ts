import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { apiHttpSpringBootService } from './../api-spring-boot.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import {
   UserModel, ProjectModel, templteProjectModel, ImageProjectModel, AdressReseauxSociauxProjectModel, commentProjectModel,
   QuestionRepProjectByAdminForUserModel, QuestionRepProjectByUserForAdminModel,
   QuestionRepProjectByUserForUserModel, InvestiteurProjectModel, fondInvestor
} from '../interfaces/models';


declare var window: any;

@Component({
   selector: 'app-my-project-show-company-owner',
   templateUrl: './my-project-show-company-owner.component.html',
   styleUrls: ['./my-project-show-company-owner.component.css']
})
export class MyProjectShowCompanyOwnerComponent implements OnInit {

   public infosUser: UserModel = new UserModel();

   public ObjetProject: ProjectModel = new ProjectModel();

   // public ObjetProjectTemplate: templteProjectModel = new templteProjectModel();

   public ObjetProjectTemplate: templteProjectModel = new templteProjectModel();

   public imagesProjects: Array<ImageProjectModel> = [];

   public arrayAdressReseauxSociauxProject: Array<AdressReseauxSociauxProjectModel> = [];

   public ObjetComment: commentProjectModel = new commentProjectModel();

   public listCommentsForProject: Array<commentProjectModel> = [];


   public listeStatusProject = [
      { key: 1, value: 'Valider le porjet' },
      { key: 2, value: 'Terminer le porjet' },
      { key: 3, value: 'Annuler le porjet' }
   ];

   public statutProject;

   public photoUserAdmin = './assets/img/users/user_f.png';

   public polling: any;

   public pollingComment: any;

   public page = 1;

   public pageSize = 4;

   public collectionSize = 0;

   public checkInvest = false;

   public showTextera = false;

   // tslint:disable-next-line:max-line-length
   public objectQuestionRepProjectByUserForAdminModel: QuestionRepProjectByUserForAdminModel = new QuestionRepProjectByUserForAdminModel();

   public objectQuestionRepProjectByUserForUserModel: QuestionRepProjectByUserForUserModel = new QuestionRepProjectByUserForUserModel();

   public listQuestionsAidesByUserForAdmin: Array<QuestionRepProjectByUserForAdminModel> = [];

   public listQuestionsAidesByAdminForUser: Array<QuestionRepProjectByAdminForUserModel> = [];

   public listQuestionsAidesByUserByAdmin: Array<any> = [];

   public listQuestionsAidesByUserForUser: Array<QuestionRepProjectByUserForUserModel> = [];

   public listInvestor: Array<InvestiteurProjectModel> = [];

   public pageBis = 1;

   public pageSizeBis = 4;

   public collectionSizeBis = 0;

   public listFonsInvest: Array<fondInvestor> = [];



   constructor(private router: Router, private route: ActivatedRoute, private cookie: CookieService, 
               private apiService: apiHttpSpringBootService, private ngxService: NgxUiLoaderService,
                private datePipe: DatePipe, public sanitizer: DomSanitizer) {

      if (this.cookie.get('infosUser')) {

         this.infosUser = JSON.parse(this.cookie.get('infosUser'));


         if (this.infosUser.photoUser === '' || !this.infosUser.photoUser) {

            if (this.infosUser.sex === 'F') {

               this.infosUser.photoUser = './assets/img/users/user_f.png';


            }

            if (this.infosUser.sex === 'H') {

               this.infosUser.photoUser = './assets/img/users/user_m.png';


            }

         }

         this.route.params.subscribe(params => {

            this.getinfosProject(params.token);



         });


         console.log('ProfilUserComponent', this.infosUser);

      } else {

         this.router.navigate(['/Identification']);
      }


   }

   ngOnInit(): void { }

   getinfosProject(tokenProject) {

      this.ngxService.start();

      this.apiService.getDataProject(tokenProject).subscribe((dataPorject: ProjectModel) => {

         console.log('dataPorject = ', dataPorject);

         this.ObjetProjectTemplate.project = dataPorject;

         if (dataPorject.manager_project) {

            this.getInfosManagerProject();
         }

         this.getListArrayAdressReseauxSociauxProject();

         this.getListCommentsProject();

         this.getAllImageProject();

         this.getListQuestionsAides();

         this.getListQuestionsAidesForInvestor();

         this.getListInvestorByProject();

         this.getAllFondsInvest();

         /******************************************** */

      /*   this.pollingComment = setInterval(() => {

            this.getListCommentsProject();

         }, 10 * 1000); */

         /***************************************** */

       /*  this.polling = setInterval(() => {

            this.getListQuestionsAides();

            this.getListQuestionsAidesForInvestor();

            this.getListInvestorByProject();

            this.getAllFondsInvest();

         }, 10 * 1000); */


         /******************************************* */

         this.ngxService.stop();


      }, (error: any) => {

         this.ngxService.stop();
      });


   }

   getListInvestorByProject() {

      this.listInvestor = [];


      this.apiService.getListInvestorByProject(this.ObjetProjectTemplate.project).subscribe((dataInvestor: any) => {

         console.log('dataInvestor', dataInvestor);

         // tslint:disable-next-line:prefer-for-of
         for (let index = 0; index < dataInvestor.length; index++) {



            if (dataInvestor[index]._userProjectInvest.photoUser === '') {

               if (dataInvestor[index]._userProjectInvest.sex === 'F') {

                  dataInvestor[index]._userProjectInvest.photoUser = './assets/img/users/user_f.png';


               }

               if (dataInvestor[index]._userProjectInvest.sex === 'H') {

                  dataInvestor[index]._userProjectInvest.photoUser = './assets/img/users/user_m.png';


               }

            }

            this.listInvestor.push(dataInvestor[index]);

         }




      }, (error: any) => { });


   }

   getAllFondsInvest() {

      this.listFonsInvest = [];

      // tslint:disable-next-line:max-line-length
      this.apiService.getAllFondsInvestByProject(this.ObjetProjectTemplate.project).subscribe((arrayFondsInvestor: Array<fondInvestor>) => {

         // tslint:disable-next-line:prefer-for-of
         for (let index = 0; index < arrayFondsInvestor.length; index++) {



            if (arrayFondsInvestor[index]._investisseurProject._userProjectInvest.photoUser === '') {

               if (arrayFondsInvestor[index]._investisseurProject._userProjectInvest.sex === 'F') {

                  arrayFondsInvestor[index]._investisseurProject._userProjectInvest.photoUser = './assets/img/users/user_f.png';


               }

               if (arrayFondsInvestor[index]._investisseurProject._userProjectInvest.sex === 'H') {

                  arrayFondsInvestor[index]._investisseurProject._userProjectInvest.photoUser = './assets/img/users/user_m.png';


               }

            }

            this.listFonsInvest.push(arrayFondsInvestor[index]);

         }



         console.log(arrayFondsInvestor);

      }, (error: any) => {

      });

   }


   getInfosManagerProject() {


      // tslint:disable-next-line:max-line-length
      if (this.ObjetProjectTemplate.project.manager_project.photoUser === '' || !this.ObjetProjectTemplate.project.manager_project.photoUser) {



         if (this.ObjetProjectTemplate.project.manager_project.sex === 'F') {



            this.ObjetProjectTemplate.project.manager_project.photoUser = './assets/img/users/user_f.png';


         }

         if (this.ObjetProjectTemplate.project.manager_project.sex === 'H') {



            this.ObjetProjectTemplate.project.manager_project.photoUser = './assets/img/users/user_m.png';


         }

      }


   }

   getListArrayAdressReseauxSociauxProject() {


      this.apiService.getListArrayAdressReseauxSociauxProject(this.ObjetProjectTemplate.project).subscribe((data: any) => {


         console.log('data-Adress-sociaux', data);

         this.arrayAdressReseauxSociauxProject = data;

      }, (error: any) => {

      });

   }

   getListCommentsProject() {

      this.listCommentsForProject = [];

      /*************************************************************************************** */

      // recuperer la liste des questions envoye par l'investor (id-admin ='1' ) pour le compagny owner

      // tslint:disable-next-line:max-line-length
      this.apiService.getListArrayCommentsProject(this.ObjetProjectTemplate.project).subscribe((dataComments: any) => {

         console.log('dataComments', dataComments);

         // tslint:disable-next-line:prefer-for-of
         for (let index = 0; index < dataComments.length; index++) {



            if (dataComments[index]._user.photoUser === '') {

               if (dataComments[index]._user.sex === 'F') {

                  dataComments[index]._user.photoUser = './assets/img/users/user_f.png';


               }

               if (dataComments[index]._user.sex === 'H') {

                  dataComments[index]._user.photoUser = './assets/img/users/user_m.png';


               }

            }

            this.listCommentsForProject.push(dataComments[index]);

         }

         console.log('listCommentsForProject', this.listCommentsForProject);

         this.listCommentsForProject = this.listCommentsForProject.sort((c1, c2) => c2.timestamp - c1.timestamp);


      }, (error: any) => { });



      this.listCommentsForProject = this.listCommentsForProject.sort((c1, c2) => c2.timestamp - c1.timestamp);



      /************************************************************************************ */




   }

   onFormSubmitComment() {

      const date = new Date();

      this.ObjetComment.dateCreated = date.toLocaleString('fr-FR', {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric',
         hour: 'numeric',
         minute: 'numeric',
         second: 'numeric',
      });

      this.ObjetComment.timestamp = Date.now();

      this.ObjetComment._project = this.ObjetProjectTemplate.project;

      this.ObjetComment._user = this.infosUser;


      this.apiService.addCommentProject(this.ObjetComment).subscribe((dataComment: any) => {

         console.log(dataComment);

         this.getListCommentsProject();


      }, (error: any) => { });

   }


   getInfosCompanyOwner() {

      if (this.ObjetProjectTemplate.project._user.photoUser === '') {

         if (this.ObjetProjectTemplate.project._user.sex === 'F') {

            this.ObjetProjectTemplate.project._user.photoUser = './assets/img/users/user_f.png';


         }

         if (this.ObjetProjectTemplate.project._user.sex === 'H') {

            this.ObjetProjectTemplate.project._user.photoUser = './assets/img/users/user_m.png';


         }

      }
   }


   confDemandeInvest(ObjectDemandeInvest: InvestiteurProjectModel) {

      const date = new Date();

      ObjectDemandeInvest.date_update = date.toLocaleString('fr-FR', {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric',
         hour: 'numeric',
         minute: 'numeric',
         second: 'numeric',

      });

      ObjectDemandeInvest.statutDemande = 'VALIDE';

      this.apiService.acceptDemandeInvestorByProject(ObjectDemandeInvest).subscribe((dataConfirm: any) => {

         console.log(dataConfirm);

         this.getListInvestorByProject();

      }, (error: any) => {

      });



   }

   declinerDemandeInvest(ObjectDemandeInvest: InvestiteurProjectModel) {

      ObjectDemandeInvest.statutDemande = 'ANNULE';

      const date = new Date();

      ObjectDemandeInvest.date_update = date.toLocaleString('fr-FR', {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric',
         hour: 'numeric',
         minute: 'numeric',
         second: 'numeric',

      });

      this.apiService.declinDemandeInvestorByProject(ObjectDemandeInvest).subscribe((dataConfirm: any) => {

         console.log(dataConfirm);

         this.getListInvestorByProject();

      }, (error: any) => {

      });



   }

   getAllImageProject() {


      this.apiService.getAllImagesByIdProject(this.ObjetProjectTemplate.project).subscribe((dataImages: Array<ImageProjectModel>) => {

         console.log(dataImages);

         this.imagesProjects = dataImages;

      }, (error: any) => {

      });



   }

   formaterProject() {

      /******************************************************** */

      /*  this.apiService.getPorteProjectById(this.ObjetProject.portes_projectId).subscribe((dataPorte: any) => {
   
           // console.log(data);
   
           this.ObjetProjectTemplate.portes_project = dataPorte.nom;
   
        }, (error: any) => {
   
        }); */

      /****************************************************** */

      //   this.ObjetProjectTemplate.date_limite_collecte = this.datePipe.transform(this.ObjetProject.date_limite_collecte, 'dd-MM-yyyy');


      /******************************************************* */

      /*  this.apiService.getCategorieProject(this.ObjetProject.categorie_projectId).subscribe((dataCatgorie: any) => {
   
           // console.log(data);
   
           this.ObjetProjectTemplate.categorie_project = dataCatgorie.nom;
   
        }, (error: any) => {
   
        }); */


      /******************************************************* */

      /*  if (this.ObjetProject.statut_project === 0) {
   
   
           this.ObjetProjectTemplate.statut_project = 'Attente';
   
        }
   
        if (this.ObjetProject.statut_project === 1) {
   
   
           this.ObjetProjectTemplate.statut_project = 'Validé';
   
        }
   
        if (this.ObjetProject.statut_project === 2) {
   
   
           this.ObjetProjectTemplate.statut_project = 'Terminé';
   
        }
   
        if (this.ObjetProject.statut_project === 3) {
   
   
           this.ObjetProjectTemplate.statut_project = 'Annulé';
   
        } */

      /******************************************************* */

   }

   onFormSubmitQuestionForManager() {
      const date = new Date();

      this.objectQuestionRepProjectByUserForAdminModel.dateCreated = date.toLocaleString('fr-FR', {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric',
         hour: 'numeric',
         minute: 'numeric',
         second: 'numeric',

      });

      this.objectQuestionRepProjectByUserForAdminModel.timestamp = Date.now();

      this.objectQuestionRepProjectByUserForAdminModel._project = this.ObjetProjectTemplate.project;

      this.objectQuestionRepProjectByUserForAdminModel._userProjectExp = this.infosUser;

      this.objectQuestionRepProjectByUserForAdminModel._userAdminDest = this.ObjetProjectTemplate.project.manager_project;


      // tslint:disable-next-line:max-line-length
      this.apiService.createQuestionReponsesByUserForAdmin(this.objectQuestionRepProjectByUserForAdminModel).subscribe((dataQuestion: QuestionRepProjectByUserForAdminModel) => {

         console.log('createQuestionReponsesByUserForAdmin = ', dataQuestion);

         this.getListQuestionsAides();


      }, (error: any) => { });

   }

   replyByPorteurProjectForInvestFor(objectquestionUser) {

      this.objectQuestionRepProjectByUserForUserModel._userDest = objectquestionUser;

      this.showTextera = true;

   }

   onFormSubmitQuestionForUser() {


      const date = new Date();

      this.objectQuestionRepProjectByUserForUserModel.dateCreated = date.toLocaleString('fr-FR', {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric',
         hour: 'numeric',
         minute: 'numeric',
         second: 'numeric',

      });

      this.objectQuestionRepProjectByUserForUserModel._project = this.ObjetProjectTemplate.project;

      this.objectQuestionRepProjectByUserForUserModel.timestamp = Date.now();


      this.objectQuestionRepProjectByUserForUserModel._userExp = this.infosUser;

      // tslint:disable-next-line:max-line-length
      this.apiService.createQuestionReponsesByUserForUser(this.objectQuestionRepProjectByUserForUserModel).subscribe((dataQuestion: any) => {

         // console.log(dataQuestion);

         this.getListQuestionsAidesForInvestor();

         this.showTextera = false;


      }, (error: any) => {

      });
   }

   getListQuestionsAides() {


      this.listQuestionsAidesByUserByAdmin = [];



      /*************************************************************************************** */

      // recuperer la liste des questions envoye par l'admin (id-admin ='1' ) pour le compagny owner

      // tslint:disable-next-line:max-line-length
      this.apiService.getListQuestionReponsesByAdminForUser(this.ObjetProjectTemplate.project).subscribe((arrayQuestionByAdminForUser: Array<QuestionRepProjectByAdminForUserModel>) => {

         console.log('arrayQuestionByAdminForUser', arrayQuestionByAdminForUser);

         // tslint:disable-next-line:prefer-for-of
         for (let index = 0; index < arrayQuestionByAdminForUser.length; index++) {

            this.listQuestionsAidesByUserByAdmin.push(arrayQuestionByAdminForUser[index]);


         }

         console.log('listQuestionsAidesByUserByAdmin', this.listQuestionsAidesByUserByAdmin);

         this.listQuestionsAidesByUserByAdmin = this.listQuestionsAidesByUserByAdmin.sort((c1, c2) => c2.timestamp - c1.timestamp);


      }, (error: any) => { });


      /************************************************************************************ */

      // recuperer la liste des questions envoyer  par le company-owner  en vers l'admin () id-admin ='1')

      // tslint:disable-next-line:max-line-length
      this.apiService.getListQuestionReponsesByUserForAdmin(this.ObjetProjectTemplate.project).subscribe((arrayQuestionByUserForAdmin: Array<QuestionRepProjectByUserForAdminModel>) => {

         console.log('dataQuestion', arrayQuestionByUserForAdmin);

         // tslint:disable-next-line:prefer-for-of
         for (let indexBis = 0; indexBis < arrayQuestionByUserForAdmin.length; indexBis++) {

            this.listQuestionsAidesByUserByAdmin.push(arrayQuestionByUserForAdmin[indexBis]);


         }

         console.log('listQuestionsAidesForConsiller', this.listQuestionsAidesByUserByAdmin);

         this.listQuestionsAidesByUserByAdmin = this.listQuestionsAidesByUserByAdmin.sort((c1, c2) => c2.timestamp - c1.timestamp);



      }, (error: any) => { });


      /************************************************************************************ */

      this.listQuestionsAidesByUserByAdmin = this.listQuestionsAidesByUserByAdmin.sort((c1, c2) => c2.timestamp - c1.timestamp);


   }

   getListQuestionsAidesForInvestor() {


      this.listQuestionsAidesByUserForUser = [];



      /*************************************************************************************** */


      // tslint:disable-next-line:max-line-length
      this.apiService.getListQuestionReponsesByUserForUser(this.ObjetProjectTemplate.project).subscribe((dataQuestion: any) => {

         console.log('dataQuestion', dataQuestion);

         // tslint:disable-next-line:prefer-for-of
         for (let index = 0; index < dataQuestion.length; index++) {


            if (dataQuestion[index]._userExp.photoUser === '' || !dataQuestion[index]._userExp.photoUser) {

               if (dataQuestion[index]._userExp.sex === 'F') {

                  dataQuestion[index]._userExp.photoUser = './assets/img/users/user_f.png';


               }

               if (dataQuestion[index]._userExp.sex === 'H') {

                  dataQuestion[index]._userExp.photoUser = './assets/img/users/user_m.png';


               }

            }

            this.listQuestionsAidesByUserForUser.push(dataQuestion[index]);


         }

         console.log('listQuestionsAidesByUserForUser', this.listQuestionsAidesByUserForUser);

         this.listQuestionsAidesByUserForUser = this.listQuestionsAidesByUserForUser.sort((c1, c2) => c2.timestamp - c1.timestamp);


      }, (error: any) => {

      });



   }



}
