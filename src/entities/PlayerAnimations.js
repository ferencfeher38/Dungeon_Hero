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
}