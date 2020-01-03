import { getSongInfo } from 'api/index';

export default class Song {
    constructor({ id, mid, singer, name, album, duration, image, url }) {
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url;
    }
}

export function createSong(songData, songInfo) {
    return new Song({
        id: songData.id,
        mid: 'midtmp',
        singer: filterSinger(songData.ar),
        name: songData.name,
        album: songData.al.name,
        duration: songData.dt,
        image: songData.al.picUrl,
        url: songInfo.url
    })
}

function filterSinger(singer) {
    let res = [];
    if (!singer) {
        return '';
    }
    singer.forEach(s => {
        res.push(s.name);
    })
    return res.join(',');
}