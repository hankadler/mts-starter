import { Person } from "../types";

function greet(name: string = "there", age = NaN) {
  const person: Person = { name, age };
  const ageMsg = Number.isNaN(Number(age)) ? "" : ` You're ${age} years old!`;
  console.log(`Hello ${name}!${ageMsg}`);
}

export default greet;
