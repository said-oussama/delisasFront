import { Fournisseur } from "./fournisseur";
import { Hub } from "./hub";
import { Runsheet } from "./runsheet";

export interface Colis {
    reference : number ; //
	nom_c : string;//
	prenom_c : string; //
	tel_c_1 : number;//
	barCodeAncienColis: number;
	tel_c_2 : number; //
	date_creation : Date;//
	adresse : string; //
	gouvernorat : string; //
	delegation : string ;//
	code_postal : number; //
	cod : number; //
	mode_paiement : string; //
	service : String ;//
	designation  : string;//
	remarque : string; //
	etat : string ;//
	anomalie : string;
	nb_p : number ; //
	longeur : number;//
	largeur : number;//
	hauteur : number ;//
	poids : number;//
    fournisseur: Fournisseur;
	bar_code : number ; //
	latitude : number;
	longitude :number;
	runsheet : Runsheet ; 
	hub : Hub;
}
export interface HistoStateOnly{

	etat : string ;
	revtstmp : Number ;
}