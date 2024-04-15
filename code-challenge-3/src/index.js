// Your code here
// src/index.js

document.addEventListener('DOMContentLoaded', function() {
    const buyButton = document.getElementById('buy-ticket');
    const remainingTickets = document.getElementById('ticket-num');
    
    // Function to update ticket count display
    function updateTicketCount() {
      const availableTickets = movieData.capacity - movieData.tickets_sold;
      remainingTickets.textContent = availableTickets;
      if (availableTickets === 0) {
        buyButton.disabled = true;
        buyButton.textContent = 'Sold Out';
      }
    }
  
    // Function to handle buying tickets
    function buyTicket() {
      if (movieData.tickets_sold < movieData.capacity) {
        movieData.tickets_sold++;
        // Update ticket count display
        updateTicketCount();
        // Make PATCH request to update tickets sold on the server
        fetch(`/films/${movieData.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ tickets_sold: movieData.tickets_sold })
        })
        .then(response => response.json())
        .then(updatedMovieData => {
          console.log('Tickets sold updated:', updatedMovieData);
        })
        .catch(error => console.error('Error updating tickets sold:', error));
      } else {
        alert('Sorry, this movie is sold out!');
      }
    }
  
    // Attach event listener to buy button
    buyButton.addEventListener('click', buyTicket);
  
    // Initialize ticket count display
    updateTicketCount();
  });

 
let url = "http://localhost:3000/films"
//console.log(document.getElementById('films'))

