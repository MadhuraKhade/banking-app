const Account = require("./Account")
const Bank = require("./Bank")

class Customer{
    static id=0
    static allCustomers= []
    static allbanks=[]
    constructor(firstName,lastName,isAdmin){
        this.firstName=firstName
        this.lastName=lastName
        this.isAdmin=isAdmin
        this.id= Customer.id++
        this.accounts=[]

    }
    static newAdmin(firstName,lastName){
        try {
            if(typeof firstName != "string"){
                throw new Error("Invalid name")
            }
            if(typeof lastName != "string"){
                throw new Error("Invalid name")
            }
            return new Customer(firstName,lastName,true)
        } catch (error) {
            console.log(error.message)
        }
    }
    newCustomer(firstName,lastName){
        try {
            if(!this.isAdmin){
                throw new Error("Only admin can create")
            }
            if(typeof firstName != "string"){
                throw new Error("Invalid name")
            }
            if(typeof lastName != "string"){
                throw new Error("Invalid name")
            }
            let newCustomer = new Customer(firstName,lastName,false)
            Customer.allCustomers.push(newCustomer)
            return newCustomer
        } catch (error) {
            console.log(error.message)
        }
    }
    getAllCustomer(){
        try {
            if(!this.isAdmin){
                throw new Error("Only admin can read")
            }
            return Customer.allCustomers
        } catch (error) {
            console.log(error.message)
        }
    }
    #updateFirstName(updatedValue){
        if(typeof updatedValue!= "string"){
            throw new Error("Invalid input")
        }
        this.firstName = updatedValue
    }
    #updateLastName(updatedValue){
        if(typeof updatedValue!= "string"){
            throw new Error("Invalid input")
        }
        this.lastName = updatedValue
    }
    static #findCustomer(customerId){
        for (let index = 0; index < Customer.allCustomers.length; index++) {
            if(Customer.allCustomers[index].id == customerId){
                return [Customer.allCustomers[index], index]
            }
        }return [null,-1]
    }
    updateCustomer(parameter,updatedValue,customerId){
        try {
            if(!this.isAdmin){
                throw new Error("Only admin can update")
            }
            let customerToBeUpdated = Customer.#findCustomer(customerId)
            if(customerToBeUpdated == null){
                throw new Error("Customer not found")
            }
            switch(parameter){
                case 'firstName': this.#updateFirstName(updatedValue)
                break
                case 'lastName': this.#updateLastName(updatedValue)
                break
                default: throw new Error("Invalid parameter")
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    deleteCustomer(customerId){
        try {
            if(!this.isAdmin){
                throw new Error("Only admin can update")
            }
            let [customerToBeDeleted, indexOfCustomerToBeDeleted] = Customer.#findCustomer(customerId)
            if(customerToBeDeleted == null){
                throw new Error("Customer not found")
            }
            Customer.allCustomers.splice(indexOfCustomerToBeDeleted)
            return "Customer deleted successfully"

        } catch (error) {
            console.log(error.message)
        }
    }
    createBank(fullName) {
        try {
            if (!this.isAdmin) {
                throw new Error("Only Admin can create");
            }
            if (typeof fullName != "string") {
                throw new Error("Invalid name");
            }
            let newBank = Bank.newBank(fullName);
            Customer.allbanks.push(newBank);
            return newBank;
        } catch (error) {
            console.log(error.message);
        }
    }
    getAllBanks(){
        try {
            if(!this.isAdmin){
                throw new Error("Only Admin can read")
            }
            return Customer.allbanks
        } catch (error) {
            console.log(error.message)
        }
    }
    #findBank(bankId){
        for (let index = 0; index < Customer.allbanks.length; index++) {
            if(Customer.allbanks[index].id == bankId){
                return [Customer.allbanks[index], index]
            }
        }return [null, -1]
    }
    updateBank(parameter,newValue,bankId){
        try {
            if(!this.isAdmin){
                throw new Error("Only Admin can update")
            }
            let [bankToBeUpdated , indexOfBankTobeUpdated]= this.#findBank(bankId)
            if(bankToBeUpdated == null){
                throw new Error("Bank not found")
            }
            bankToBeUpdated.updateBank(parameter,newValue)
        } catch (error) {
            console.log(error.message)
        }
    }
    deleteBank(bankId){
        try {
            if(!this.isAdmin){
                throw new Error("Only Admin can update")
            }
            if(bankId < 0 || typeof bankId != "number"){
                throw new Error("Invalid input")
            }
            let[bankToBeDeleted, indexOfBankToBeDeleted]= this.#findBank(bankId)
            if(bankToBeDeleted == null){
                throw new Error("Bank not found")
            }
            Customer.allbanks.splice(indexOfBankToBeDeleted,1)
            return "Bank deleted successfully"
        } catch (error) {
            console.log(error.message)
        }
    }
    createAccount(bankId,balance){
        try {
            if(this.isAdmin){
                throw new Error("Admin cannot create an account")
            }
            if(typeof balance!="number"){
                throw new Error("Invalid balance")
            }
            if(typeof bankId != "number"){
                throw new Error("Invalid Id")
            }
            let newAccount = new Account(balance)
            this.accounts.push(newAccount)
            // let bankToBeUpdated = this.#findBank(bankId)
            // if(bankToBeUpdated){
            //     bankToBeUpdated.accounts.push(newAccount)
            // }
            // else{
            //     throw new Error("Bank not found")
            // }
            return newAccount
        } catch (error) {
            console.log(error.message)
        }
    }
    getAllAccount(){
        try {
            if(this.isAdmin){
                throw new Error("Admin cannot read an account")
            }
            return this.accounts
        } catch (error) {
            console.log(error.message)
        }
    }
    findAccount(accountId){
        try {
            if(this.isAdmin){
                throw new Error("Admin cannot access")
            }
            if(typeof accountId != "number"){
                throw new Error("Invalid Id")
            }
            for (let index = 0; index < this.accounts.length; index++) {
                if(this.accounts[index].id == accountId){
                    return [this.accounts[index], index]
                } 
            }return [null, -1]
        } catch (error) {
            console.log(error.message)
        }
    }
    deleteAccount(accountId){
        try {
            if(this.isAdmin){
                throw new Error("Admin cannot access")
            }
            if(typeof accountId!= "number"){
                throw new Error("Invalid Id")
            }
            let [accountToBeDeleted, indexOfAccountToBeDeleted] = this.findAccount(accountId)
            accountToBeDeleted.splice(indexOfAccountToBeDeleted)
            return "Account deleted successfully"
        } catch (error) {
            console.log(error.message)
        }
    }
    deposit(accountId,amount){
        try {
            if(this.isAdmin){
                throw new Error("Admin cannot access")
            }
            if(typeof accountId != "number"){
                throw new Error("Invalid Id")
            }
            if(typeof amount != "number"){
                throw new Error("Invalid amount")
            }
            let indexOfAccount = this.findAccount(accountId)
            this.accounts[indexOfAccount].deposit(amount)
            return 
        } catch (error) {
            console.log(error.message)
        }
    }
    withdraw(accountId,amount){
        try {
            if(this.isAdmin){
                throw new Error("Admin cannot access")
            }
            if(typeof accountId != "number"){
                throw new Error("Invalid Id")
            }
            if(typeof amount != "number"){
                throw new Error("Invalid amount")
            }
            let indexOfAccount = this.findAccount(accountId)
            this.accounts[indexOfAccount].withdraw(amount)
            return 
        } catch (error) {
            console.log(error.message)
        }
    }
    findReceiverAccount(obj,accountId){
        try {
            if(this.isAdmin){
                throw new Error("Admin cannot access")
            }
            if(typeof accountId != "number"){
                throw new Error("Invalid Id")
            }
            for (let index = 0; index < obj.accounts.length; index++) {
                if(accountId == obj.accounts[index].id){
                    return index
                }
                throw new Error("receiver account not found")
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    transfer(selfAccountId, receiverCustomerId, receiverAccountId, amount) {
        try {
            if (this.isAdmin) {
                throw new Error("Admin cannot transfer amount");
            }
            let [receiverCustomer , receiverCustomerIndex] = Customer.#findCustomer(receiverCustomerId)
            if(!receiverCustomer){
                throw new Error("Receiver customer not found")
            }
            let senderAccountIndex = this.findAccount(selfAccountId)
            let receiverAccountIndex = receiverCustomer.findAccount(receiverAccountId)
            if(senderAccountIndex == -1 || receiverAccountIndex == -1){
                throw new Error("Invalid account Id")
            }
            let selfAccount = this.accounts[senderAccountIndex]
            let receiverAccount = receiverCustomer.accounts[receiverAccountIndex]
            selfAccount.transfer(receiverAccount,amount)
            return this.accounts
        } catch (error) {
            console.log(error.message);
        }
    }

}
module.exports = Customer