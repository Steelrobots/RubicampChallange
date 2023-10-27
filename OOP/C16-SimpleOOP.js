class Tyre {
    constructor(brand, size) {
        this.brand = brand
        this.size = size
    }
}

class Car extends Tyre {
    constructor(brand, size, varian, sn, door, seat, tyre, year, warranty) {
        super(brand, size)
        this.varian = varian
        this.sn = sn
        this.door = door
        this.seat = seat
        this.year = year
        this.warranty = warranty
    }

    static serialNumber() {
        const chars = "0987654321qwertyuiopzxcvbnmasdsfdghjkl"
        let serialNum = '', indexRan, charRan
        for (let a = 0; a < 36; a++) {
            indexRan = Math.floor(Math.random() * chars.length);
            charRan = chars.slice(indexRan, indexRan + 1);
            if (a == 8 || a == 13 || a == 18 || a == 23) {
                indexRan = -1
                charRan = "-"
            }
            serialNum += charRan;
        }
        return serialNum;
    }
    // static warranty(){
    //     return Math.floor(Math.random() * 9) ; 
    // }
}
// const SN = new Car();
// console.log(Car.serialNumber())
// const ban = new Tyre("dunlup", "24");
// console.log(ban);

class Agya extends Car { };

class Supra extends Car { };

class CarFactory {
    constructor() {
        this.cars = []
    }
    produce(year) {
        for (let i = 0; i < Math.floor(Math.random() * 6); i++) {
            this.cars.push(new Agya('Pirelli', 15, 'Agya', Car.serialNumber(), 5, 5, 4, year, 3));
        }
        // console.log(this.cars)
        for (let i = 0; i <= Math.floor(Math.random() * 6); i++) {
            this.cars.push(new Supra('Michelin', 18, 'Supra', Car.serialNumber(), 2, 2, 4, year, 6));

        }
    };
    result() {
        console.log("Hasil produksi:");

        this.cars.forEach((car, index) =>
            console.log(`
No. ${index + 1}
varian      : ${car.varian}
sn          : ${car.sn}
door        : ${car.door}
seat        : ${car.seat}
tyre        : ${car.brand} ${car.size} inch
year        : ${car.year}
warranty    : ${car.warranty} year
`)

        )
    }
    guaranteeSimulation(simulationYear) {
        console.log('Hasil simulasi garansi semua mobil pada tahun 2025');
        this.cars.forEach((car, index) =>
            console.log(`
No. ${index + 1}
varian      : ${car.varian}
sn          : ${car.sn}
door        : ${car.door}
seat        : ${car.seat}
tyre        : ${car.brand} ${car.size} inch
year        : ${car.year}
warranty    : ${car.warranty} year

status on ${simulationYear} this guarantee status is ${(car.year + car.warranty >= simulationYear) ? 'active' : 'expired'}`))

    }
}


const toyota = new CarFactory()
toyota.produce(2020)
toyota.produce(2022)
toyota.result()
toyota.guaranteeSimulation(2025)