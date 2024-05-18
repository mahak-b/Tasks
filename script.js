document.getElementById('searchIcon').addEventListener('click', function() {
    var searchBox = document.getElementById('searchBox');
    searchBox.style.display = (searchBox.style.display === 'block') ? 'none' : 'block';
  });
  

var currentDate = new Date();

var tempElement = document.querySelector('.temp');
var dateElement = document.getElementById('currentDate');

dateElement.textContent = currentDate.toDateString();

