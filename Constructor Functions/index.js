function Car(make, model, year, type, isAvailable = true) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.type = type;
  this.isAvailable = isAvailable;
}

function Customer(name) {
  this.name = name;
  this.rentedCars = [];
}

Customer.prototype.rentCar = function(car) {
  if (car.isAvailable) {
    car.isAvailable = false;
    this.rentedCars.push(car);
    console.log(`${this.name} rented ${car.make} ${car.model}`);
  } else {
    console.log(`${car.make} ${car.model} is already rented.`);
  }
};


function PremiumCustomer(name, discountRate) {
  Customer.call(this, name); 
  this.discountRate = discountRate;
}


PremiumCustomer.prototype = Object.create(Customer.prototype);
PremiumCustomer.prototype.constructor = PremiumCustomer;


function calculateRentalPrice(car, days, isPremium, discountRate = 0) {
  const basePrice = 50;
  let typeMultiplier = 1;

  if (car.type === "SUV") typeMultiplier = 1.5;
  else if (car.type === "Sedan") typeMultiplier = 1.2;

  let total = basePrice * days * typeMultiplier;

  if (isPremium) {
    total -= total * (discountRate / 100);
  }

  return total;
}



Customer.prototype.returnCar = function(car) {
  const index = this.rentedCars.indexOf(car);
  if (index !== -1) {
    console.log(`${this.name} is returning ${car.make} ${car.model}...`);

    setTimeout(() => {
      car.isAvailable = true;
      this.rentedCars.splice(index, 1);
      console.log(`${car.make} ${car.model} has been returned and is now available.`);
    }, 2000);
  } else {
    console.log(`${this.name} has not rented ${car.make} ${car.model}`);
  }
};



function Maintenance(car, delay) {
  console.log(`Maintenance started for ${car.make} ${car.model}`);
  car.isAvailable = false;

  setTimeout(() => {
    car.isAvailable = true;
    console.log(`${car.make} ${car.model} is back from maintenance.`);
  }, delay);
}




const car1 = new Car("Toyota", "Corolla", 2020, "Sedan");
const car2 = new Car("Ford", "Explorer", 2022, "SUV");
const car3 = new Car("Honda", "Civic", 2021, "Sedan");


const regular = new Customer("Alice");
const premium = new PremiumCustomer("Bob", 10);


regular.rentCar(car1);
premium.rentCar(car2);

// Price 
const price1 = calculateRentalPrice.call(null, car2, 3, true, premium.discountRate);
console.log(`Bob pays $${price1} for 3 days of SUV rental.`);


premium.returnCar(car2);

regular.rentCar(car2);

Maintenance(car3, 3000);

// Bind
const bobRent = premium.rentCar.bind(premium, car3);
setTimeout(() => {
  bobRent(); 
}, 4000);

