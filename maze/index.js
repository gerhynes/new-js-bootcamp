const { Engine, Render, Runner, World, Bodies } = Matter;

const width = 600;
const height = 600;
const cells = 3;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: true,
    width,
    height
  }
});
Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true })
];
World.add(world, walls);

// Maze Generation

const shuffle = (arr) => {
  let counter = arr.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};

const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false));

const verticals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
  .fill(null)
  .map(() => Array(cells).fill(false));

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const stepThroughCell = (row, column) => {
  // If already visited cell at [row, column], return
  if (grid[row][column]) {
    return;
  }
  // Mark this cell as visited
  grid[row][column] = true;
  // Assemble randomly-ordered list of neighbours
  const neighbours = shuffle([
    [row - 1, column, "up"],
    [row, column + 1, "right"],
    [row + 1, column, "down"],
    [row, column - 1, "left"]
  ]);
  console.log(neighbours);
  // For each neighbour, ...
  for (let neighbour of neighbours) {
    const [nextRow, nextColumn, direction] = neighbour;

    // See if that neighbour is out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cells ||
      nextColumn > 0 ||
      nextColumn >= cells
    ) {
      continue;
    }

    // If already visited that neighbour, continue to next neighbour
    if (grid[nextRow][nextColumn]) {
      continue;
    }
    // Remove a wall from either horizontals or verticals
  }
  // Visit that next cell
};

stepThroughCell(1, 1);
