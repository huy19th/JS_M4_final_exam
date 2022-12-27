import express from "express";
import EmployeeController from "../controllers/employee.controller";
import multer from 'multer';

let upload = multer()

const router = express.Router();

router.get('/', EmployeeController.showEmployeeList);

router.get('/:branch', EmployeeController.showEmployeeInBranch);

router.get('/add', EmployeeController.showAddForm);

router.post('/add', upload.none(), EmployeeController.addEmployee);

router.get('/detail/:id', EmployeeController.showEmployeeDetail);

router.get('/update/:id', EmployeeController.showUpdateForm);

router.post('/update/:id', upload.none(), EmployeeController.updateEmployeeInfo);

router.get('/delete/:id', EmployeeController.deleteEmployee);

export default router;