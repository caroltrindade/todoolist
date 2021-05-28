const mysql = require('mysql');

module.exports = class Connection {
    constructor(){
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'projects-user',
            password: 'p@ss0wrd',
            database: '',
        });
    }

    openConnection() {
        this.connection.connect((err) => {
            if (err) {
                console.log('Erro connecting to database...', err)
                throw err;
            }
            console.log('Connection established!')
        })
    };

    closeConnection() {
        this.connection.end((err) => {
            if(err) {
                console.log('Erro to finish connection...', err)
                throw err;
            }
            console.log('The connection was finish...')
        })
    };

    createDatabase() {
        try {
            openConnection();

            this.connection.query('CREATE DATABASE IF NOT EXISTS todolist;', (err, rows) => {
                console.log('err: ', err, '\n\n');
            });

            this.connection.query('USE todolist;', (err, rows) => {
                console.log('err: ', err, '\n\n');
            });

            this.connection.query('\
            CREATE TABLE IF NOT EXISTS Task (\
                task_id  INT  AUTO_INCREMENT  PRIMARY KEY,\
                task_description VARCHAR(300)  NOT NULL,\
                responsible_name VARCHAR(200)  NOT NULL,\
                responsible_email VARCHAR(100)  NOT NULL,\
                status_isFinished BOOLEAN  NOT NULL,\
                status_backCount INT\
            );', (err, rows) => {
                console.log('err: ', err, '\n\n');
            });
        } catch (error) {
            throw error;
        } finally {
            closeConnection();
        }
    };

    insertTask(task) {
        try {
            this.openConnection();

            this.connection.query('\
            INSERT INTO todolist.Task\
                (task_description, responsible_name, responsible_email, status_isFinished, status_backCount)\
            VALUES (?, ?, ?, ?, ?);\
            ', [task.description, task.responsibleName, task.responsibleEmail, task.isFinished, task.backCount], (err, rows) => {
                console.log('err: ', err, '\n\n');
            });
        } catch (error) {
            throw error;
        } finally {
            this.closeConnection();
        }
    };

    updateTask(task) {
        try {
            openConnection();

            this.connection.query('\
            UPDATE todolist.Task\
                SET task_description = ?, responsible_name = ?, responsible_email = ?, status_isFinished = ?, status_backCount = ?\
            WHERE task_id = ?;\
            ', [task.description, task.responsibleName, task.responsibleEmail, task.isFinished, task.backCount, task.id], (err, rows) => {
                console.log('err: ', err, '\n\n');
            });
        } catch (error) {
            throw error;
        } finally {
            closeConnection();
        }
    };

    deleteTask(task) {
        try {
            openConnection();

            this.connection.query('DELETE FROM todolist.Task WHERE task_id = ?;', [task.id], (err, rows) => {
                console.log('err: ', err, '\n\n');
            });
        } catch (error) {
            throw error;
        } finally {
            closeConnection();
        }
    };

    getTask(task) {
        try {
            openConnection();

            this.connection.query('\
            SELECT\
                task_id AS id,\
                task_description AS description,\
                responsible_name AS responsibleName,\
                responsible_email AS responsibleEmail,\
                status_isFinished AS isFinished,\
                status_backCount AS backCount\
            FROM todolist.Task\
            WHERE task_id = ?;\
            ', [task.id], (err, rows) => {
                console.log('err: ', err, '\n\n');
            });
        } catch (error) {
            throw error;
        } finally {
            closeConnection();
        }
    };

    listTasks() {
        try {
            openConnection();

            this.connection.query('\
            SELECT\
                task_id AS id,\
                task_description AS description,\
                responsible_name AS responsibleName,\
                responsible_email AS responsibleEmail,\
                status_isFinished AS isFinished,\
                status_backCount AS backCount\
            FROM todolist.Task\
            ', (err, rows) => {
                console.log('err: ', err, '\n\n');
            });
        } catch (error) {
            throw error;
        } finally {
            closeConnection();
        }
    };
    // createDatabase();
}