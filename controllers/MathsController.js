const { response } = require('express');
const path = require('path');
const fs = require('fs');
const e = require('express');

module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);

        }
        get() {
            if (this.HttpContext.path.queryString == '?') {
                let helpPath = path.join(process.cwd(), "wwwroot/HelpPages/mathHelp.html");
                let htmlContent = fs.readFileSync(helpPath);
                this.HttpContext.response.content("text/html", htmlContent);
            }
            else {
                if (this.HttpContext.path.params.op) {
                    this.HttpContext = convertToNumber(this.HttpContext);
                    if (this.HttpContext.path.params.z){
                        this.HttpContext.path.params.error = "Parameter 'z' is not necessary or useless.";
                        this.HttpContext.response.JSON(this.HttpContext.path.params); 
                    }
                    switch (this.HttpContext.path.params.op) {
                        case " " || "+":
                            if (this.HttpContext.path.params.x && this.HttpContext.path.params.y)
                            {
                                this.HttpContext.path.params.value = this.HttpContext.path.params.x + this.HttpContext.path.params.y;
                                if (this.HttpContext.path.params.op == " ")
                                    this.HttpContext.path.params.op = "+";
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            else
                            {
                                this.HttpContext.path.params.error = "Parameter 'x' or 'y' don't exist...";
                                this.HttpContext.response.JSON(this.HttpContext.path.params); 
                            }
                            
                            break;
                        case "-":
                            if (this.HttpContext.path.params.x && this.HttpContext.path.params.y)
                            {
                                this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) - parseInt(this.HttpContext.path.params.y);
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            else
                            {
                                this.HttpContext.path.params.error = "Parameter 'x' or 'y' don't exist...";
                                this.HttpContext.response.JSON(this.HttpContext.path.params); 
                            }
                            break;
                        case "*":
                            if (this.HttpContext.path.params.x && this.HttpContext.path.params.y)
                            {
                                this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) * parseInt(this.HttpContext.path.params.y);
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            else
                            {
                                this.HttpContext.path.params.error = "Parameter 'x' or 'y' don't exist...";
                                this.HttpContext.response.JSON(this.HttpContext.path.params); 
                            }                         
                            break;
                        case "/":
                            if (this.HttpContext.path.params.x && this.HttpContext.path.params.y)
                            {
                                if (this.HttpContext.path.params.y == 0 || this.HttpContext.path.params.y == "0")
                                {
                                    this.HttpContext.path.params.value = "Unlimited";
                                }
                                else
                                {
                                    this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) / parseInt(this.HttpContext.path.params.y);
                                }
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            else
                            {
                                if (this.HttpContext.path.params.y == 0 || this.HttpContext.path.params.y == "0")
                                {
                                    this.HttpContext.path.params.error = "Divide by 0?";
                                    this.HttpContext.path.params.value = "Undefined";
                                }
                                else
                                {
                                    this.HttpContext.path.params.error = "Parameter 'x' or 'y' don't exist...";
                                }
                                this.HttpContext.response.JSON(this.HttpContext.path.params); 
                            }  
                            break;
                        case "%":
                            if (this.HttpContext.path.params.x && this.HttpContext.path.params.y)
                            {
                                this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) % parseInt(this.HttpContext.path.params.y);     
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            else
                            {
                                if (this.HttpContext.path.params.y == 0 || this.HttpContext.path.params.y == "0")
                                {
                                    this.HttpContext.path.params.error = "Divide by 0?";
                                    this.HttpContext.path.params.value = "Undefined";
                                }
                                else
                                {
                                    this.HttpContext.path.params.error = "Parameter 'x' or 'y' don't exist...";
                                }
                                this.HttpContext.response.JSON(this.HttpContext.path.params); 
                            } 
                            break;
                        case "!":
                            if (this.HttpContext.path.params.n) {
                                if (isPositiveNumber(parseInt(this.HttpContext.path.params.n))) {
                                    this.HttpContext.path.params.value = factorial(parseInt(this.HttpContext.path.params.n));
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                                else {
                                    this.HttpContext.path.params.error = "Negative number detected.";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                            }
                            else {
                                this.HttpContext.path.params.error = "Parameter 'n' don't exist...";
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }

                            break;
                        case "p":
                            if (this.HttpContext.path.params.n) {
                                if (isPositiveNumber(parseInt(this.HttpContext.path.params.n))) {
                                    this.HttpContext.path.params.value = isPrime(parseInt(this.HttpContext.path.params.n));
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                                else {
                                    this.HttpContext.path.params.error = "Negative number detected.";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                            }
                            else {
                                this.HttpContext.path.params.error = "Parameter 'n' don't exist...";
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            break;
                        case "np":
                            if (this.HttpContext.path.params.n) {
                                if (isPositiveNumber(parseInt(this.HttpContext.path.params.n))) {
                                    this.HttpContext.path.params.value = findPrime(parseInt(this.HttpContext.path.params.n));
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                                else {
                                    this.HttpContext.path.params.error = "Negative number detected.";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                            }
                            else {
                                this.HttpContext.path.params.error = "Parameter 'n' don't exist...";
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            break;
                        default:
                            this.HttpContext.path.params.error = "The parameter 'op' don't contain a valid operator. The valids operators are: +, -, *, /, %, !, p and op";
                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                    }
                }
                else {
                    this.HttpContext.path.params.error = "Parameter 'op' don't exist...";
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                }
            }



        }
    }

function isPositiveNumber(n) {
    return n > 0;
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
function isPrime(value) {
    for (var i = 2; i < value; i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return value > 1;
}
function findPrime(n) {
    let primeNumer = 0;
    for (let i = 0; i < n; i++) {
        primeNumer++;
        while (!isPrime(primeNumer)) {
            primeNumer++;
        }
    }
    return primeNumer;
}
function convertToNumber(HttpContext) {
    if (HttpContext.path.params.op == "+" || HttpContext.path.params.op == "-" || HttpContext.path.params.op == "/" || HttpContext.path.params.op == "*" || HttpContext.path.params.op == "%" || HttpContext.path.params.op == " ") {
        HttpContext.path.params.x = parseFloat(HttpContext.path.params.x);
        HttpContext.path.params.y = parseFloat(HttpContext.path.params.y);
    }
    else if (HttpContext.path.params.op == "!" || HttpContext.path.params.op == "op" || HttpContext.path.params.op == "p") {
        HttpContext.path.params.n = parseFloat(HttpContext.path.params.n);
    }
    return HttpContext;
}