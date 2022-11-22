export default anims => {
    anims.create({
        key: "fire-attack",
        frames: anims.generateFrameNumbers("fire_attack_animation", {start: 0, end: 8}),
        frameRate: 6,
        repeat: 0
    })

    anims.create({
        key: "fire-attack-hit",
        frames: anims.generateFrameNumbers("fire_attack_animation", {start: 9, end: 13}),
        frameRate: 6,
        repeat: 0
    })
}