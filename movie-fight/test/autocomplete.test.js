it("Shows an autocomplete", () => {
  createAutoComplete({
    root: document.querySelector("#target"),
    fetchData() {
      return [
        { Title: "Fake Movie Title" },
        { Title: "Not Avengers" },
        { Title: "Some Other Movie" }
      ];
    },
    renderOption(movie) {
      return movie.Title;
    }
  });

  const dropdown = document.querySelector(".dropdown");

  expect(dropdown.className).not.to.include("is-active");
});