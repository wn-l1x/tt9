const { pool } = require('../db/db');
const { getLoggedInUserId } = require('../controller/usersession');

async function add_question(req, res) {
    const {quiz_id, question, option_a, option_b, option_c, option_d, answer} = req.body;
    try {
        const userId = getLoggedInUserId();
        if (!userId) {
            return res.status(401).send('User not logged in');
        }
        const match = await pool.query('SELECT CREATOR_ID FROM QUIZZES WHERE ID = $1', [quiz_id]);
        if (!match.equals(userId)){
            return res.status(401).send('Unauthorized Acess');
        }
        await pool.query(
            'INSERT INTO QUESTIONS (QUIZ_ID, QUESTION, OPTION_A, OPTION_B, OPTION_C, OPTION_D, ANSWER) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
        [quiz_id, question, option_a, option_b, option_c, option_d, answer]);
        res.status(200).send(req.body);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

async function get_questions(req,res){
    const {quiz_id} = req.params;
    try{
        const userId = getLoggedInUserId();
    if (!userId) {
        return res.status(401).send('User not logged in');
    }
    await pool.query('SELECT * FROM QUESTIONS WHERE QUIZ_ID = $1', [quiz_id]);
     res.status(200).send(req.body);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {add_question, get_questions};