const BaseController = require('./baseController.js');
const StudentController = require('./studentController.js');
const NotFound = require('./notFound.js');

class Router extends BaseController {
    static student = StudentController;
    static notFound = NotFound;
}

module.exports = Router;