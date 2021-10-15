const database = require("./database");


/**
 * @typedef {Object} user
 * @property {String} name
 * @property {Number} id
 * @property {String} role
 */

/**
 * Logs user in if username and password match with database
 *
 * @param   {String}  username  
 * @param   {String}  psw       
 *
 * @return  {user}       
 */
module.exports.login = async function(username, psw){
    const answer = await database.getOne("SELECT name, password, id, role FROM user WHERE name = ?", [username, psw]);
    if (!answer) {
        throw({status:404, msg:"Utilisateur non trouvé !"})
    }
    answer.role = answer.role === 1 ? "admin" : "user";
    return answer;
}

/**
 * Signs user up if email and username are unique
 *
 * @param   {String}  username  
 * @param   {String}  psw       user password
 * @param   {String}  email     
 * @param   {Number}  role      0 for user, 1 for admin
 *
 * @return  {String}            confirmation message
 */
module.exports.signup = async function(username, psw, email, role){
    const usedEmail = await database.getOne("SELECT email FROM user WHERE email = ?", [email]);
    if (usedEmail) {
        throw({status: 401, msg:"Adresse mail déjà utilisée."})
    }
    const usedUser = await database.getOne("SELECT name FROM user WHERE name = ?", [username]);
    if (usedUser) {
        throw({status: 401, msg:"Nom d'utilisateur déjà utilisé."})
    }
    const answer = await database.getOne("INSERT INTO user (name, password, email, role) VALUES(?, ?, ?, ?)", [username, psw, email, role]);
    return answer;
}

/**
 * Deletes user if it exists
 *
 * @param   {Number}  id
 *
 */
module.exports.deleteUser = async function(id){
    const userExists = await database.getOne("SELECT * FROM user WHERE id = ?", [id])
    if (!userExists) {
        throw error;
    }
    await database.getOne("DELETE FROM user WHERE id = ?", [id])
}