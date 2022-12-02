const Database = require('./database.js');

class StudentModel extends Database {

    static async getStudents() {
        let sql = `select id, name, class, assess from student`;
        let result = await this.run(sql);
        return result;
    }

    static deleteStudent (id) {
        let sql= `delete from student where id = ${id}`;
        this.run(sql);
    }

    static async addStudent (name, clas, scorePractice, scoreTheory, assess, description) {
        let sql = `insert into student (name, class, scorePractice, scoreTheory, assess, description) value ("${name}", "${clas}", ${scorePractice}, ${scoreTheory}, "${assess}", "${description}");`
        await this.run(sql);
    }

    static async getStudentByID (id) {
        let sql =  `select * from student where id = ${id}`;
        let room = await this.run(sql);
        return room;
    }

    static async updateStudentInfo (id, name, clas, scorePractice, scoreTheory, assess, description) {
        let sql = `update student set name = "${name}", class = "${clas}", scorePractice = ${scorePractice}, scoreTheory = ${scoreTheory}, assess = "${assess}", description = "${description}" where ID = ${id}`;
        await this.run(sql);
    }

    static async changeRoomStatus (rID, status) {
        let sql = `update room set status = "${status}" where rID = ${rID}`;
        await this.run(sql);
    }

}

module.exports = StudentModel;