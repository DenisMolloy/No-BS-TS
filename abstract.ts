/**
 * VIDEO #18 - Abstract Classes in TS
 */

// abstract class will allow StreetFighter to be used as a template (as every fighter will have a different getSpecialAttack)
// abstract - you can never directly instantiate StreetFighter
abstract class StreetFighter {
    constructor(){}

    move(){}
    fight():void{
        console.log(`${this.name} attacks with ${this.getSpecialAttack()}`)
    }

    // any abstract method means it can't have an implementation in this class but its required
    abstract getSpecialAttack(): string;

    // Abstract Accessors
    abstract get name(): string;
}

// const ryu = new StreetFighter() //ERROR: Cannot create an instance of an abstract class.

/**
 * In order to make use of StreetFighter we have to make a new class that extends StreetFighter
 */

class Ryu extends StreetFighter {
    // ERROR prior to adding getSpecialAttack: Non-abstract class 'Ryu' does not implement inherited abstract member 'getSpecialAttack' from class 'StreetFighter'.
    getSpecialAttack(): string {
        return "HADOKEN!"
    }
    get name(): string{
        return "Ryu"
    }
}
const ryu = new Ryu()
console.log('ryu', ryu.getSpecialAttack()) //ryu HADOKEN!
ryu.fight() //Ryu attacks with HADOKEN!

class ChunLi extends StreetFighter {
    // ERROR prior to adding getSpecialAttack: Non-abstract class 'Ryu' does not implement inherited abstract member 'getSpecialAttack' from class 'StreetFighter'.
    getSpecialAttack(): string {
        return "SPINNING BIRD KICK!"
    }
    get name(): string{
        return "Chun-Li"
    }
}

const chunLi = new ChunLi()
chunLi.fight() //Chun-Li attacks with SPINNING BIRD KICK!