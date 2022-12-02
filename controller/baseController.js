const fs = require('fs');
const qs = require('qs');

class baseController {
    static readFile(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf-8', (err, data) => {
                if (err) throw err;
                resolve(data);
            })
        })
    }
    
    static parsePath(path) {
        let controllers = ['student'];
        let controller = controllers.filter(item => {
            return path.indexOf(item) !== -1;
        })[0];
        if (controller) {
            let action = controller.length == path.length ? 'view' : path.replace(`${controller}/`, '');
        return {'controller': controller, 'action': action};
        } else return {'controller': 'notFound', 'action': 'view'};
    }
}

module.exports = baseController;
