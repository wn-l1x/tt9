const { pool } = require('../db/db');
const { getLoggedInUserId} = require('../controller/usersession');

async function add_attempt(req, res) {
    try {
        const currentTime = new Date();
        const userId = getLoggedInUserId();
        if (!userId) {
            return res.status(401).send('User not logged in');
        }
        const { quiz_id, score } = req.body;
        console.log(userId);

        await pool.query('INSERT INTO ATTEMPTS(ATTEMPT_TIME, USER_ID, QUIZ_ID, SCORE) VALUES ($1, $2, $3, $4)', 
        [currentTime, userId, quiz_id, score]);
        res.status(200).send(req.body);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

async function get_user_attempts(req,res){
    const {attempt_id} = req.body;
    try{
        const userId = getLoggedInUserId();
    if (!userId) {
        return res.status(401).send('User not logged in');
    }
    await pool.query('SELECT * FROM ATTEMPTS WHERE ATTEMPT_ID = $1', [attempt_id]);
     res.status(200).send(req.body);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

async function get_attempt_details(req,res){
    const {attempt_id} = req.body;
    try{
        const userId = getLoggedInUserId();
    if (!userId) {
        return res.status(401).send('User not logged in');
    }
    await pool.query('SELECT * FROM ATTEMPT_DETAIL WHERE ATTEMPT_ID = $1', [attempt_id]);
     res.status(200).send(req.body);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

async function add_attempt_details(req,res){
    const {attempt_id, question_id, answer} = req.body;
    try{
        const userId = getLoggedInUserId();
    if (!userId) {
        return res.status(401).send('User not logged in');
    }
    await pool.query('INSERT INTO ATTEMPT_DETAIL() VALUES($1,$2,$3)', [attempt_id,question_id,answer]);
     res.status(200).send(req.body);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {add_attempt, get_user_attempts, get_attempt_details, add_attempt_details};
