const Bank = require("./Bank");
const Customer = require("./Customer");
const Account = require("./Account");

let a1 = Customer.newAdmin("Yash","Shah");
let c1 = a1.newCustomer("Madhura", "Khade");
let c2 = a1.newCustomer("Simran", "Patil");
console.log(c1,c1)
let b1 = a1.createBank("Canada Bank");
let b2 = a1.createBank("Bank of India");

let acc1 = c1.createAccount(b1.id, 5000);
let acc2 = c2.createAccount(b1.id, 8000);
console.log(acc1,acc2)
console.log(a1.getAllCustomer())
console.log("Customer accounts: ", c1.getAllAccount());

c1.transfer(0,2,1,500)
console.log("Customer accounts after transfer: ", c1.getAllAccount());
console.log(c2.getAllAccount())

console.log("Bank details: ", a1.getAllBanks());
