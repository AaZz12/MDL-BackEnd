/*Importation des modules*/
const express = require("express");
const business = require("../business/business");

/*Initialisation de l'application*/
let app = express();
const REQUESTS_URL="/users";

/*API BackEnd*/
const api = {
    /**
     * Start the api on given port
     * @param {number} port The port identifier
     */
    start : port=>{
        //Autorisation des reqêtes JSON
        app.use(express.json());

        //Get la requête
        //Retourne un json contenant les users
        app.get(REQUESTS_URL, (res, req)=>{
            res.json(business.get_all_users());
        });

        //Post la requête
        //prend la requête du corps et ajoute la réponse
        app.post(REQUESTS_URL, (res, req)=>{
            let is_added = business.add_user(req.body);

            if(is_added){
                res.sendStatus(200);
            } else{
                res.sendStatus(400);
            }
        });

        //Put la requête
        //prend la requête du corps et ajoute la réponse
        app.put(REQUESTS_URL, (res, req)=>{
            let is_edited = business.edit_user(req.body);

            if(is_edited){
                res.sendStatus(200);
            } else{
                res.sendStatus(400);
            }
        });

        //Delete la requête
        //prend la requête du corps et ajoute la réponse
        app.delete(REQUESTS_URL, (res, req)=>{
            let is_deleted = business.delete_user(req.body);

            if(is_deleted){
                res.sendStatus(200);
            } else{
                res.sendStatus(400);
            }
        });

        app.listen(port, ()=>{
            console.log(`App listening to port ${port}`);
        });
    }
};


/*Exportation comme module */

module.exports={api};