import { Colis } from "./colis";
import { Personnel } from "./personnel";

export interface Console{
    id_console : number ;
	date_creation : Date ;
	depart : String;
	arrivee : String;
	etat : String; 
    colis :Colis;
    personnel : Personnel;
}