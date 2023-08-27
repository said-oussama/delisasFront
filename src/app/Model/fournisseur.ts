import { Colis } from "./colis";
import { SocieteLiv } from "./societeLiv";

export interface Fournisseur{
nom_societe: String  ;
nom_f : String; 
prenom_f  : String ;
tel_f : number  ; 
cin :number ; 
email_f: String ;
date_fin_contrat : Date  ;
adresse_societe : String ;
gouvernorat_societe : String;
localite_societe : String  ;
delegation_societe : String  ;
code_postal_societe : number ; 
adresse_livraison : String;
gouvernorat_livraison : String;
localite_livraison : String  ;
delegation_livraison : String  ;
code_postal_livraison  : number ;
prix_livraison : number;
prix_retour : number;
password : String ;
iduser : number ; 
logo : String;
patente : String;

societeLiv : SocieteLiv;
colis : Colis[];
isDeleted : boolean; 
}