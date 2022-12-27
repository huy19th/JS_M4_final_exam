import Employee from '../models/employee';
import Branch from '../models/branch';

class EmployeeController {
    static async showEmployeeList (req, res) {
        let employees = await Employee.find().sort({age: 1});
        let branches = await Branch.find();
        res.render('index', {employees: employees, branches: branches});
    }
    static async showEmployeeInBranch (req, res) {
        let branch = req.params.branch;
        let employees = await Employee.find({branch: branch});
        let branches = await Branch.find();
        res.render('index', {employees: employees, branches: branches});
    }
    static async showEmployeeDetail (req, res) {
        let id = req.params.id;
        let employee = await Employee.findOne({_id: id});
        res.render('detail', {employee: employee});
    }
    static async showUpdateForm (req, res) {
        let id = req.params.id;
        let employee = await Employee.findOne({_id: id});
        let branches = await Branch.find();
        res.render('edit', {employee: employee, branches: branches});
    }
    static async updateEmployeeInfo (req, res) {
        let id = req.params.id;
        let employee = await Employee.findOne({_id: id});
        let {code, name, age, salary, branch} = req.body;
        employee.code = code;
        employee.name = name;
        employee.age = age;
        employee.salary = salary;
        employee.branch = branch;
        await employee.save();
        res.redirect('/employee');
    }
    static deleteEmployee (req, res) {
        let id = req.params.id;
        Employee.findOneAndDelete({_id: id}, (err, docs) => {
            if (err) console.log(err);
            else console.log('Delete Sucess');
            res.redirect('/employee');
        });

    }
    static async showAddForm (req, res) {
        let branches = await Branch.find();
        res.render('add', {branches: branches});
    }

    static async addEmployee (req, res) {
        console.log(req.body)
        let employee = new Employee(req.body);
        await employee.save();
        res.redirect('/employee');
    }
}

export default EmployeeController;