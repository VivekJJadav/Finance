const { format, subDays, addDays } = require('date-fns');
const { writeFileSync } = require('fs');

// Function to generate random number within a range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random payee name
function getRandomPayee() {
  const payees = ['John Doe', 'Jane Smith', 'Acme Corp', 'Global Industries', 'Alice Johnson', 'Bob Brown', 'Charlie Davis'];
  return payees[getRandomNumber(0, payees.length - 1)];
}

// Generate 100 entries over the last three months
function generateData() {
  const data = [];
  const today = new Date();
  const startDate = subDays(today, 90); // 90 days back (approximately 3 months)

  for (let i = 0; i < 100; i++) {
    // Generate a random date within the last three months
    const randomDays = getRandomNumber(0, 90);
    const randomDate = addDays(startDate, randomDays);

    // Generate random amount (positive or negative)
    const amount = getRandomNumber(-4000, 4000); // Example range: -4000 to 4000

    // Generate random payee
    const payee = getRandomPayee();

    // Format the date with time
    const formattedDate = format(randomDate, 'yyyy-MM-dd HH:mm:ss');

    // Format the data as required
    data.push({
      date: formattedDate,
      payee: payee,
      amount: amount,
    });
  }

  return data;
}

// Convert data to CSV
function convertToCSV(data) {
  const header = 'date,payee,amount\n';
  const rows = data.map(entry => `${entry.date},${entry.payee},${entry.amount}`).join('\n');
  return header + rows;
}

// Generate data and convert to CSV
const data = generateData();
const csvData = convertToCSV(data);

// Write CSV data to a file
writeFileSync('data.csv', csvData);

console.log('CSV file has been created.');
