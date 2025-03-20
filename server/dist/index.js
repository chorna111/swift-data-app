"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const loadData_1 = require("./loadData");
const { Headquarter, validate } = require('./models/headquarter');
const { Branch } = require('./models/branch');
const express = require('express');
const config = require('../config.js');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
mongoose.connect(config.db_uri)
    .then(() => console.log('Connected to Mongodb'));
app.use(express.json());
app.listen(port, () => console.log('server started'));
app.get('/load-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, loadData_1.getData)();
        res.json({ status: 'success' });
    }
    catch (error) {
        res.status(500).json({ status: "error", message: "Błąd ładowania danych" });
    }
}));
app.get('/v1/swift-codes/:swiftcode', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headquarter = yield Headquarter.findOne({ swiftCode: req.params.swiftcode })
            .select('-_id')
            .populate('branches', 'address bankName countryISO2 isHeadquarter swiftCode -_id');
        if (headquarter) {
            return res.status(200).send(headquarter);
        }
        else {
            const branch = yield Branch.findOne({ swiftCode: req.params.swiftcode });
            if (branch)
                return res.status(200).send(branch);
        }
    }
    catch (err) {
        res.status(500).send('getting data failed,ensure swift code is correct');
    }
}));
app.get('/v1/swift-codes/country/:countryISO2code', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headquarters = yield Headquarter.find({ countryISO2: req.params.countryISO2code });
        const branches = yield Branch.find({ countryISO2: req.params.countryISO2code });
        const countryName = headquarters[0].countryName;
        const codes = [
            ...headquarters.map((h) => ({
                address: h.address,
                bankName: h.bankName,
                countryISO2: h.countryISO2,
                isHeadquarter: h.isHeadquarter,
                swiftCode: h.swiftCode
            })),
            ...branches.map((b) => ({
                address: b.address,
                bankName: b.bankName,
                countryISO2: b.countryISO2,
                isHeadquarter: b.isHeadquarter,
                swiftCode: b.swiftCode
            }))
        ];
        const result = {
            countryISO2: req.params.countryISO2code,
            countryName: countryName,
            swiftCodes: codes
        };
        return res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send('getting data failed,ensure isowcode is correct');
    }
}));
app.post('/v1/swift-codes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const code = yield Headquarter.findOne({ swiftCode: req.body.swiftCode });
    if (code) {
        return res.send('this code already exists');
    }
    else {
        try {
            if (req.body.isHeadquarter == true) {
                let n = new Headquarter({
                    address: req.body.address,
                    bankName: req.body.bankName,
                    countryISO2: req.body.countryISO2,
                    countryName: req.body.countryName,
                    isHeadquarter: req.body.isHeadquarter,
                    swiftCode: req.body.swiftCode,
                });
                n = yield n.save();
                res.send("Headquarter successfully added");
            }
            else {
                let b = new Branch({
                    address: req.body.address,
                    bankName: req.body.bankName,
                    countryISO2: req.body.countryISO2,
                    countryName: req.body.countryName,
                    isHeadquarter: req.body.isHeadquarter,
                    swiftCode: req.body.swiftCode,
                });
                b = yield b.save();
                res.send("Branch successfully added");
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}));
app.delete('/v1/swift-codes/:swiftcode', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(req.params.swiftcode.length === 11 && typeof req.params.swiftcode === 'string')) {
        res.send('code you provided is incorrect');
    }
    try {
        const deletedHeadquarter = yield Headquarter.findOneAndDelete({ swiftCode: req.params.swiftcode });
        if (deletedHeadquarter) {
            res.send('Headquarter deleted successfully');
        }
        else {
            const deletedBranch = yield Branch.findOneAndDelete({ swiftCode: req.params.swiftcode });
            if (deletedBranch) {
                res.send('Branch deleted successfully');
            }
            else {
                res.send('oops, something went wrong, probably swift code was already deleted');
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}));
