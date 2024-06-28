import inquirer from 'inquirer';
import chalk from 'chalk';
class Student {
    firstName;
    lastName;
    studentId;
    courses;
    balance;
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.studentId = this.generateStudentId();
        this.courses = [];
        this.balance = 0;
    }
    generateStudentId() {
        return Math.floor(10000 + Math.random() * 90000).toString();
    }
    enroll(course) {
        this.courses.push(course);
        this.balance += 500; // Assume each course costs $500
    }
    viewBalance() {
        return this.balance;
    }
    payTuition(amount) {
        this.balance -= amount;
    }
    showStatus() {
        console.log(chalk.blue(`\nName: ${this.firstName} ${this.lastName}`));
        console.log(chalk.blue(`Student ID: ${this.studentId}`));
        console.log(chalk.blue(`Courses Enrolled: ${this.courses.join(', ')}`));
        console.log(chalk.blue(`Balance: $${this.balance}\n`));
    }
}
async function main() {
    const students = [];
    while (true) {
        console.log(chalk.bgMagentaBright("\n---- Student Management System ----"));
        const { choice } = await inquirer.prompt({
            name: 'choice',
            type: 'list',
            message: 'Choose an action:',
            choices: [
                'Add new student',
                'Enroll in a course',
                'View balance',
                'Pay tuition fees',
                'Show status',
                'Exit'
            ]
        });
        if (choice === 'Add new student') {
            const { firstName, lastName } = await inquirer.prompt([
                { name: 'firstName', type: 'input', message: 'Enter first name:' },
                { name: 'lastName', type: 'input', message: 'Enter last name:' }
            ]);
            const student = new Student(firstName, lastName);
            students.push(student);
            console.log(chalk.yellow(`Student added with ID: ${student['studentId']}`));
        }
        else if (choice === 'Enroll in a course') {
            const { studentId, course } = await inquirer.prompt([
                { name: 'studentId', type: 'input', message: 'Enter student ID:' },
                { name: 'course', type: 'input', message: 'Enter course name:' }
            ]);
            const student = students.find(s => s['studentId'] === studentId);
            if (student) {
                student.enroll(course);
                console.log(chalk.yellow(`Enrolled in ${course}`));
            }
            else {
                console.log(chalk.red("Student not found"));
            }
        }
        else if (choice === 'View balance') {
            const { studentId } = await inquirer.prompt({ name: 'studentId', type: 'input', message: 'Enter student ID:' });
            const student = students.find(s => s['studentId'] === studentId);
            if (student) {
                console.log(chalk.blue(`Balance: $${student.viewBalance()}`));
            }
            else {
                console.log(chalk.red("Student not found"));
            }
        }
        else if (choice === 'Pay tuition fees') {
            const { studentId, amount } = await inquirer.prompt([
                { name: 'studentId', type: 'input', message: 'Enter student ID:' },
                { name: 'amount', type: 'input', message: 'Enter amount to pay:' }
            ]);
            const student = students.find(s => s['studentId'] === studentId);
            if (student) {
                student.payTuition(parseFloat(amount));
                console.log(chalk.yellow(`Paid $${amount}. New balance: $${student.viewBalance()}`));
            }
            else {
                console.log(chalk.red("Student not found"));
            }
        }
        else if (choice === 'Show status') {
            const { studentId } = await inquirer.prompt({ name: 'studentId', type: 'input', message: 'Enter student ID:' });
            const student = students.find(s => s['studentId'] === studentId);
            if (student) {
                student.showStatus();
            }
            else {
                console.log(chalk.red("Student not found"));
            }
        }
        else if (choice === 'Exit') {
            break;
        }
    }
}
main();
