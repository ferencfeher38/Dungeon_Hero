export default anims => {
    anims.create({
        key: "dragon-walk",
        frames: anims.generateFrameNumbers("dragon_walk_animation", {start: 0, end: 4}),
        frameRate: 5,
        repeat: -1
    })

    anims.create({
        key: "dragon-hurt",
        frames: anims.generateFrameNumbers("dragon_hurt_animation", {start: 0, end: 1}),
        frameRate: 5,
        repeat: 0
    })

    anims.create({
        key: "dragon-death",
        frames: anims.generateFrameNumbers("dragon_death_animation", {start: 0, end: 4}),
        frameRate: 4,
        repeat: 0
    })

    anims.create({
        key: "dragon-attack",
        frames: anims.generateFrameNumbers("dragon_attack_animation", {start: 0, end: 3}),
        frameRate: 5,
        repeat: 0
    })
}