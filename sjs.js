// for adding functionality in search box

document.getElementById('searchIcon').addEventListener('click', function() {
    var searchBox = document.getElementById('searchBox');
    searchBox.style.display = (searchBox.style.display === 'block') ? 'none' : 'block';
  });
  
  document.addEventListener('click', function(event) {
    var searchBox = document.getElementById('searchBox');
    var searchIcon = document.getElementById('searchIcon');
    if (!searchBox.contains(event.target) && event.target !== searchIcon) {
        searchBox.style.display = 'none';
    }
});

document.getElementById('hamburger').addEventListener('click', function() {
    var navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('expanded');
});

document.addEventListener('click', function(event) {
    var navLinks = document.getElementById('navLinks');
    var hamburger = document.getElementById('hamburger');
    if (!navLinks.contains(event.target) && event.target !== hamburger && window.innerWidth <= 1000) {
        navLinks.classList.remove('expanded');
    }
});


// for adding current date

var currentDate = new Date();

var tempElement = document.querySelector('.temp');
var dateElement = document.getElementById('currentDate');

dateElement.textContent = currentDate.toDateString();

// DOM starts

document.addEventListener('DOMContentLoaded', () => {
    const largeBlogsSection = document.getElementById('large-blogs');
    const latestBlogsSection = document.getElementById('Latest');
    const popularBlogsSection = document.getElementById('Popular');
    const modal = document.getElementById('blogModal');
    const modalHeadline = document.getElementById('modal-headline');
    const modalImage = document.getElementById('modal-image');
    const modalAuthorDate = document.getElementById('modal-author-date');
    const modalContent = document.getElementById('modal-content');
    const span = document.getElementsByClassName('close')[0];
    const hamburger = document.getElementById('hamburger');


    fetch('sdata.json') 
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach((blog, index) => {
                const blogElement = document.createElement('div');

                blogElement.addEventListener('click', () => {
                    openModal(blog);
                });

                if (index < 4) {

                    blogElement.classList.add('large-blog');
                    blogElement.innerHTML = `
                        <img src="${blog.image}" alt="${blog.headline}">
                        <div class="featured">Featured</div>
                        <div class="type">${blog.type}</div>
                        <div class="blog-details">
                        <h2>${blog.headline}</h2>
                        <p>By ${blog.author} <br> ${blog.date}</p>
                        </div>
                        <p class="blog-content" style="display:none;">${blog.content}</p>
                    `;
                    largeBlogsSection.appendChild(blogElement);
                } else {
                    
                    const smallBlogElement = document.createElement('div');
                    smallBlogElement.classList.add('small-blog');
                    smallBlogElement.innerHTML = `
                        <img src="${blog.image}" alt="${blog.headline}">
                        <div class="text-content">
                        <h2>${blog.headline}</h2>
                        <p>${blog.date}</p>
                        </div>
                        <p class="blog-content" style="display:none;">${blog.content}</p>
                    `;
                    smallBlogElement.addEventListener('click', () => {
                        openModal(blog);
                    });
                    latestBlogsSection.appendChild(smallBlogElement);

                    
                }
            });

            document.getElementById('defaultOpen').click();
        })
        .catch(error => console.error('Error fetching blogs:', error));

    // blog model - opening of block
    function openModal(blog) {
        modalHeadline.textContent = blog.headline;
        modalImage.src = blog.image;
        modalAuthorDate.textContent = `By ${blog.author} on ${blog.date}`;
        modalContent.textContent = blog.content;

        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    // Tab functionality
    window.openTab = function(evt, tabName) {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName('tabcontent');
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = 'none';
        }
        tablinks = document.getElementsByClassName('tablinks');
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(' active', '');
        }
        document.getElementById(tabName).style.display = 'block';
        evt.currentTarget.className += ' active';
    }

    document.getElementById('defaultOpen').click();
});
