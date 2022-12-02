const BaseController = require('./baseController.js');
const StudentModel = require('../model/studentModel.js');
const qs = require('qs');
const url = require('url');
const navbar = require('../view/navbar.js');

class Student extends BaseController {
    static view = async (req, res, status) => {
        let dataHTML = await this.readFile('./view/index.html');
        let studentHTML = '';
        let students = await StudentModel.getStudents();
        students.forEach((item, index) => {
            studentHTML +=
            `<tr>
                <td class="text-center"> ${index + 1} </td>
                <td class="text-center"> ${item.name} </td>
                <td class="text-center"> ${item.class} </td>
                <td class="text-center"> ${item.assess} </td>
                <td>
                    <a href="student/edit?id=${item.id}">
                        <button type="button" class="btn btn-success">
                            Sửa
                        </button>
                    </a>
                    <a href="student/delete?id=${item.id}" onclick="return confirm('Are you sure ?')">
                        <button type="button" class="btn btn-danger">
                            Xóa
                    </button>
                    </a>
                </td>
            </tr>`
        });
        res.writeHead(200, 'Content-Type', 'text/html');
        dataHTML = dataHTML.replace('<tbody></tbody>', studentHTML);
        dataHTML = dataHTML.replace('<nav></nav>', navbar);
        res.write(dataHTML);
        res.end();
    }

    static delete = async (req, res) => {
        let data = url.parse(req.url).query;
        let id = qs.parse(data).id;
        StudentModel.deleteStudent(id);
        res.writeHead(301, { Location: '/student' });
        res.end();
    }

    static add = async (req, res) => {
        if (req.method == "GET") {
            let dataHTML = await this.readFile('./view/add.html');
            dataHTML = dataHTML.replace('<nav></nav>', navbar);
            res.write(dataHTML);
            res.end();
        }
        else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            });
            req.on('end', () => {
                let student = qs.parse(data);
                console.log(student);
                StudentModel.addStudent(student.name, student.class, student.scorePractice, student.scoreTheory, student.assess, student.description);
                res.writeHead(301, { Location: '/student' });
                res.end();
            });
        }
    }

    static edit = async (req, res) => {
        let id = qs.parse(url.parse(req.url).query).id;
        if (req.method == "GET") {
            let student = (await StudentModel.getStudentByID(id))[0];
            let dataHTML = await this.readFile('./view/edit.html');
            dataHTML = dataHTML.replace('<nav></nav>', navbar);
            dataHTML = dataHTML.replace('valueName', `value="${student.name}"`);
            dataHTML = dataHTML.replace(`value="${student.class}"`, `value="${student.class}" selected`);
            dataHTML = dataHTML.replace('valueScorePractice', `value="${student.scorePractice}"`);
            dataHTML = dataHTML.replace('valueScoreTheory', `value="${student.scoreTheory}"`);
            dataHTML = dataHTML.replace(`value="${student.assess}"`, `value="${student.assess}" selected`);
            dataHTML = dataHTML.replace('valueDescription', `value="${student.description}"`);
            res.writeHead(200, 'Content-Type', 'text/html');
            res.write(dataHTML);
            res.end();
        }
        else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            });
            req.on('end', () => {
                let student = qs.parse(data);
                console.log(student);
                StudentModel.updateStudentInfo(id , student.name, student.class, student.scorePractice, student.scoreTheory, student.assess, student.description);
                res.writeHead(301, { Location: '/student' });
                res.end();
            });
        }

    }

}

module.exports = Student;