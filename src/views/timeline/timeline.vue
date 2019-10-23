<template>
  <div class="container">
    <div class="title">时光轴</div>
    <div class="wrap">
      <div class="timeline-btn-wrap">
        <el-button type="primary" @click="add">插入时光轴</el-button>
      </div>
      <div class="timeline-content-wrap">
       <el-timeline>
        <el-timeline-item v-for="(item, index) in timelineList" :key="index" :timestamp="getTime(item.create_time)" placement="top">
          <el-card>
            <div slot="header" class="clearfix">
              <span>{{item.title}}</span>
              <el-button style="float: right;" type="danger" @click="handleDel(item)">删除</el-button>
               <el-button style="float: right; margin-right: 20px;" @click="edit(item)">修改</el-button>
            </div>
            <div class="time-line-content">
              <img :src="item.image" />
              <p>{{item.content}}</p>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      </div>
    </div>
    <el-dialog :append-to-body="true" :visible.sync="dialogFormVisible" width='900px'>
        <div>
          <el-form label-width="80px">
            <el-form-item label="类型" prop="type">
              <el-select  size="medium" filterable v-model="form.type" placeholder="请选择分组">
                <el-option
                  v-for="item in groups"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间" prop="link">
              <el-date-picker
                v-model="form.create_time"
                type="date"
                value-format='yyyy-MM-dd'
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input size="medium" v-model="form.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <el-input size="medium" type="textarea"
                :rows="2" v-model="form.content" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="图片" prop="image">
              <el-input size="medium" v-model="form.image" placeholder="请输入图片地址"></el-input>
            </el-form-item>
             <el-form-item label="链接" prop="link" v-if="form.type < 3">
              <el-input size="medium" v-model="form.link" placeholder="请输入标题"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-left: 20px">
          <el-button type="primary" @click="addTimeline">新增</el-button>
        </div>
    </el-dialog>
    <el-dialog :append-to-body="true" :visible.sync="updateVisible" width='900px'>
      <div>
        <el-form label-width="80px">
          <el-form-item label="类型" prop="type">
            <el-select  size="medium" filterable v-model="updateForm.type" placeholder="请选择分组">
              <el-option
                v-for="item in groups"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间" prop="link">
            <el-date-picker
              v-model="updateForm.create_time"
              type="date"
              value-format='yyyy-MM-dd'
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input size="medium" v-model="updateForm.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input size="medium" type="textarea"
              :rows="2" v-model="updateForm.content" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="图片" prop="image">
            <el-input size="medium" v-model="updateForm.image" placeholder="请输入图片地址"></el-input>
          </el-form-item>
            <el-form-item label="链接" prop="link" v-if="form.type < 3">
            <el-input size="medium" v-model="updateForm.link" placeholder="请输入标题"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-left: 20px">
        <el-button type="primary" @click="handleEdit">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import timeline from '@/models/timeline'
export default {
  name: 'timeline',
  created() {
    this.getList()
  },
  data () {
    return {
      dialogFormVisible: false,
      updateVisible: false,
      form: {
        title: '',
        image: '',
        link: '',
        content: '',
        type: null,
        create_time: ''
      },
      updateForm: {
        title: '',
        image: '',
        link: '',
        content: '',
        type: null,
        create_time: ''
      },
      groups: [{
        id: 1,
        name: '文章',
      }, {
        id: 2,
        name: '作品',
      }, {
        id: 3,
        name: '其他',
      }],
      timelineList: [],
    }
  },
  methods: {
    getTime(time) {
      return moment(time).format('YYYY-MM-DD')
    },
    add () {
      this.dialogFormVisible = true
    },
    edit (item) {
      this.updateForm = Object.assign({}, item)
      this.updateVisible = true
    },
    async deleteTimeline (id) {
      try {
        const res = await timeline.delectTimeLine(id)
        if(res.error_code === 0) {
          this.$message.success(`${res.msg}`)
          this.getList()
        }
      } catch(error) {
        console.log(error)
     }
    },
    async handleEdit() {
      try {
        const res = await timeline.editTimeLine(this.updateForm.id, this.updateForm)
        if(res.error_code === 0) {
          this.$message.success(`${res.msg}`)
          this.updateVisible = false
          this.getList()
        }
      } catch(error) {
        console.log(error)
     }
    },
    handleDel(item) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除后刷新列表
        this.deleteTimeline(item.id)
      })
    },
    async addTimeline () {
     try {
        const res = await timeline.addTimeline(this.form)
        if(res.error_code === 0) {
          this.$message.success(`${res.msg}`)
          this.dialogFormVisible = false
          this.getList()
        }
      } catch(error) {
        console.log(error)
     }
    },
    async getList () {
      try {
        const res = await timeline.getTimeLines()
        this.timelineList = res
      } catch(error) {
        console.log(error)
     }
    },
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
  .timeline-btn-wrap{
    padding: 0 10px 10px 10px;
  }
  .timeline-content-wrap{
    padding: 20px;
  }
  .time-line-content{
    display: flex;
    align-items: center;
    font-size: 16px;
    >img{
      width: 100px;
      height: 100px;
    }
  }
  .timeline-content-bottom{
    padding: 10px;
    justify-content: space-between;
  }
}
</style>
