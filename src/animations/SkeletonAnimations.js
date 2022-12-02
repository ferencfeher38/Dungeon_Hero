export default anims => {
    anims.create({
        key: "skeleton-walk",
        frames: anims.generateFrameNumbers("skeleton_walk_animation", {start: 0, end: 5}),
        frameRate: 5,
        repeat: -1
    })

    anims.create({
        key: "skeleton-hurt",
        frames: anims.generateFrameNumbers("skeleton_hurt_animation", {start: 0, end: 1}),
        frameRate: 5,
        repeat: 0
    })

    anims.create({
        key: "skeleton-death",
        frames: anims.generateFrameNumbers("skeleton_death_animation", {start: 0, end: 4}),
        frameRate: 4,
        repeat: 0
    })

    anims.create({
        key: "skeleton-attack",
        frames: anims.generateFrameNumbers("skeleton_attack_animation", {start: 0, end: 2}),
        frameRate: 5,
        repeat: 0
    })
}