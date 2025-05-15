class Music {
    constructor(title,singer, img, mp3) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.mp3 = mp3;
    }
   
    
}
Music.prototype.getName = function() {
    return this.title;
}
const musicList = [
    new Music("Koparilan Cicekler", "Kibariye", "img/kibariye.jpg", "mp3/kibariye.mp3"),
    new Music("Goklerde Kartal Gibiydim", "Volkan Konak", "img/volkan.png", "mp3/volkan.mp3"),
    new Music("Bir Tek Dilegim Var", "Sahin Kendrici", "img/sahin.jpg", "mp3/sahin.mp3"),];
