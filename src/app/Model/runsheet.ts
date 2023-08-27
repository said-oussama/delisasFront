import { Colis } from "./colis";
import { Personnel } from "./personnel";

export interface Runsheet {
    code_runsheet  : number ;
	bar_code : string ; 
    etat_debrief : string;
	date_creation_runsheet : Date ;
	total_prix : number;
	personnel  : Personnel; 
	listColis : Colis [];
	

}