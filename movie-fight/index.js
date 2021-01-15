const fetchData = async () => {
  const response = await axios.get(`https://www.omdbapi.com/`, {
    params: {
      apikey: "43f16007",
      s: "avengers"
    }
  });

  console.log(response.data);
};

fetchData();
