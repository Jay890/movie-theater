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
// const ticketNumber = +count;
// const totalPrice = +total;

// Save the selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
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
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    // e.target.className += ' selected';
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});
