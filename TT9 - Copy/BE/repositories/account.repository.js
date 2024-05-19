const { pool } = require('../db/db');
const { setLoggedInUserId} = require('../controller/usersession');

async function signup(req, res) {
    const { username, pw, email } = req.body;
    try {
        await pool.query('INSERT INTO USERS (USERNAME, PW, EMAIL) VALUES ($1, $2, $3)', [username, pw, email]);
        res.status(200).send(req.body)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

async function login(req, res) {
    const { username, pw } = req.body;
    console.log(username, pw);
    try {
        const result = await pool.query('SELECT * FROM USERS WHERE USERNAME = $1 AND PW = $2', [username, pw]);
        const rows = result.rows;

        if (rows.length === 0) {
            return res.status(200).send('Username or Password is incorrect');
        }
        const { id } = rows[0];
        setLoggedInUserId(id);
        res.status(200).send(rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { signup, login };