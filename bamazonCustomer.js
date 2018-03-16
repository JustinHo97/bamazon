var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "justinSQL0697",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as: " + connection.threadId +"\r\n");
    checkShop();
})

function checkShop() {
    var choiceArr = [];
    connection.query(
        "select * FROM products", function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                tempObj = {};
                tempObj["name"] = res[i].product_name + ": " + res[i].stock_quantity + " remaining.";
                tempObj["value"] = i;
                choiceArr.push(tempObj);
            }
            promptShop(choiceArr, res);
        }
    );
}

function promptShop(choiceArr, response) {
    var choice;
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to buy?",
            choices: choiceArr,
            name: "product"
        },{
            message: "How many would you like to buy?",
            name: "amount",
            validate: function (name) {
                if (isNaN(name)) {
                    console.log(" That is not a number")
                    return false;
                }
                return true;
            }
        }
    ]).then(function (input) {
        if (input.amount > response[input.product].stock_quantity) {
            console.log(`Sorry, we don't have ${input.amount} ${response[input.product].product_name}. \r\n`);
            checkShop();
        }
        else {
            connection.query(
                `UPDATE products SET stock_quantity=${response[input.product].stock_quantity - input.amount} WHERE item_id=${response[input.product].item_id};`, function (err, res) {
                    if (err) throw err;
                    console.log(`You bought ${input.amount} ${response[input.product].product_name} for $${(input.amount * response[input.product].price).toFixed(2)}\r\n`)
                    checkShop();
                }
            )
        }
    })
}