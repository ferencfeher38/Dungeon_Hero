export default anims => {
    anims.create({
        key: "idle",
        frames: anims.generateFrameNumbers("knight_idle_animation", {start: 0, end: 11}),
        frameRate: 6,
        repeat: -1
    })

    anims.create({
        key: "run",
        frames: anims.generateFrameNumbers("knight_run_animation", {start: 0, end: 7}),
        frameRate: 10,
        repeat: -1
    })

    anims.create({
        key: "jump",
        frames: anims.generateFrameNumbers("knight_jump_animation", {start: 0, end: 6}),
        frameRate: 6,
        repeat: 1
    })

    anims.create({
        key: "hurt",
        frames: anims.generateFrameNumbers("knight_hurt_animation", {start: 0, end: 6}),
        frameRate: 8,
        repeat: 1
    })

    anims.create({
        key: "throw",
        frames: anims.generateFrameNumbers("knight_throw_attack_animation", {start: 0, end: 3}),
        frameRate: 8,
        repeat: 0
    })

    anims.create({
        key: "sword",
        frames: anims.generateFrameNumbers("knight_sword_attack_animation", {start: 0, end: 3}),
        frameRate: 6,
        repeat: 0
    })
}