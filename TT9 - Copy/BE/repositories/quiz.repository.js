const { pool } = require('../db/db');
const { getLoggedInUserId } = require('../controller/usersession');

async function add_quiz(req, res) {
    try {
        const userId = getLoggedInUserId();
        if (!userId) {
            return res.status(401).send('User not logged in');
        }

        const { title } = req.body;
        console.log(userId);

        await pool.query('INSERT INTO QUIZZES (TITLE, CREATOR_ID) VALUES ($1, $2)', [title, userId]);
        res.status(200).send(req.body);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

async function get_user_quiz(req,res){
    try{
        const userId = getLoggedInUserId();
    if (!userId) {
        return res.status(401).send('User not logged in');
    }
    await pool.query('SELECT * FROM QUIZZES WHERE CREATOR_ID = $1', [userId]);
     res.status(200).send(req.body);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {add_quiz, get_user_quiz};
