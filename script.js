// just selects the one
const container = document.querySelector('.container');
/* all version grabs all and puts them into a node list
 similar to an array and can call methods on it as if it was an array
 wants the seats which are not occuppied */
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
// want the price of the default movie value convert to int with +
let ticketPrice = +movieSelect.value;

populateUI();

// Get data from localStorage and populate it to the UI
function populateUI() {
  // change the string back into an array
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null ** selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
}

// Save the selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCountAndTotal() {
  // nodelist (like an array)
  const selectSeats = document.querySelectorAll('.row .seat.selected');

  /* We need to basically create an array of indexes to save the seats as 
the nodelist does not tell much 
3 steps to do this: 
- Copy selected seats into an array
- Map through array
- return a new array indexes
*/

  /* spread operator does not copy the whole array [a,b,c] 
  but passes (add in) through the values a,b,c to the new array we are making
  Overall convert the node list to an array */

  // map returns an array
  const seatsIndex = [...selectSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  // store the values into a local storage save strings (built-in browser)
  // store the indexes, key value pair, wrap into a string with JSON as seatsIndex is array
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  console.log(seatsIndex);
  const selectSeatsCount = selectSeats.length;

  count.innerText = selectSeatsCount;
  total.innerText = selectSeatsCount * ticketPrice;
}

// Movie Select Event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCountAndTotal();
});

// Seat click event
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    // e.target.className += ' selected';
    e.target.classList.toggle('selected');

    updateSelectedCountAndTotal();
  }
});

// Initial count and total set so on page refresh it is reset to 0
updateSelectedCountAndTotal();
