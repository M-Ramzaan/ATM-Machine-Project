#!/usr/bin/env node
import inquirer from "inquirer";
import { faker } from "@faker-js/faker";
const createAccount = () => {
    let users = [];
    for (let i = 0; i < 5; i++) {
        let user = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(100000000 * Math.random() * 500000000),
            balance: 1000000 * i,
        };
        users.push(user);
    }
    return users;
};
const atmWorking = async (users) => {
    const userRes = await inquirer.prompt({
        type: "number",
        message: "Enter you pin number",
        name: "pin",
    });
    const user = users.find((val) => val.pin === userRes.pin);
    if (user) {
        console.log(`Welcome ${user.name}`);
        atmFunc(user);
    }
    else {
        console.log("Sorry, You entered an invalid pin number.");
    }
};
const atmFunc = async (user) => {
    const ans = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Select your desired option.",
        choices: ["Withdraw Money", "Check Balance", "Exit"],
    });
    if (ans.select === "Withdraw Money") {
        const amount = await inquirer.prompt({
            type: "number",
            message: "Enter amount you want to withdraw.",
            name: "money",
        });
        if (amount.money > user.balance) {
            return console.log("Insufficient Balance");
        }
        if (amount.money > 25000) {
            return console.log("Sorry! You are not allowed to withdraw more than 25000 in one transaction");
        }
        console.log(`Withdraw amount ${amount.money}`);
        console.log(`Balance ${user.balance - amount.money}`);
    }
    if (ans.select === "Check Balance") {
        return console.log(` Thankyou ${user.name} for using this ATM. Your balance is = ${user.balance}`);
    }
    if (ans.select === "Exit") {
        return console.log(` Thankyou ${user.name} for using this ATM.`);
    }
};
const users = createAccount();
atmWorking(users);
