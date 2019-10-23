/* eslint-disable class-methods-use-this */
import {
  post,
  get,
} from '@/lin/plugins/axios'


class Friend {
  async addFriend(info) {
    const res = await post('v1/friend/add', info)
    return res
  }

  async getFrinds() {
    const res = await get('v1/friend/')
    return res
  }

  async getFriend(info) {
    const res = await get('v1/friend/id', info)
    return res
  }

  async updateFrinds(info) {
    const res = await post('v1/friend/update', info)
    return res
  }

  async delFriend(info) {
    const res = await post('v1/friend/del', info)
    return res
  }
}

export default new Friend()
