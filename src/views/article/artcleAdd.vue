<template>
  <div class="container">
    <div class="title">新增文章</div>
    <div class="wrap">
      <el-form
        :model="form"
        status-icon
        ref="form"
        label-width="100px"
        @submit.native.prevent>
        <el-row>
          <el-col>
            <el-form-item label="文章分类" prop="pid">
              <el-select  size="medium" filterable v-model="form.classfyId" placeholder="请选择分类">
                <el-option
                  v-for="item in groups2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="文章标题" prop="title">
              <el-input size="medium" v-model="form.title" placeholder="请输入文章标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="封面图片" prop="title">
              <el-input size="medium" v-model="form.cover" placeholder="请输入Url"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="封面简介" prop="title">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form.brief">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="">
        </div>
        <div class="mavon-wrap">
          <mavon-editor v-model="form.content"></mavon-editor>
        </div>
      </el-form>
      <div style="padding: 10px 20px;">
        <el-button type="primary" @click="submitForm('form')">新增</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import artcle from '@/models/artcle'
import 'mavon-editor/dist/css/index.css'

export default {
  data() {
    return {
      form: {
        classfyId: null,
        brief: '',
        title: '',
        cover: '',
        content: '',
      },
      groups: [{
        id: 1,
        name: '前端',
        pid: 0,
      }, {
        id: 2,
        name: '后端',
        pid: 0,
      }, {
        id: 3,
        name: '运维',
        pid: 0,
      }],
      groups2: [],
    }
  },
  created() {
    this.getGroupOne()
    this.getGroupTwo()
  },
  methods: {
    async getGroupOne() {
      try {
        const group = await artcle.classifyOne()
        this.groups = group
      } catch (error) {
        console.log(error)
      }
    },
    async getGroupTwo() {
      try {
        const group = await artcle.classifyTwo()
        this.groups2 = group
      } catch (error) {
        console.log(error)
      }
    },
    async submitForm() {
      try {
        const res = await artcle.addArtcle(this.form)
        if (res.error_code === 0) {
          this.$message.success(`${res.msg}`)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
  components: {
    mavonEditor,
  },
}
</script>

<style lang="scss" scoped>
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #dae1ec;
  }
  .wrap {
    padding: 20px;
  }
}
</style>
