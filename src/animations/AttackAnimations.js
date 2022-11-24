export default anims => {
    anims.create({
        key: "fire-attack",
        frames: anims.generateFrameNumbers("fire_attack_animation", {start: 0, end: 8}),
        frameRate: 6,
        repeat: 0
    })
}