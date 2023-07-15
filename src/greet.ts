import { Person } from "../type";

function greet(name: string = "there", age = NaN) {
  const person: Person = { name, age };
  const ageMsg = Number.isNaN(Number(person.age)) ? "" : ` You're ${person.age} years old!`;
  console.log(`Hello ${person.name}!${ageMsg}`);
}

export default greet;
