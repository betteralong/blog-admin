/* eslint-disable class-methods-use-this */
import {
  post,
  get,
  put,
  _delete,
} from '@/lin/plugins/axios'


class Timeline {
  async addTimeline(info) {
    const res = await post('v1/timeline', info)
    return res
  }

  async getTimeLines() {
    const res = await get('v1/timeline')
    return res
  }

  async getTimeLine(id) {
    const res = await get(`v1/book/${id}`)
    return res
  }

  async editTimeLine(id, info) {
    const res = await put(`v1/timeline/${id}`, info)
    return res
  }

  async delectTimeLine(id) {
    const res = await _delete(`v1/timeline/${id}`)
    return res
  }
}

export default new Timeline()
