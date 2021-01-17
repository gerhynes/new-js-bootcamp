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
  <label><b>Search for a Movie</b>
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

    resultsWrapper.appendChild(option);
  }
};

input.addEventListener("input", debounce(onInput, 500));
