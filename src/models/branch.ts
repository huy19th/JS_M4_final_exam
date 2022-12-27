import {Schema, model} from 'mongoose';

const BranchSchema = new Schema ({
    name: String
});

const Branch = model('Branch', BranchSchema);

export default Branch;