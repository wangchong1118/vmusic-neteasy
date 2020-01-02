import {
  ERR_OK
} from './config'
import axios from "axios"

// 获取推荐页 banner 焦点图接口函数
export function getBanner() {
  const url = "/api/banner";
  return axios.get(url).then(res => {
    if (res.status == ERR_OK && res.data.code == ERR_OK) {
      return res.data.banners;
    }
  })
}

// 获取推荐页歌单列表接口函数
export function getRecommendSongList() {
  const url = "/api/personalized?limit=10";
  return axios.get(url).then(res => {
    if (res.status == ERR_OK && res.data.code == ERR_OK) {
      return res.data.result;
    }
  })
}

// 获取歌手页歌手列表接口函数
export function getSingerList() {
  const url = "/api/top/artists?limit=100";
  return axios.get(url).then(res => {
    if (res.status == ERR_OK && res.data.code == ERR_OK) {
      return res.data;
    }
  })
}
