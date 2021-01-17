const fetchData = async (searchTerm) => {
  const response = await axios.get(`https://www.omdbapi.com/`, {
    params: {
      apikey: "43f16007",
      s: searchTerm
    }
  });

  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};

const root = document.querySelector(".autocomplete");
root.innerHTML = `
  <label><h2 class="title is-5">Search for a Movie</h2>
    <input class="input" />
  </label>
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>  
  </div>
`;

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

const onInput = async (event) => {
  const movies = await fetchData(event.target.value);

  if (!movies.length) {
    dropdown.classList.remove("is-active");
    return;
  }

  // Clear any existing results
  resultsWrapper.innerHTML = "";

  // New results dropdown
  dropdown.classList.add("is-active");
  for (let movie of movies) {
    const option = document.createElement("a");

    // Check for broken images
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

    option.classList.add("dropdown-item");
    option.innerHTML = `
      <img src="${imgSrc}" alt=${movie.Title} />
      <p>${movie.Title}</p>    
    `;

    option.addEventListener("click", () => {
      dropdown.classList.remove("is-active");
      input.value = movie.Title;
      onMovieSelect(movie);
    });

    resultsWrapper.appendChild(option);
  }
};

input.addEventListener("input", debounce(onInput, 500));

// Close dropdown on click elsewhere
document.addEventListener("click", (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove("is-active");
  }
});

const onMovieSelect = async (movie) => {
  const response = await axios.get(`https://www.omdbapi.com/`, {
    params: {
      apikey: "43f16007",
      i: movie.imdbID
    }
  });

  document.querySelector("#summary").innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" alt="${movieDetail.Title}"/>
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h3>${movieDetail.Title}</h3>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
  `;
};
