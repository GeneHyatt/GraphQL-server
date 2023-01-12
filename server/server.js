const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// TODO: Move this to separate file.
const employeeArray = {
  "employees": [
    {
      "name": "Abhishek",
      "salary": "145000",
      "currency": "USD",
      "department": "Engineering",
      "sub_department": "Platform"

    },
    {
      "name": "Anurag",
      "salary": "90000",
      "currency": "USD",
      "department": "Banking",
      "on_contract": "true",
      "sub_department": "Loan"
    },
    {
      "name": "Himani",
      "salary": "240000",
      "currency": "USD",
      "department": "Engineering",
      "sub_department": "Platform"
    },
    {
      "name": "Yatendra",
      "salary": "30",
      "currency": "USD",
      "department": "Operations",
      "sub_department": "CustomerOnboarding"
    },
    {
      "name": "Ragini",
      "salary": "30",
      "currency": "USD",
      "department": "Engineering",
      "sub_department": "Platform"
    },
    {
      "name": "Nikhil",
      "salary": "110000",
      "currency": "USD",
      "on_contract": "true",
      "department": "Engineering",
      "sub_department": "Platform"
    },
    {
      "name": "Guljit",
      "salary": "30",
      "currency": "USD",
      "department": "Administration",
      "sub_department": "Agriculture"
    },
    {
      "name": "Himanshu",

      "salary": "70000",
      "currency": "EUR",
      "department": "Operations",
      "sub_department": "CustomerOnboarding"
    },
    {
      "name": "Anupam",
      "salary": "200000000",
      "currency": "INR",
      "department": "Engineering",
      "sub_department": "Platform" }
  ]
};

// GraphQL schema
const schema = buildSchema(`
    type Query {
        employees: [Employee]
        hello: String,
        salaryStats: SalaryStats
    },
    type Employee {
        name: String
        salary: Int
        currency: String
        department: String
        sub_department: String
    },
    type SalaryStats {
      mean: Int
      min: Int
      max: Int
    },
    
`);

// const schema = buildSchema(`
//     type Query {
//         employees(): [Employee]
//         employee(id: ID): Employee
//         getAllEmployeeSalaryStats: SalaryStats
//     },
//     type Employee {
//         name: String
//         salary: Int
//         currency: String
//         department: String
//         sub_department: String
//     },
//     type SalaryStats {
//         mean: Int!
//         min: Int!
//         max: Int!
//     }
// `);

// enum Department {
//   ENGINEERING
//   OPERATIONS
//   BILLING
//   ADMINISTRATION
// }
const getEmployees = () => {
  console.log('employeeArray', employeeArray);
  return Promise.resolve(employeeArray.employees);
}

const salaryStats = () => {
  const {employees} = employeeArray;
  let salaryTotal = 0;
  let initSal = 0;
  const salary = employees.reduce((salary, currentValue) => salary + currentValue, initSal);
  for (let i = 0; i < employees.length; i++) {
    salaryTotal += parseInt(employees[i].salary);
  }
console.log('salary', initSal);
console.log('salaryTotal',salaryTotal);
  const mean = salaryTotal / employees.length;
  const min = Math.min(salaryTotal);
  const max = Math.max(salaryTotal);

  return Promise.resolve({
    mean, min, max
  });
}

// Root resolver
const root = {
  hello: () => {
    return "Hello world!";
  },
  employees: () => {
    return getEmployees();
  },
  salaryStats: () => {
    return salaryStats();
  }
};

const employeeRoot = {
  employees: () =>  getEmployees()
};
// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.use('/employees', graphqlHTTP({
  schema: schema,
  rootValue: employeeRoot,
  graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));