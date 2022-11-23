export default anims => {
    anims.create({
        key: "orc-walk",
        frames: anims.generateFrameNumbers("orc_walk_animation", {start: 0, end: 5}),
        frameRate: 5,
        repeat: -1
    })

    anims.create({
        key: "orc-hurt",
        frames: anims.generateFrameNumbers("orc_hurt_animation", {start: 0, end: 1}),
        frameRate: 5,
        repeat: 0
    })

    anims.create({
        key: "orc-death",
        frames: anims.generateFrameNumbers("orc_death_animation", {start: 0, end: 5}),
        frameRate: 4,
        repeat: 0
    })
}