import { Colis } from "./colis";
import { Personnel } from "./personnel";
import { SocieteLiv } from "./societeLiv";

export interface Hub {
    id_hub  : number ;
    titre : string; 
    gouvernorat : string;
	adresse : string ;
    gouvernorat_lie : String[];
    societeLiv :SocieteLiv ;
    colis : Colis[];
    personnel : Personnel[];

}