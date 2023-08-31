class Account{
    static id = 0
    constructor(balance){
        this.balance = balance
        this.id = Account.id++
        // this.passBook = []
    }
    deposit(amount){
        try {
            if(typeof amount !== "number" && amount <= 0){
                throw new Error("amount not valid")
            }
            this.balance += amount
            return this.balance
            // return "Balance is "+this.balance
        } catch (error) {
            console.log(error.message)
        }
    }
    withdraw(amount){
        try {
            if(typeof amount !== "number" && amount <= 0 || amount > this.balance){
                throw new Error("amount not valid")
            }
            this.balance -= amount
            return this.balance
        } catch (error) {
            console.log(error.message)
        }
    }
    transfer(receiverAccount,amount){
        try {
            if(typeof amount != "number" || amount <= 0 || amount > this.balance){
                throw new Error("Invalid amount for transfer")
            }
            this.balance -= amount
            receiverAccount.deposit(amount)
        } catch (error) {
            console.log(error.message)
        }
    }

}
module.exports = Account