const sum = (a , b) => {
    return a + b;
}
//module.exports = sum;

const getName = () => {
      return 'Narayan sharma'
}

//module.exports = getName;



const myFunction = (p1, p2) => {
    return p1 * p2;
}


// Spreadoperator
const a = [1, 2, 3];
const b = [...a, 4, 5, 6] 

// destructuring
const person = {
  firstName: 'Tom',
  lastName: 'Cruise',
  actor: true,
  age: 54, 
}

const {firstName: name, age} = person

let str = 'One\n' +
'Two\n' +
'Three'
module.exports = {
    str,
    myFunction,
    sum,
    getName
}