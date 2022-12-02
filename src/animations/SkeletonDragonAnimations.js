export default anims => {
    anims.create({
        key: "skeleton-dragon-walk",
        frames: anims.generateFrameNumbers("skeleton_dragon_walk_animation", {start: 0, end: 4}),
        frameRate: 5,
        repeat: -1
    })

    anims.create({
        key: "skeleton-dragon-hurt",
        frames: anims.generateFrameNumbers("skeleton_dragon_hurt_animation", {start: 0, end: 1}),
        frameRate: 5,
        repeat: 0
    })

    anims.create({
        key: "skeleton-dragon-death",
        frames: anims.generateFrameNumbers("skeleton_dragon_death_animation", {start: 0, end: 4}),
        frameRate: 4,
        repeat: 0
    })

    anims.create({
        key: "skeleton-dragon-attack",
        frames: anims.generateFrameNumbers("skeleton_dragon_attack_animation", {start: 0, end: 3}),
        frameRate: 4,
        repeat: 0
    })
}