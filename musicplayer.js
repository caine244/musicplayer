class MusicPlayer {
    constructor(musiclist) {
        this.MusicList = musiclist;
        this.index = 0;
}
getMusic() {
    return this.MusicList[this.index];
}
next() {
    
    if (this.index + 1  != this.MusicList.length) {
        this.index++;
    }
    else{
    return this.index = 0;
    }

}
prev() {

    if (this.index != 0) {
        this.index--;
    }
    else{
    return this.index = this.MusicList.length - 1;
    }
}
}