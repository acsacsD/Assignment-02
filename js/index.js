// Task 1: 
// Fetch the album data from the projects data folder (albums.json)
// Creating an async function to load the album data.
async function loadAlbumData() {
  try {
    const response = await fetch('public/data/albums.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to load album data:', error);
  }
}
// Create variable: albumStore
let albumStore = [];
loadAlbumData().then(data => {
  albumStore = data;
  renderAlbums(albumStore);
});

function createAlbumRow(album) {
  return `
    <tr>
      <td>${album.album}</td>
      <td>${album.releaseDate}</td>
      <td>${album.artistName}</td>
      <td>${album.genres}</td>
      <td>${album.averageRating}</td>
      <td>${album.numberReviews}</td>
    </tr>
  `;
}

// Rendering Albums
function renderAlbums(albums) {
  const albumsCopy = [...albums];
  const albumRows = albumsCopy.map(createAlbumRow).join('');
  const tableBody = document.getElementById('album-rows');
  tableBody.innerHTML = albumRows;
}
// Task 2: 
//  Submit Event for search form
document.getElementById('album-search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const searchText = document.getElementById('search-input').value.toLowerCase();
  const minRating = parseFloat(document.getElementById('min-album-rating-input').value);

  // Filter albums by search text and minimum rating
  let filteredAlbums = searchByText(albumStore, searchText);
  filteredAlbums = searchByRating(filteredAlbums, minRating);

  // Renderingthe filtered albums
  renderAlbums(filteredAlbums);
});

// Function to search albums by text
function searchByText(albums, searchText) {
  if (!searchText) return albums;
  return albums.filter(album => 
      album.album.toLowerCase().includes(searchText) || 
      album.artistName.toLowerCase().includes(searchText)
  );
}
// Function to search albums by rating
function searchByRating(albums, minRating) {
  if (isNaN(minRating)) return albums; 
  return albums.filter(album => album.averageRating >= minRating);
}

// Bonus Task 1: Soting data by average rating and number of reviews
document.getElementById('albumn-column-headers').addEventListener('click', function(event) {
  const target = event.target;
  if (target.textContent === 'Average Rating' || target.textContent === '# of Reviews') {
      const sortBy = target.textContent;
      albumStore.sort((a, b) => {
          // sorting by number of reviews
          if (sortBy === '# of Reviews') {
              return b.numberReviews - a.numberReviews;
          }
          // Sort by average rating
          return b.averageRating - a.averageRating;
      });
      renderAlbums(albumStore);
  }
});

// Bonus Task 2: Sorting data by releast date
document.getElementById('albumn-column-headers').addEventListener('click', function(event) {
  const target = event.target;
  if (target.textContent === 'Release') {
      albumStore.sort((a, b) => {
          const dateA = new Date(a.releaseDate);
          const dateB = new Date(b.releaseDate);
          return dateB - dateA;
      });
      renderAlbums(albumStore);
  }
});
// Changing cursor to pointer when hovering and click