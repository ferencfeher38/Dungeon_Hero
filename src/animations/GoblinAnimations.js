export default (anims) => {
    anims.create({
        key: "goblin-walk",
        frames: anims.generateFrameNumbers("goblin_animations", {start: 6, end: 11}),
        frameRate: 6,
        repeat: -1
    })
}