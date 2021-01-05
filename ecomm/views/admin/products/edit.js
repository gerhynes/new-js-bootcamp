const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ product, errors }) => {
  return layout({
    content: `
      <form method="POST">
        <input type="text" name="title" value="${product.title}" />
        ${getError(errors, "title")}
        <input type="number" name="price" value="${product.price}" />
        ${getError(errors, "price")}
        <input type="file" name="image" />
        <button>Submit</button>
      </form>
    `
  });
};
