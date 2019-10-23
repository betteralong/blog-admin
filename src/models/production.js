/* eslint-disable class-methods-use-this */
import {
  post,
  get,
  put,
  _delete,
} from '@/lin/plugins/axios'

class Production {
  async addProduction(info) {
    const res = await post('v1/production/', info)
    return res
  }

  async getProduction(id) {
    const res = await get(`v1/production/${id}`)
    return res
  }

  async editProduction(id, info) {
    const res = await put(`v1/production/${id}`, info)
    return res
  }

  async delectProduction(id) {
    const res = await _delete(`v1/production/${id}`)
    return res
  }

  async getProductions() {
    const res = await get('v1/production/')
    return res
  }
}

export default new Production()
