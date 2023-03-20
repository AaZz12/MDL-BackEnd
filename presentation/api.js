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

        //Toutes les requêtes
        app.get(REQUESTS_URL, business.get_all_users);
        app.post(REQUESTS_URL, business.add_user);
        app.put(REQUESTS_URL, business.edit_user);
        app.delete(REQUESTS_URL, business.delete_user);

        app.listen(port, ()=>{
            console.log(`App listening to port ${port}`);
        });
    }
};


/*Exportation comme module */

module.exports={api};