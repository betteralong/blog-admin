/* eslint-disable class-methods-use-this */
import {
  post,
  get,
  put,
  _delete,
} from '@/lin/plugins/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Artcle {
  // constructor() {}
  // async addClassify(info) {
  //   const res = await post('v1/article/createcf', info)
  //   return res
  // }

  async classifyOne() {
    const res = await get('v1/articlecf/one')
    return res
  }

  async classifyTwo() {
    const res = await get('v1/articlecf/two')
    return res
  }

  async addArtcle(info) {
    const res = await post('v1/article/', info)
    return res
  }

  async getArtcleList() {
    const res = await get('v1/article/')
    return res
  }

  async getArcleDetail(id) {
    const res = await get(`v1/article/${id}`)
    return res
  }
  
  async updateArticle(id, info) {
    const res = await put(`v1/article/${id}`, info)
    return res
  }

  async getClassify(info) {
    const res = await get('v1/article/classifyList', info)
    return res
  }

  async getClassifyList() {
    const res = await get('v1/article/classifyList')
    return res
  }
  ///////////////
  async addClassify (info) {
    const res = await post('v1/articlecf/', info)
    return res
  }
  async editClassfy (id, info) {
    const res = await put(`v1/articlecf/${id}`, info)
    return res
  }
  async delectClassfy (id) {
    const res = await _delete(`v1/articlecf/${id}`)
    return res
  }

  async getClassfy () {
    const res = await get('v1/articlecf/')
    return res
  }

  async getClassfyPid () {
    const res = await get('v1/articlecf/')
    return res
  }
  // // 在这里通过 async await 语法糖让代码同步执行
  // // 1. await 一定要搭配 async 来使用
  // // 2. await 后面跟的是一个 Promise 对象
  // async getBook(id) {
  //   const res = await get(`v1/book/${id}`)
  //   return res
  // }

  // async editBook(id, info) {
  //   const res = await put(`v1/book/${id}`, info)
  //   return res
  // }

  // async delectBook(id) {
  //   const res = await _delete(`v1/book/${id}`)
  //   return res
  // }

  // async getBooks() {
  //   const res = await get('v1/book/')
  //   return res
  // }
}

export default new Artcle()
