export default { 
    isPlayingAnimation(animsKey) {
        return this.anims.isPlaying && this.anims.getCurrentKey() === animsKey;
    }
}