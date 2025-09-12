import kaboom from "https://unpkg.com/kaplay@3001.0.19/dist/kaplay.mjs";

kaboom({
  background: [230, 240, 255],
  scale: 2,
});

// Load Bean sprite
loadSprite("bean", "/sprites/bean.png");

// Movement speed
const SPEED = 100;

// Maze layout (W = wall, . = empty space, G = goal)
const MAZE = [
  "WWWWWWWWWW",
  "W.......GW",
  "W.WWW.WWWW",
  "W.W.....WW",
  "W.WWWWWWWW",
  "W........W",
  "WWWWWWWWWW",
];

// Build maze
for (let y = 0; y < MAZE.length; y++) {
  for (let x = 0; x < MAZE[y].length; x++) {
    const tile = MAZE[y][x];
    const pos = vec2(x * 16, y * 16);

    if (tile === "W") {
      add([
        rect(16, 16),
        pos,
        area(),
        color(100, 100, 150),
        solid(),
        "wall",
      ]);
    }

    if (tile === "G") {
      add([
        rect(16, 16),
        pos,
        area(),
        color(255, 200, 0),
        "goal",
      ]);
    }
  }
}

// Add Bean
const bean = add([
  sprite("bean"),
  pos(16, 16),
  area(),
  scale(1.2),
  "bean",
]);

// Movement
onUpdate(() => {
  let dir = vec2(0);

  if (isKeyDown("left") || isKeyDown("a")) dir.x -= 1;
  if (isKeyDown("right") || isKeyDown("d")) dir.x += 1;
  if (isKeyDown("up") || isKeyDown("w")) dir.y -= 1;
  if (isKeyDown("down") || isKeyDown("s")) dir.y += 1;

  bean.move(dir.scale(SPEED));
});

// Win condition
bean.onCollide("goal", () => {
  add([
    text("You found the coffee!", { size: 24 }),
    pos(center()),
    origin("center"),
  ]);
  destroy(bean);
});