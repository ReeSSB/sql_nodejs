import mysql from "mysql2"
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise()

export async function getNotes(){
    const [rows]= await pool.query(`
    SELECT * 
    FROM notes`)

    return rows
}
// const notes = await getNotes()
// console.log(notes)

export async function getNote(id){
    const [row] = await pool.query(`
    SELECT * 
    FROM notes 
    WHERE id = ?`,
    [id] )

    return row[0]

}
// const note = await getNote(0)
// console.log(note)

export async function createNote(title, contents){
    const [result] = await pool.query(`
    INSERT INTO notes(title,contents)
    VALUES (?, ?)
    `,[title, contents])

    const id = result.insertId
    return getNote(id)
}

// const createResult = await createNote('test Note','Something about test note.')
// console.log(createResult)

