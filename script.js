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

function updateSelectedCount() {
  const selectSeats = document.querySelectorAll('.row .seat.selected');
  const selectSeatsCount = selectSeats.length;

  count.innerText = selectSeatsCount;
  total.innerText = selectSeatsCount * ticketPrice;
}

// Movie Select Event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = e.target.value;
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
