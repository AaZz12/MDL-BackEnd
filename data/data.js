
/**
 * @typedef {Object} user
 * @property {string} first Prenom  
 * @property {string} last Nom
 * @property {string} email Mail
 * @property {string} company Societe
 * @property {string} country Pays
 * @property {number?} id  id
 * @property {string?} created_at date
 */

/*Importation des modules*/
const fs = require("fs");
const { get } = require("http");

//Constantes de la base de donnée
const DATABASE = __dirname + "/bdd.json";

//Utilitaires
/**
 * Renvoie le dernier id de la bdd
 * @param {user[]} users Tableau utilisateurs
 * @returns {number} Le dernier id des utilisateurs
 */
const get_last_index = users => Math.max(...users.map(user => user.id), 0);

/**
 * 
 * @returns {user[]} tableau d'utilisateurs
 */
const read_database_file = () => JSON.parse(fs.readFileSync(DATABASE, "utf8"));

/**
 * Ecrit les utilisateurs dans la bdd
 * @param {user[]} users tableau d'utilisateurs
 */
const write_database_file = users => fs.writeFileSync(DATABASE, JSON.stringify(users), "utf8");

//Fonctions publiques

const data_public = {
    /**
     * Prend tout les utilisateurs de la bdd
     * @returns {User[]} Tableau de tous les utilisateurs
     */
    get_all_users: () => read_database_file(),

    /**Ajouter un utilisateur et verifie qu'il est bien ajoute
     * @param {user} User l'utilisateur qu'on va ajouter à la bdd
     * @returns {Boolean} est-ce que l'utilisateur est ajouté ?
     */
    add_user: user => {
        let users;

        // lis les utilisateurs et renvoie faux  s'il n'y arrive pas
        try{
            users = read_database_file();
        } catch {
            console.error("Couldn't read from database");
            return false;
        }
        user.id = get_last_index(users) + 1;
        user.created_at = new Date().toUTCString();

        //ajoute l'utilisateur
        users.push(user);

        // écris les utilisateurs et renvoie faux s'il n'y arrive pas
        try{
            write_database_file(users);
        } catch {
            console.error("Couldn't write in database");
            return false;
        }

        write_database_file(users);

        return true;
    },

    /**
     * Edit un utilisateur de la bdd
     * @param {{id:number, to_edit : user}} user l'id de l'utilisateur qu'il faut éditer
     * @returns {Boolean} Est-ce que l'utilisateur a été édité ? 
     */
    edit_user: user => {
        let users;

        // lis les utilisateurs et renvoie faux  s'il n'y arrive pas
        try{
            users = read_database_file();
        } catch {
            console.error("Couldn't read from database");
            return false;
        }

        // récup l'indice de l'utilisateur à modif
        let user_index = -1;
        for(let i = 0 ; i < users.length; i++)
        {
            if(users[i].id == user.id)
            {
                user_index = i ;
            }
        
        }

        // Si on trouve pas l'utilisateur
        if(user_index == -1)
        {
            return false;
        }

        // modification de l'utilisateur
        for(let key in user.to_edit)
        {
            users[user_index][key] = user.to_edit[key]
        }

        // écris les utilisateurs et renvoie faux s'il n'y arrive pas
        try{
            write_database_file(users);
        } catch {
            console.error("Couldn't write in database");
            return false;
        }

        return true;

    },


    /**
     * Supprime un utilisateur de la bdd
     * @param {number} id l'id de l'user qu'il faut supprimer
     * @returns {Boolean} Est-ce que l'utilisateur est supprimé ?
     */
    delete_user: id => {
        let users;

        // lis les utilisateurs et renvoie faux s'il n'y arrive pas
        try{
            users = read_database_file();
        } catch {
            console.error("Couldn't read from database");
            return false;
        }
        
        // on check si l'id est dans les utilisateurs
        if(users.map(user => user.id).indexOf(id) == -1){
            return false;
        } 

        //supprime l'utilisateur avec l'id donné
        users = users.filter(user => user.id !== id);
        
        
        //écris les utilisateurs et renvoie faux s'il n'y arrive pas
         try{
            write_database_file(users);
        } catch {
            console.error("Couldn't write in database");
            return false;
        }

        return true;

    }

}

/*Exportation comme module */

module.exports=data_public;