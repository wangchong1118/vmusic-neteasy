import {
  ERR_OK
} from './config'
import axios from "axios"

// 获取推荐页 banner 焦点图接口函数
export function getBanner() {
  const url = "/api-nec/banner";
  return axios.get(url).then(res => {
    if (res.status == ERR_OK && res.data.code == ERR_OK) {
      return res.data.banners;
    }
  })
}

// 获取推荐页歌单列表接口函数
export function getRecommendSongList() {
  const url = "/api-nec/personalized?limit=10";
  return axios.get(url).then(res => {
    if (res.status == ERR_OK && res.data.code == ERR_OK) {
      return res.data.result;
    }
  })
}

// 获取歌单详情接口函数
export function getDiscSongList(discId) {
  const url = "/api-nec/playlist/detail?id=" + discId;
  return axios.get(url).then(res => {
    if (res.status == ERR_OK && res.data.code == ERR_OK) {
      return res.data.playlist;
    }
  })
}

// 获取歌手页歌手列表接口函数
export function getSingerList() {
  const url = "/api-nec/top/artists?limit=100";
  return axios.get(url).then(res => {
    if (res.status == ERR_OK && res.data.code == ERR_OK) {
      return res.data;
    }
  })
}

// 获取歌手详情接口函数
export function getSingerInfo(singerId) {
  const url = "/api-nec/artists?id=" + singerId;
  return axios.get(url).then(res => {
    if (res.status == ERR_OK && res.data.code == ERR_OK) {
      return res.data;
    }
  })
}

// 获取歌曲详情接口函数
export function getSongInfo(songId) {
  const url = "/api-nec/song/url?id=" + songId;
  return axios.get(url).then(res => {
    if (res.status == ERR_OK && res.data.code == ERR_OK) {
      return res.data;
    }
  })
}

// 获取歌曲完整版详情接口函数
export function getSongDetail(songId) {
  const url = "/api-nec/song/detail?ids=" + songId;
  return axios.get(url).then(res => {
    if (res.status == ERR_OK && res.data.code == ERR_OK) {
      return res.data;
    }
  })
}

// 获取歌曲歌词接口函数
export function getSongLyric(songId) {
  const url = "/api-nec/lyric?id=" + songId;
  return axios.get(url).then(res => {
    if (res.status == ERR_OK && res.data.code == ERR_OK) {
      return res.data;
    }
  })
}

// 获取歌单排行列表接口函数
export function getRankList() {
  const url = "/api-nec/toplist/detail";
  return axios.get(url).then(res => {
    if (res.status == ERR_OK && res.data.code == ERR_OK) {
      return res.data.list;
    }
  })
}

// 获取搜索热门关键词接口函数
export function getSearchHotkeyList() {
  const url = "/api-nec/search/hot";
  return axios.get(url).then(res => {
    if (res.status == ERR_OK && res.data.code == ERR_OK) {
      return res.data.result;
    }
  })
}

// 获取搜索热门关键词接口函数
export function getSearchInfo(kw, page=1, type=1) {
  const url = "/api-nec/search?keywords=" + kw + "&offset=" + (page-1)  + "&type=" + type + "&limit=100";
  return axios.get(url).then(res => {
    if (res.status == ERR_OK && res.data.code == ERR_OK) {
      return res.data.result;
    }
  })
}