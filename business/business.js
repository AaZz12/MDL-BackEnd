/*Importation des modules*/
const express = require("express");
const data = require("../data/data");
//utilisation de regex101
const user_checker = {
    first: /^[A-Za-z-]+$/,
    last:/^[A-Za-z-]+$/,
    email:/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,4}$/,
    company:/^[A-Za-z- ]+$/,
    country:/^[A-Za-z- ]+$/
};

const are_array_equals = (a, b) => JSON.stringify(a) == JSON.stringify(b);
/*Fonctions exportées*/
const business_public = {
    /**
     * Get all users from database
     * @returns {users[]} All users from database
     */
    get_all_users : ()=> data.get_all_users(),
    add_user : user =>{
        //on regarde si le user est valide
        if(!are_array_equals(Object.keys(user),Object.keys(user_checker))){
            return false;
        }
        let is_valid_user = Object.keys(user)
            .reduce(
                (acc, key) => (user[key].match(user_checker[key])!=null)&& acc,
                true
            );
        
        
        return data.add_user(user);
    },
    edit_user : ()=>{

    },
    delete_user : ()=>{

    }

    
};


/*Exportation comme module */

module.exports = business_public;