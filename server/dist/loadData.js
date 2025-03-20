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
exports.getData = getData;
const branch_1 = require("./models/branch");
const fs = require('fs');
const csv = require('csv-parser');
const { Headquarter } = require('./models/headquarter');
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const headquarters = [];
            const branches = [];
            fs.createReadStream('./data.csv')
                .pipe(csv())
                .on('data', (row) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (row['SWIFT CODE'] && row['SWIFT CODE'].endsWith('XXX')) {
                        const h = new Headquarter({
                            address: row['ADDRESS'],
                            bankName: row['NAME'],
                            countryISO2: row['COUNTRY ISO2 CODE'],
                            countryName: row['COUNTRY NAME'],
                            isHeadquarter: true,
                            swiftCode: row['SWIFT CODE'],
                            branches: []
                        });
                        headquarters.push(h);
                    }
                    else {
                        const branch = new branch_1.Branch({
                            address: row['ADDRESS'],
                            bankName: row['NAME'],
                            countryISO2: row['COUNTRY ISO2 CODE'],
                            countryName: row['COUNTRY NAME'],
                            isHeadquarter: false,
                            swiftCode: row['SWIFT CODE'],
                        });
                        branches.push(branch);
                    }
                }
                catch (error) {
                    console.error('Błąd zapisu:', error);
                }
            }))
                .on('end', () => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    for (const h of headquarters) {
                        yield h.save();
                        console.log('Saved Headquarter:', h);
                    }
                    for (const branch of branches) {
                        yield branch.save();
                        const h = yield Headquarter.findOne({
                            swiftCode: ((_a = branch.swiftCode) === null || _a === void 0 ? void 0 : _a.slice(0, 8)) + "XXX"
                        });
                        if (h) {
                            if (!h.branches.includes(branch._id)) {
                                h.branches.push(branch._id);
                                yield h.save();
                                console.log('Added Branch to Headquarter:', branch);
                            }
                        }
                    }
                    console.log('CSV file successfully processed');
                    resolve();
                }
                catch (error) {
                    reject(error);
                }
            }))
                .on('error', reject);
        });
    });
}
