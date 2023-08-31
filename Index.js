const Bank = require("./Bank");
const Customer = require("./Customer");

let a1 = Customer.newAdmin("Yash","Shah")
let c1 = a1.newCustomer("Madhura", "Khade")
let b1 = a1.createBank("Canada Bank")
let b2 = a1.createBank("Bank of India")

let acc1 = c1.createAccount(b1.id,5000)
let acc2 = c1.createAccount(b1.id,2000)
acc1.deposit(2000)
acc1.withdraw(1000)
console.log("Customer accounts : ", c1.getAllAccount())
// console.log(acc1, acc2)
acc1.transfer(acc2,510)
console.log(a1.getAllCustomer())
console.log("Bank details: ", a1.getAllBanks())
console.log("Customer accounts : ", c1.getAllAccount())
// console.log(Customer.allbanks)