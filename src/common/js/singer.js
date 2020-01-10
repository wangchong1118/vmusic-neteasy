export default class Singer {
    constructor({ id, name, avatar }) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
    }
}

export function createSinger(singerData) {
  return new Singer({
      id: singerData.id,
      name: singerData.name,
      avatar: singerData.picUrl
  })
}