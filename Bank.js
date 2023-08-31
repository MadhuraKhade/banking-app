class Bank{
    static id = 0
    constructor(fullName , abbrevieation){
        this.fullName= fullName
        this.id = Bank.id++
        this.abbrevieation = abbrevieation
    }
    static newBank(fullName) {
        if (typeof fullName != "string") {
            throw new Error("Invalid name");
        }
        let abbreviation = Bank.createAbbrevieation(fullName);
        return new Bank(fullName, abbreviation);
    }
    #updateFullName(newValue){
        if(typeof newValue != "string"){
            throw new Error("Invalid name")
        }
        this.fullName = newValue
    }
    #updateAbbrevieation(newValue){
        if(typeof newValue != "string"){
            throw new Error("Invalid name")
        }
        this.abbrevieation = newValue
    }
    updateBank(parameter,newValue){
        switch(parameter){
            case 'fullName': this.#updateFullName(newValue)
            break
            case 'abbrevieation': this.#updateAbbrevieation(newValue)
            break
            default: throw new Error("Invalid parameter")
        }
    }
    static createAbbrevieation(fullName) {
        const strings = fullName.split(" ");
        let abbrevieation = "";
        for (let index = 0; index < strings.length; index++) {
            abbrevieation += strings[index].charAt(0).toUpperCase();
        }
        return abbrevieation;
    }
   
}
module.exports = Bank