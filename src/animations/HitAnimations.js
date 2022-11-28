export default anims => {
    anims.create({
        key: "fire-attack-hit",
        frames: anims.generateFrameNumbers("fire_attack_animation", {start: 9, end: 13}),
        frameRate: 6,
        repeat: 0
    })

    anims.create({
        key: "crystal",
        frames: anims.generateFrameNumbers("crystal_animation", {start: 0, end: 9}),
        frameRate: 6,
        repeat: -1
    })
}