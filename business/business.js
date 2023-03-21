/*Importation des modules*/
const express = require("express");
const data = require("../data/data");

/**
 * @typedef {Object} user
 * @property {string} first
 * @property {string} last
 * @property {string} email
 * @property {string} company
 * @property {string} country
 * @property {number?} id 
 * @property {string?} date 
 */
//utilisation de regex101
const user_checker = {
    first: /^[A-Za-z-]+$/, //prénom
    last:/^[A-Za-z-]+$/, //nom
    email:/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,4}$/, //email
    company:/^[A-Za-z- ]+$/, //entreprise
    country:/^[A-Za-z- ]+$/ //pays
};

/**
 * Check if two arrays are equal 
 * @param {Array} a The first array 
 * @param {Array} b The second array 
 * @returns {Boolean} Are the array equal ?
 */
const are_array_equals = (a, b) => JSON.stringify(a) == JSON.stringify(b);


/**
 * Check if the user is valid
 * @param {user} user The user 
 * @returns {Boolean} is the user valid ?
 */
const is_valid_user = user => {
    //on regarde si le user n'existe pas déjà
    if(!are_array_equals(Object.keys(user),Object.keys(user_checker))){
        return false;
    }

    //on regarde si les paramètres sont valides
    let is_valid_user = Object.keys(user)
        .reduce(
            (acc, key) => (user[key].match(user_checker[key])!=null)&& acc,
            true
        );
    if(!is_valid_user){
        return false;
    }
    return true;
}

/*Fonctions exportées*/
const business_public = {
    /**
     * Get all users from database
     * @returns {user[]} All users from database
     */
    get_all_users : ()=> data.get_all_users(),
    add_user : user =>{
        if(!is_valid_user(user)){
            return false;
        }
        
        return data.add_user(user);
    },
    edit_user : ()=>{

    },
    delete_user : ()=>{

    }

    
};


/*Exportation comme module */

module.exports = business_public;