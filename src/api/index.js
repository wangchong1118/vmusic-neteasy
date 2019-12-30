import {
  ERR_OK
} from './config'

import axios from "axios"

export function getBanner() {
  const url = "/api/banner";

  return axios.get(url).then(res => {
    if (res.status == ERR_OK) {
      return res.data.banners;
    }
  })
}
