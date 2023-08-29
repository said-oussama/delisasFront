import { Colis } from "./colis";

export interface ticket {
    id_ticket : number;
    description : string;
    sujet : string;
    colis :Colis;

}