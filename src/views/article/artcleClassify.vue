<template>
  <div class="container">
    <div class="title">文章类型管理</div>
    <!-- <div class="wrap">
      <el-row>
        <el-col
          :lg="16"
          :md="20"
          :sm="24"
          :xs="24">
          <el-form
            :model="form"
            status-icon
            ref="form"
            label-width="100px"
            @submit.native.prevent>
            <el-row :gutter="0">
              <el-col :span="8">
                <el-form-item label="一级分类" prop="pid">
                  <el-select  size="medium" filterable v-model="form.pid" placeholder="请选择分组">
                    <el-option
                      v-for="item in groups"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="二级分类" prop="name">
                  <el-input size="medium" v-model="form.name" placeholder="请输入二级分类"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="二级分类" prop="color">
                  <el-input size="medium" v-model="form.color" placeholder="请输入颜色样式"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button style="float: right;" type="primary" @click="submitForm('form')">新增分类</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </div> -->
    <div class="wrap">
      <div class="button-group">
        <el-button type="primary" @click="add">新增分类</el-button>
      </div>
      <div class="wrap2">
        <lin-table
          :tableColumn="tableColumn"
          :tableData="tableData"
          :operate="operate"
          @handleEdit="handleEdit"
          @handleDelete="handleDelete"
          @row-click="rowClick"
          v-loading="loading"></lin-table>
      </div>
    </div>
    <el-dialog :append-to-body="true" :visible.sync="dialogFormVisible" width='500px'>
      <div>
        <el-form label-width="80px">
          <el-form-item label="一级分类" prop="pid">
            <el-select  size="medium" filterable v-model="form.pid" placeholder="请选择分组">
              <el-option
                v-for="item in groups"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类" prop="name">
            <el-input size="medium" v-model="form.name" placeholder="请输入二级分类"></el-input>
          </el-form-item>
          <el-form-item label="背景颜色" prop="color">
            <el-input size="medium" v-model="form.color" placeholder="请输入背景色样式如：#fff"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="padding: 14px 0; text-align:center;">
        <div style="text-align:center; font-size: 14px; color: #333;">预览</div>
        <div class="visit-item" :style="{'background': form.color}">{{form.name}}</div>
      </div>
      <el-button type="primary" @click="addClassfy">新增</el-button>
    </el-dialog>
    <el-dialog :append-to-body="true" :visible.sync="updateVisible" width='500px'>
      <div>
        <el-form label-width="80px">
          <el-form-item label="一级分类" prop="pid">
            <el-select  size="medium" filterable v-model="updateForm.pid" placeholder="请选择分组">
              <el-option
                v-for="item in groups"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类" prop="name">
            <el-input size="medium" v-model="updateForm.name" placeholder="请输入二级分类"></el-input>
          </el-form-item>
          <el-form-item label="背景颜色" prop="color">
            <el-input size="medium" v-model="updateForm.color" placeholder="请输入背景色样式如：#fff"></el-input>
          </el-form-item>
        </el-form>
      </div>
       <div style="padding: 14px 0; text-align:center;">
        <div style="text-align:center; font-size: 14px; color: #333;">预览</div>
        <div class="visit-item" :style="{'background': updateForm.color}">{{updateForm.name}}</div>
      </div>
      <el-button type="primary" @click="eidtClassfy">保存</el-button>
    </el-dialog>
  </div>
</template>

<script>

import artcle from '@/models/artcle'
import LinTable from '@/components/base/table/lin-table'

export default {
  created() {
    this.loading = true
    this.getClassify()
    this.operate = [{ name: '编辑', func: 'handleEdit', type: 'primary' }, {
      name: '删除',
      func: 'handleDelete',
      type: 'danger',
      auth: '删除图书',
    }]
    this.loading = false
  },
  data() {
    return {
      form: {
        pid: '',
        name: '',
        color: ''
      },
      updateForm: {
        pid: '',
        name: '',
        color: ''
      },
      updateVisible: false,
      dialogFormVisible: false,
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
      }, {
        id: 4,
        name: '其他',
        pid: 0,
      }],
      tableColumn: [{ prop: 'id', label: 'Id' }, { prop: 'pName', label: '一级分类' }, { prop: 'name', label: '二级分类' }, {prop: 'color', label: '颜色'}],
      tableData: [],
      operate: [],
      showEdit: false,
      editId: 1,
    }
  },
  methods: {
    add() {
      this.dialogFormVisible = true
    },
    edit(item) {
      console.log('item', item)
      this.editId = item.id
      Object.keys(this.updateForm).forEach((key) => {
        this.updateForm[key] = item[key]
      })
      this.updateVisible = true
    },
    async getClassify() {
      try {
        const res = await artcle.getClassfy()
        this.tableData = res
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    async addClassfy() {
      try {
        const res = await artcle.addClassify(this.form)
        if (res.error_code === 0) {
          this.$message.success(`${res.msg}`)
          this.getClassify()
          this.dialogFormVisible = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    async eidtClassfy() {
      try {
        const res = await artcle.editClassfy(this.editId,this.updateForm)
        if (res.error_code === 0) {
          this.$message.success(`${res.msg}`)
          this.getClassify()
          this.updateVisible = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    handleEdit(item) {
      this.editId = item.row.id
      console.log('item', item)
      Object.keys(this.updateForm).forEach((key) => {
        this.updateForm[key] = item.row[key]
      })
      this.updateVisible = true
    },
    handleDelete(item) {
      const id = item.row.id
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteClassify(id)
      })
    },
    async deleteClassify(id) {
      try {
        const res = await artcle.delectClassfy(id)
        if (res.error_code === 0) {
           this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getClassify()
        }
      } catch(error) {
        console.log(error)
      }
    },
    rowClick() {

    },
  },
  components: {
    LinTable,
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
  .wrap2{
    margin-top: 20px;
  }
  .submit {
    float: left;
  }
}
</style>

<style lang="scss">
.visit-item{
  margin: 0 auto;
  display: inline-block;
  text-align: center;
  margin: 10px .4rem;
  font-size: 1.2rem;
  padding: .6rem 1.6rem;
  color: #34495e;
  -webkit-box-shadow: 0 3px 5px rgba(0,0,0,.12);
  box-shadow: 0 3px 5px rgba(0,0,0,.12);
  border-radius: 5px;
  cursor: pointer;
}
</style>
