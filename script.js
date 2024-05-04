const form = document.getElementById('profit-form');
const resultsTableBody = document.getElementById('results-table-body');
const totalProfitElement = document.getElementById('total-profit');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const investment = parseFloat(document.getElementById('investment').value);
  const expectedReturn =document.getElementById('expected-return');
  const numDays = parseInt(document.getElementById('num-days').value);

  // Validate user input (all fields should be valid numbers)
  if (isNaN(investment) || isNaN(expectedReturn) || isNaN(numDays)) {
    alert('Please enter valid numbers for Investment, Expected Return, and Number of Days.');
    return;
  }

  const profitData = calculateProfit(investment, expectedReturn, numDays);
  displayResults(profitData);
});

function calculateProfit(investment, expectedReturn, numDays) {
  let totalAmount = investment;
  const profitData = [];
  for (let i = 1; i <= numDays; i++) {
    const dailyProfit = (expectedReturn / 100) * totalAmount;
    totalAmount += dailyProfit;
    profitData.push({ day: i, dailyProfit, totalAmount });
  }
  const profit = totalAmount - investment;
  return { profitData, totalProfit: profit };
}

function displayResults(profitData) {
  resultsTableBody.innerHTML = ''; // Clear table content before adding new data
  const totalProfit = profitData.totalProfit;

  // Check if profitData is an array before using forEach
  if (Array.isArray(profitData.profitData)) {
    profitData.profitData.forEach(data => {
      const tableRow = document.createElement('tr');
      tableRow.classList.add('table-row'); // Add class for styling

      const dayCell = document.createElement('td');
      dayCell.textContent = data.day;
      tableRow.appendChild(dayCell);

      const dailyProfitCell = document.createElement('td');
      dailyProfitCell.textContent = `₹${data.dailyProfit.toFixed(2)}`; // Use ₹ symbol for rupees
      tableRow.appendChild(dailyProfitCell);

      const totalAmountCell = document.createElement('td');
      totalAmountCell.textContent = `₹${data.totalAmount.toFixed(2)}`; // Use ₹ symbol for rupees
      tableRow.appendChild(totalAmountCell);

      resultsTableBody.appendChild(tableRow);
    });
  } else {
    console.error('Unexpected profitData format. Unable to display results.');
  }

  totalProfitElement.textContent = `Total Profit: ₹${totalProfit.toFixed(2)}`; // Use ₹ symbol for rupees
}
