  fetch('/api/car')
    .then(response => response.json())
    .then(data => {
      console.log('Received data:', data);

      const dataArray = Array.isArray(data.data) ? data.data : [];

      console.log('Array:', dataArray);


      const cardContainer = document.getElementById('cardContainer');
      dataArray.forEach(item => {
        const card = createCard(item);
        cardContainer.appendChild(card);
      });
    })
    .catch(error => console.error('Error fetching car data:', error));


  function createCard(data) {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-3');

    console.log('Creating card for:', data);

    card.innerHTML = `
      <div class="card">
        <img src="${data.gambar || 'path_to_default_image'}" class="card-img-top" alt="Car Image">
        <div class="card-body">
          <h5 class="card-title">${data.nama || 'Unknown Car'}</h5>
          <p class="card-text">Size: ${data.ukuran || 'Not specified'}</p>
          <p class="card-text">Rent: ${data.sewa || 'Not specified'}</p>
          <button type="button" class="btn btn-warning" onclick="editData(${data.carid})">Edit</button>
          <button type="button" class="btn btn-danger" onclick="deleteData(${data.carid})">Delete</button>
        </div>
      </div>
    `;

    console.log('Card created:', card);

    return card;
  }


  function editData(id) {
    console.log('Edit data with ID:', id);

  }

  function deleteData(id) {
    console.log('Delete data with ID:', id);

  }