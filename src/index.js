console.log('%c HI', 'color: firebrick');
document.addEventListener('DOMContentLoaded', () => {
    const dogImageUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";

    const dogImageContainer = document.getElementById('dog-image-container');
    const breedDropdown = document.getElementById('breed-dropdown');
    const dogBreedsList = document.getElementById('dog-breeds');

    // Fetch images of dogs
    fetch(dogImageUrl)
      .then(response => response.json())
      .then(data => {
        data.message.forEach(imageUrl => {
          const img = document.createElement('img');
          img.src = imageUrl;
          dogImageContainer.appendChild(img);
        });
      })
      .catch(error => console.error('Error fetching dog images:', error));

    // Fetch dog breeds
    fetch(breedUrl)
      .then(response => response.json())
      .then(data => {
        const breeds = Object.keys(data.message);
        breeds.forEach(breed => {
          const option = document.createElement('option');
          option.value = breed;
          option.textContent = breed;
          breedDropdown.appendChild(option);

          const li = document.createElement('li');
          li.textContent = breed;
          dogBreedsList.appendChild(li);
        });
      })
      .catch(error => console.error('Error fetching dog breeds:', error));

    // Filter dog breeds based on dropdown selection
    breedDropdown.addEventListener('change', () => {
      const selectedLetter = breedDropdown.value;
      const lis = dogBreedsList.getElementsByTagName('li');
      for (const li of lis) {
        const breedName = li.textContent.toLowerCase();
        if (breedName.charAt(0) === selectedLetter) {
          li.style.display = 'block';
        } else {
          li.style.display = 'none';
        }
      }
    });
});
