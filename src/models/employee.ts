import {Schema, model} from 'mongoose';

const EmployeeSchema = new Schema ({
    code: String,
    name: String,
    age: Number,
    salary: Number,
    branch: String
});

const Employee = model('Employee', EmployeeSchema);

export default Employee;