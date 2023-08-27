import { Fournisseur } from "./fournisseur";
import { Hub } from "./hub";

export interface SocieteLiv {
    id  : number ;
    nom : string;
	patente : string ;
	mat_fisc : string;
	mail  : String; 
	adresse  : string; 
	localisation : string;
    tel : number ; 
    fournisseur : Fournisseur[];
	hub : Hub[]

}