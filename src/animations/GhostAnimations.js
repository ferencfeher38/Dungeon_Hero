export default (anims) => {
  anims.create({
    key: "ghost-walk",
    frames: anims.generateFrameNumbers("ghost_walk_animation", {
      start: 0,
      end: 3,
    }),
    frameRate: 5,
    repeat: -1,
  });

  anims.create({
    key: "ghost-hurt",
    frames: anims.generateFrameNumbers("ghost_hurt_animation", {
      start: 0,
      end: 1,
    }),
    frameRate: 5,
    repeat: 0,
  });

  anims.create({
    key: "ghost-death",
    frames: anims.generateFrameNumbers("ghost_death_animation", {
      start: 0,
      end: 4,
    }),
    frameRate: 4,
    repeat: 0,
  });

  anims.create({
    key: "ghost-attack",
    frames: anims.generateFrameNumbers("ghost_attack_animation", {
      start: 0,
      end: 3,
    }),
    frameRate: 5,
    repeat: 0,
  });

  anims.create({
    key: "ghost-projectile-attack",
    frames: anims.generateFrameNumbers("ghost_projectile_attack_animation", {
      start: 0,
      end: 8,
    }),
    frameRate: 6,
    repeat: 0,
  });
};
