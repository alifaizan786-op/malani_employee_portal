const today = new Date()


const todayunix = Date.parse(today)

const milliscondsInADay = 86400000

const numOfDaysToAdd = 5

console.log('Date From New Date()------' + todayunix);
console.log('Date Converted From Unix--' + new Date(todayunix));
console.log('Date + Days---------------' + new Date(todayunix + (milliscondsInADay * numOfDaysToAdd)));


