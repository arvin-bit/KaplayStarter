import kaplay from "https://unpkg.com/kaplay@3001.0.19/dist/kaplay.mjs";

kaplay({
  background: "darkSalmon",
  debug: true,
});


let score = 0;

const scoreText = add([
  text("Score: 0", { size: 32 }),
  pos(20, 20),
  z(100),
  {
    update() {
      this.text = "Score: " + score;
    },
  },
]);

const bean = add([
  sprite("bean"),
  pos(center()),
  area(),
  scale(2),
  anchor("center"),
]);

bean.onClick(() => {
  score++;
});

bean.onClick(() => {
  score++;
  shake(5);
  flash("#cc425e", 0.2);
});
