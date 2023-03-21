
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
const DATABASE = "bdd.json";

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

    edit_user: () => {},

    delete_user: () => {}

}

/*Exportation comme module */

module.exports=data_public;