const fetchData = async (searchTerm) => {
  const response = await axios.get(`https://www.omdbapi.com/`, {
    params: {
      apikey: "43f16007",
      s: searchTerm
    }
  });

  console.log(response.data);
};

const input = document.querySelector("input");

// Prevent excessive API requests
let timeoutId;
const onInput = (event) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    fetchData(event.target.value);
  }, 500);
};

input.addEventListener("input", onInput);
