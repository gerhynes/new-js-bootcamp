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

const input = document.querySelector("input");

const onInput = async (event) => {
  const movies = await fetchData(event.target.value);

  for (let movie of movies) {
    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${movie.Poster}" alt=${movie.Title}/>
      <h2>${movie.Title}</h2>    
    `;

    document.querySelector("#target").appendChild(div);
  }
};

input.addEventListener("input", debounce(onInput, 500));
