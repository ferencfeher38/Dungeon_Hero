export default anims => {
    anims.create({
        key: "idle",
        frames: anims.generateFrameNumbers("knight", {start: 0, end: 11}),
        frameRate: 6,
        repeat: -1
    })


    anims.create({
        key: "run",
        frames: anims.generateFrameNumbers("knight", {start: 12, end: 19}),
        frameRate: 10,
        repeat: -1
    })

    anims.create({
        key: "jump",
        frames: anims.generateFrameNumbers("knight", {start: 20, end: 26}),
        frameRate: 6,
        repeat: 1
    })
}