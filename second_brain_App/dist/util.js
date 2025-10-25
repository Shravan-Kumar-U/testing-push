"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomGen = void 0;
const randomGen = (len) => {
    let options = 'abcdefghijkklmnopqrstuvwxyz1234567890';
    let ans = "";
    let length = options.length;
    for (let i = 0; i < len; i++) {
        ans += options[Math.floor(Math.random() * length)];
    }
    return ans;
};
exports.randomGen = randomGen;
