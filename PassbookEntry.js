class PassbookEntry {
    constructor(date, time, senderAccount, receiverAccount, status, amount, balance) {
        this.date = date;
        this.time = time;
        this.senderAccount = senderAccount;
        this.receiverAccount = receiverAccount;
        this.status = status;
        this.amount = amount;
        this.balance = balance;
    }
}

module.exports = PassbookEntry
