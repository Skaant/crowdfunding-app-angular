import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel, ProjectModel, ProjectModelBis,  ImageProjectModel
  , AdressReseauxSociauxProjectModel, commentProjectModel, StatutProjectModel,
  QuestionRepProjectByAdminForUserModel, QuestionRepProjectByUserForAdminModel,
    QuestionRepProjectByUserForUserModel, InvestiteurProjectModelBis, fondInvestorBis, FavorisProjectUserModel,
    HeartProjectUserModel} from './interfaces/models';



@Injectable({
  providedIn: 'root'
})

export class apiHttpSpringBootService { 

  // https://json-server-growdlending.herokuapp.com

  // http://api-spring-boot-crowdlending-api-spring-boot-crowdlending.apps.us-east-2.starter.openshift-online.com/api

  // tslint:disable-next-line:max-line-length
  private apiUrlCloud = 'https://api-spring-boot-h2-database.herokuapp.com/api';



  constructor(private http: HttpClient,  @Inject('BASE_URL') baseUrl: string) {

      console.log('BASE_URL = ', baseUrl );

      if (baseUrl === 'http://localhost:4200/'){

           this.apiUrlCloud = 'https://api-spring-boot-h2-database.herokuapp.com/api';

      }
  }

  public getStatistiquesCharts(){


    const  url = this.apiUrlCloud + '/admin/statistiques_charts';

    return this.http.get(url);




  }

  public sendFormContact(objectContact){

    const  url = this.apiUrlCloud + '/visitor/createMessageContact';

    return this.http.post(url, objectContact);


  }


  public identificationAdmin(objectConnection){

    const  url = this.apiUrlCloud + '/admin/checkUser';

    const objectConnectionBis = {

                             login : objectConnection.emailLogin,

                             password : objectConnection.passwordLogin
    };

    return this.http.post(url, objectConnectionBis);


  }

  public checkAdminByToken(objetUser){

    const  url = this.apiUrlCloud + '/admin/checkUserByToken';

    return this.http.post(url, objetUser);


  }


   public identificationUser(objectConnection){

    const  url = this.apiUrlCloud + '/users/checkUser';

    const objectConnectionBis = {

                             login : objectConnection.emailLogin,

                             password : objectConnection.passwordLogin
    };

    return this.http.post(url, objectConnectionBis);


  }

  public inscriptionUser(objectInscription){

    const  url = this.apiUrlCloud + '/users/create';


  /*  const bodyInscription = {
        nom : objectInscription.nomInscription,
        prenom : objectInscription.prenomInscription,
        login : objectInscription.emailInscription,
        password : objectInscription.passwordInscription,
        sex : objectInscription.sex,
        photoUser : objectInscription.photoUser,
        date_naissance : objectInscription.date_naissance,
        token : objectInscription.token,
        typeCompte : objectInscription.typeCompte,
        pseudo_name : objectInscription.pseudo_name
    };*/


     // console.log("objectInscription.date_naissance = ", objectInscription.date_naissance);

    return this.http.post(url, objectInscription);

  }


  public updateProfilUser(objectUpdate){

   const     url = this.apiUrlCloud + '/users/update';

   const bodyUpdate = {
                 id : objectUpdate.id,
                 nom : objectUpdate.nom,
                 prenom : objectUpdate.prenom,
                 login : objectUpdate.login,
                 password : objectUpdate.password,
                 sex : objectUpdate.sex,
                 photoUser : objectUpdate.photoUser,
                 date_naissance : objectUpdate.date_naissance,
                 date_created: objectUpdate.date_created,
                 date_update: objectUpdate.date_update,
                 token : objectUpdate.token,
                 pseudo_name : objectUpdate.pseudo_name

     };



   return this.http.put(url, bodyUpdate);


  }

  getListUsers(objectUser: UserModel){

    const url = this.apiUrlCloud + '/admin/users';

    return this.http.post(url, objectUser);

  }

  getDataProject(tokenProject: string){

    const url = this.apiUrlCloud + '/projects/' + tokenProject;

    return this.http.get(url);

  }

  checkHeartProjectByUser(objectProject, objectUser){

    const url = this.apiUrlCloud + '/user/projects/' + objectProject.token + '/checkHeartProject';

    return this.http.post(url, objectUser);

  }

  addHeartProjectByUser(objectHeartProject: HeartProjectUserModel){

    console.log("objectHeartProject._project.token", objectHeartProject._project.token);

    const url = this.apiUrlCloud + '/user/projects/' + objectHeartProject._project.token + '/hearts_project/create';

    return this.http.post(url, objectHeartProject);

  }

  deleteHeartProjectByUser(objectHeartProject: HeartProjectUserModel){

    const url = this.apiUrlCloud + '/user/projects/' + objectHeartProject._project.token + '/hearts_project/delete';

    return this.http.post(url, objectHeartProject);

  }

  public addProjectByMyFavoris(objectFavoris: FavorisProjectUserModel){

    const  url = this.apiUrlCloud + '/user/projects/' + objectFavoris._project.token + '/favoris_projects/create';

    return this.http.post(url, objectFavoris);


  }

  checkFavorisProjectByUser(objectProject, objectUser){

    const url = this.apiUrlCloud + '/projects/' + objectProject.token + '/checkFavorisProjects';

    return this.http.post(url, objectUser);

  }

  deleteFavorisProjectByUser(objectFavoris: FavorisProjectUserModel){

    const  url = this.apiUrlCloud + '/user/projects/' + objectFavoris._project.token + '/favoris_projects/delete';

    return this.http.post(url, objectFavoris);

  }



  public addProjectByCompanyOwner(objectProject){

    const url = this.apiUrlCloud + '/projects/create';


    const newObjetProject = {
                           nom: objectProject.nom,
                           description : objectProject.description,
                           montant_minimun : objectProject.montant_minimun,
                           date_limite_collecte : objectProject.date_limite_collecte,
                           _user : objectProject._user,
                           contrePartieProject : objectProject.contrePartieProject,
                           afficheProject : objectProject.afficheProject,
                           _statut_project : objectProject._statut_project,
                           valid_project : objectProject.valid_project,
                           _porte_project : objectProject._porte_project,
                           categoryProject : objectProject.categoryProject
              };


    return this.http.post(url, newObjetProject);

  }

  public updateDataProjectByUser(objectProject: ProjectModel){

    const url = this.apiUrlCloud + '/user/my_projects/update';


   /* const newObjetProject = {
                           nom: objectProject.nom,
                           description : objectProject.description,
                           montant_minimun : objectProject.montant_minimun,
                           date_limite_collecte : objectProject.date_limite_collecte,
                           _user : objectProject.token_user,
                           contrePartieProject : objectProject.contrePartieProject,
                           afficheProject : objectProject.afficheProject,
                           _statut_project : objectProject._statut_project,
                           valid_project : objectProject.valid_project,
                           _porte_project : objectProject._porte_project,
                           categoryProject : objectProject.categoryProject
              }; */


    return this.http.put(url, objectProject);

  }


  public updateDataProjectByAdmin(objectProject: ProjectModel){

    const url = this.apiUrlCloud + '/admin/projects/update';


   /* const newObjetProject = {
                           nom: objectProject.nom,
                           description : objectProject.description,
                           montant_minimun : objectProject.montant_minimun,
                           date_limite_collecte : objectProject.date_limite_collecte,
                           _user : objectProject.token_user,
                           contrePartieProject : objectProject.contrePartieProject,
                           afficheProject : objectProject.afficheProject,
                           _statut_project : objectProject._statut_project,
                           valid_project : objectProject.valid_project,
                           _porte_project : objectProject._porte_project,
                           categoryProject : objectProject.categoryProject
              }; */


    return this.http.put(url, objectProject);

  }

  listAllProjectsForAdmin(){

    const url = this.apiUrlCloud + '/admin/projects';

    return this.http.get(url);

  }

  listAllProjectsForVisitor(){

    const url = this.apiUrlCloud + '/visitor/projects';

    return this.http.get(url);

  }

  listAllFavorisProjectByUser(objectUser: UserModel){

    const url = this.apiUrlCloud + '/user/projects/' + objectUser.token + '/list_favoris_projects';

    return this.http.post(url, objectUser);

  }



  listMyProjectByUser(objectUser: UserModel){

    const url = this.apiUrlCloud + '/user/my_projects';

    return this.http.post(url, objectUser);

  }

  listMyContribProjectByUser(objectUser: UserModel){

    const url = this.apiUrlCloud + '/user/my_contrib_projects';

    return this.http.post(url, objectUser);

  }

  listAllProjectByUser(objectUser: UserModel){

    const url = this.apiUrlCloud + '/user/all_projects';

    return this.http.post(url, objectUser);

  }



  getListCategorieProject(){

    const url = this.apiUrlCloud + '/project/all_categories';

    return this.http.get(url);

  }

  getListStatutProject(){

    const url = this.apiUrlCloud + '/project/all_statuts';

    return this.http.get(url);

  }

  getListPorteProject(){

    const url = this.apiUrlCloud + '/project/all_portes';

    return this.http.get(url);

  }

  public addImageProject(objectImage: ImageProjectModel){

    const url = this.apiUrlCloud + '/user/projects/' + objectImage._project.token + '/create_link_image';


    return this.http.post(url, objectImage);

  }

  public deleteImageProject(objectImage: ImageProjectModel){

    const url = this.apiUrlCloud + '/user/projects/' + objectImage._project.token + '/delete_link_image';


    return this.http.post(url, objectImage);

  }

  getAllImagesByIdProject(objectProject){


    const url = this.apiUrlCloud + '/projects/' + objectProject.token + '/list_link_images';

    return this.http.post(url, objectProject);
  }

  public addAdressReseauSocialProject(objectAdress){

    const url = this.apiUrlCloud + '/projects/create_adress_res_social';


    return this.http.post(url, objectAdress);

  }

  public deleteAdressReseauSocialProject(objectAdress: AdressReseauxSociauxProjectModel){

    const url = this.apiUrlCloud + '/user/projects/' + objectAdress._project.token + '/delete_adress_social';

    return this.http.post(url, objectAdress);

  }

  getListArrayAdressReseauxSociauxProject(objectProject){

    const url = this.apiUrlCloud + '/projects/' + objectProject.token + '/list_adress_social';

    return this.http.post(url, objectProject);

  }



  public addCommentProject(objectComment){

    const url = this.apiUrlCloud + '/projects/' + objectComment._project.token + '/comments/create';


    return this.http.post(url, objectComment);

  }

  getListArrayCommentsProject(objectProject){

    const url = this.apiUrlCloud + '/projects/' + objectProject.token + '/comments';

    return this.http.post(url, objectProject);

  }

  public createQuestionReponsesByAdminForUser(objectQuestion: QuestionRepProjectByAdminForUserModel){

    console.log('objectQuestion=', objectQuestion);

    const url = this.apiUrlCloud + '/projects/' + objectQuestion._project.token + '/QuestRepByProjectByAdminForUser/create';


    return this.http.post(url, objectQuestion);

  }

  getListQuestionReponsesByAdminForUser(objectProject: ProjectModel){

    const url = this.apiUrlCloud + '/projects/' + objectProject.token + '/list_questions_rep_by_admin_for_user';

    return this.http.post(url, objectProject);

  }

  public createQuestionReponsesByUserForAdmin(objectQuestion: QuestionRepProjectByUserForAdminModel){

    console.log('objectQuestion=', objectQuestion);

    const url = this.apiUrlCloud + '/projects/' + objectQuestion._project.token + '/QuestRepByProjectByUserForAdmin/create';


    return this.http.post(url, objectQuestion);

  }

  getListQuestionReponsesByUserForAdmin(objectProject: ProjectModel){

    const url = this.apiUrlCloud + '/projects/' + objectProject.token + '/list_questions_rep_by_user_for_admin';

    return this.http.post(url, objectProject);

  }

  getListQuestionReponsesByUserForUser(objectProject: ProjectModelBis){

    const url = this.apiUrlCloud + '/projects/' + objectProject.token + '/list_questions_rep_by_user_for_user';

    return this.http.post(url, objectProject);

  }

  public createQuestionReponsesByUserForUser(objectQuestion){

    console.log('objectQuestion=', objectQuestion);

    const url = this.apiUrlCloud + '/projects/' + objectQuestion._project.token + '/QuestRepByProjectByUserForUser/create';


    return this.http.post(url, objectQuestion);

  }

  getListInvestorByProject(objectProject){

    const url = this.apiUrlCloud + '/projects/' + objectProject.token + '/investisseurs_project';

    return this.http.post(url, objectProject);

  }

  sendDemandeInvestorByProject(objectDemandeInvestProject: InvestiteurProjectModelBis){

    const url = this.apiUrlCloud + '/projects/' + objectDemandeInvestProject._project.token + '/investisseurs_project/createDemandeInvest';

    return this.http.post(url, objectDemandeInvestProject);

  }

  acceptDemandeInvestorByProject(objectDemandeInvestProject: InvestiteurProjectModelBis){

    // tslint:disable-next-line:max-line-length
    const url = this.apiUrlCloud + '/projects/' + objectDemandeInvestProject._project.token + '/investisseurs_project/' + objectDemandeInvestProject.token + '/updateDemandeInvest';

    return this.http.put(url, objectDemandeInvestProject);

  }

  declinDemandeInvestorByProject(objectDemandeInvestProject: InvestiteurProjectModelBis){

      // tslint:disable-next-line:max-line-length
    const url = this.apiUrlCloud + '/projects/' + objectDemandeInvestProject._project.token + '/investisseurs_project/' + objectDemandeInvestProject.token + '/updateDemandeInvest';
    return this.http.put(url, objectDemandeInvestProject);

  }

  checkInvestiteurProject(objectProject: ProjectModelBis, objectUser: UserModel){

    // tslint:disable-next-line:max-line-length
  const url = this.apiUrlCloud + '/projects/' + objectProject.token + '/investisseurs_project/check_invest_project';
  return this.http.post(url, objectUser);

  }

  saveDataTransactionPaypal(objectFondInvestor: fondInvestorBis){

    const url = this.apiUrlCloud + '/projects/' + objectFondInvestor._investisseurProject._project.token + '/fonds_invest_project/createFondsInvestProject';

    return this.http.post(url, objectFondInvestor);


  }

  getAllFondsInvestByProject(objectProject: ProjectModelBis){

    const url = this.apiUrlCloud + '/projects/' + objectProject.token + '/fonds_invest_project';

    return this.http.post(url, objectProject);


  }




}
