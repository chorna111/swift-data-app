"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Branch = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const branchSchema = new mongoose_1.default.Schema({
    address: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    countryISO2: {
        type: String,
        required: true,
        length: 2
    },
    countryName: {
        type: String,
        required: true,
    },
    isHeadquarter: {
        type: Boolean,
        required: true
    },
    swiftCode: {
        type: String,
        required: true,
        length: 11,
    },
});
function validate(branch) {
    const schema = joi_1.default.object({
        address: joi_1.default.string().required(),
        bankName: joi_1.default.string().required(),
        countryISO2: joi_1.default.string().required(),
        countryName: joi_1.default.string().required(),
        isHeadqurter: joi_1.default.bool().required(),
        swiftCode: joi_1.default.string().length(11).required()
    });
    return schema.validate(branch);
}
exports.Branch = mongoose_1.default.model('Branch', branchSchema);
module.exports.branchSchema = branchSchema;
