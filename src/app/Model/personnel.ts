import { Hub } from "./hub";

export interface Personnel {
    iduser : number ;  
    cin : number; 
	nom : string; 
	prenom : string;  
	role_personnel : string; 
	tel_personnel : number; 
	mail : string; 
	permis : string ;
	matricule_veh : string; 
	carte_grise : String ;
	photo  : string;
	hub : Hub; 
	isDeleted:boolean;
	
}
export interface LivreurList{

	nom : string ;
	id : Number ;
}