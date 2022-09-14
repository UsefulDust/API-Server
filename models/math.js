const Model = require('./model');
module.exports =
    class Maths extends Model {
        constructor(op ,x, y, n) {
            super();
            this.Op = op !== undefined ? op : "";
            this.X = x !== undefined ? x : "";
            this.Y = y !== undefined ? y : "";
            this.N = n !== undefined ? n : "";

            this.addValidator("Op", "string")
        }
    }