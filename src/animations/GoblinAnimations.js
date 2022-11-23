export default anims => {
    anims.create({
        key: "goblin-walk",
        frames: anims.generateFrameNumbers("goblin_animations", {start: 6, end: 11}),
        frameRate: 6,
        repeat: -1
    })

    anims.create({
        key: "goblin-hurt",
        frames: anims.generateFrameNumbers("goblin_animations", {start: 18, end: 20}),
        frameRate: 7,
        repeat: 0
    })

    anims.create({
        key: "goblin-death",
        frames: anims.generateFrameNumbers("goblin_animations", {start: 24, end: 27}),
        frameRate: 3,
        repeat: 0
    })
}