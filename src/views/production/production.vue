<template>
  <div class="container">
    <div class="title">作品展</div>
    <div class="wrap">
      <div class="production-btn-wrap">
        <el-button type="primary" @click="add">添加作品</el-button>
      </div>
      <div class="production-content-wrap">
        <el-row :gutter="30">
          <el-col :xs="24"  :sm="12" :lg="8" v-for="(item, index) in productions" :key="index">
            <production-item :production="item"></production-item>
            <div class="production-btn-grop">
              <el-button size="small " @click="handleEdit(item)">编辑</el-button>
              <el-button size="small " type="danger" @click="handleDelete(item)">删除</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog :append-to-body="true" :visible.sync="dialogFormVisible" width='800px'>
        <div>
          <el-form label-width="80px">
            <el-form-item label="作品名称" prop="name">
              <el-input size="medium" v-model="form.name" placeholder="请输入作品名称"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="summary">
              <el-input size="medium" type="textarea"
                :rows="2" v-model="form.summary" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="图片" prop="image">
              <el-input size="medium" v-model="form.image" placeholder="请输入图片地址"></el-input>
            </el-form-item>
            <el-form-item label="链接" prop="link">
              <el-input size="medium" v-model="form.link" placeholder="请输入作品地址"></el-input>
            </el-form-item>
            <el-form-item label="git地址" prop="github">
              <el-input size="medium" v-model="form.github" placeholder="请输入git地址"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-left: 20px">
          <el-button type="primary" @click="addProduction">新增</el-button>
        </div>
    </el-dialog>
    <el-dialog :append-to-body="true" :visible.sync="updateVisible" width='800px'>
        <div>
          <el-form label-width="80px">
            <el-form-item label="作品名称" prop="name">
              <el-input size="medium" v-model="updateForm.name" placeholder="请输入作品名称"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="summary">
              <el-input size="medium" type="textarea"
                :rows="2" v-model="updateForm.summary" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="图片" prop="image">
              <el-input size="medium" v-model="updateForm.image" placeholder="请输入图片地址"></el-input>
            </el-form-item>
            <el-form-item label="链接" prop="link">
              <el-input size="medium" v-model="updateForm.link" placeholder="请输入作品地址"></el-input>
            </el-form-item>
            <el-form-item label="git地址" prop="github">
              <el-input size="medium" v-model="updateForm.github" placeholder="请输入git地址"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-left: 20px">
          <el-button type="primary" @click="editProduction">修改</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import production from '@/models/production'
import productionItem from './productionItem'

export default {
  name: 'production',
  data() {
    return {
      dialogFormVisible: false,
      updateVisible: false,
      form: {
        name: '',
        summary: '',
        image: '',
        link: '',
        github: '',
      },
      updateForm: {
        name: '',
        summary: '',
        image: '',
        link: '',
        github: '',
      },
      productions: [],
    }
  },
  created() {
    this.getProductions()
  },
  methods: {
    add() {
      this.dialogFormVisible = true
    },
    handleEdit(item) {
      this.updateForm = Object.assign({}, item)
      this.updateVisible = true
    },
    handleDelete(item) {
      this.$confirm('此操作将永久删除作品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // 删除后刷新列表
        this.deleteFriend(item.id)
      })
    },
    async deleteFriend(id) {
      try {
        const res = await production.delectProduction(id)
        if (res.error_code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          // 添加后刷新列表
          this.getProductions()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async addProduction() {
      try {
        const res = await production.addProduction(this.form)
        if (res.error_code === 0) {
          this.$message.success(`${res.msg}`)
          this.dialogFormVisible = false
        }
      } catch (error) {
        console.log(error)
      }
      // 添加后刷新列表
      this.getProductions()
    },
    async editProduction() {
      try {
        const res = await production.editProduction(this.updateForm.id, this.updateForm)
        if (res.error_code === 0) {
          this.$message.success(`${res.msg}`)
          this.updateVisible = false
        }
      } catch (error) {
        console.log(error)
      }
      // 添加后刷新列表
      this.getProductions()
    },
    async getProductions() {
      try {
        const res = await production.getProductions()
        this.productions = res
      } catch (error) {
        console.log(error)
      }
    },
  },
  components: {
    productionItem,
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
  .production-content-wrap{
    margin: 20px;
    .production-btn-grop{
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
    }
  }
}
</style>
