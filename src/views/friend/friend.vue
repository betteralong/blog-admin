<template>
  <div class="container">
    <div class="title">友情链接列表</div>
    <div class="wrap">
      <div class="button-group">
        <el-button type="primary" @click="add">新增好友</el-button>
      </div>
      <ul class="link-wrap" v-if="friends.length">
        <div v-for="(item, index) in friends" :key="index" class="link-wrap-inner">
         <friend-item :friendData="item"></friend-item>
         <div class="link-btn-grop">
           <el-button size="small " @click="handleEdit(item)">编辑</el-button>
           <el-button size="small " type="danger" @click="handleDelete(item)">删除</el-button>
         </div>
        </div>
      </ul>
    </div>
    <el-dialog :append-to-body="true" :visible.sync="dialogFormVisible" width='900px'>
      <div class="frend-eg-wrap">
        <div class="eg-form" style="width:400px">
          <el-form label-width="80px">
            <el-form-item label="好友名称" prop="title">
              <el-input size="medium" v-model="form.name" placeholder="请输入好友名称"></el-input>
            </el-form-item>
            <el-form-item label="好友链接" prop="link">
              <el-input size="medium" v-model="form.link" placeholder="请输入好友好友链接"></el-input>
            </el-form-item>
            <el-form-item label="好友简介" prop="summary">
              <el-input size="medium" type="textarea"
                :rows="2" v-model="form.summary" placeholder="请输入好友简介"></el-input>
            </el-form-item>
            <el-form-item label="好友头像" prop="image">
              <el-input size="medium" v-model="form.image" placeholder="请输入头像链接"></el-input>
            </el-form-item>
            <el-form-item label="背景颜色" prop="bgColor">
              <el-input size="medium" v-model="form.bgColor" placeholder="请输入背景色"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="observe">
          <div>
             <div class="eg-title" style="text-align: center; padding: 12px 0;">预览</div>
             <div class="tips" style="text-align: center; padding: 12px 0;">文本为白色 背景色请尽量不要使用白色调</div>
             <div class="tips" style="text-align: center; padding: 12px 0;">默认为linear-gradient(to right, #4facfe 0%, #00f2fe 100%)</div>
            <friend-item :friendData="form"></friend-item>
          </div>
        </div>
      </div>
      <el-button type="primary" @click="addFriend">新增</el-button>
    </el-dialog>
    <el-dialog :append-to-body="true" :visible.sync="updateVisible" width='900px'>
      <div class="frend-eg-wrap">
        <div class="eg-form" style="width:400px">
          <el-form label-width="80px">
            <el-form-item label="好友名称" prop="title">
              <el-input size="medium" v-model="updateForm.name" placeholder="请输入好友名称"></el-input>
            </el-form-item>
            <el-form-item label="好友链接" prop="link">
              <el-input size="medium" v-model="updateForm.link" placeholder="请输入好友好友链接"></el-input>
            </el-form-item>
            <el-form-item label="好友简介" prop="summary">
              <el-input size="medium" type="textarea"
                :rows="2" v-model="updateForm.summary" placeholder="请输入好友简介"></el-input>
            </el-form-item>
            <el-form-item label="好友头像" prop="image">
              <el-input size="medium" v-model="updateForm.image" placeholder="请输入头像链接"></el-input>
            </el-form-item>
            <el-form-item label="背景颜色" prop="bgColor">
              <el-input size="medium" v-model="updateForm.bgColor" placeholder="请输入背景色"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="observe">
          <div>
             <div class="eg-title" style="text-align: center; padding: 12px 0;">预览</div>
             <div class="tips" style="text-align: center; padding: 12px 0;">文本为白色 背景色请尽量不要使用白色调</div>
             <div class="tips" style="text-align: center; padding: 12px 0;">默认为linear-gradient(to right, #4facfe 0%, #00f2fe 100%)</div>
            <friend-item :friendData="updateForm"></friend-item>
          </div>
        </div>
      </div>
      <el-button type="primary" @click="updateFriend">修改</el-button>
    </el-dialog>
  </div>
</template>

<script>
import friendItem from './friendItem.vue'
import friend from '@/models/friend'
export default {
  name: 'friend',
  data() {
    return {
      dialogFormVisible: false,
      updateVisible: false,
      friends: [],
      form: {
        name: '',
        summary: '',
        image: '',
        bgColor: '',
        link: ''
      },
      updateForm: {
        name: '',
        summary: '',
        image: '',
        bgColor: '',
        link: ''
      }
    }
  },
  created() {
    this.getAllFriend()
  },
  methods: {
    add() {
      this.dialogFormVisible = true
    },
    async handleEdit(item) {
      await this.getFriendByid(item.id)
      this.updateVisible = true
    },
    async getFriendByid(id) {
      try {
        const res = await friend.getFriend({id: id})
        this.updateForm = res
      } catch (error) {
        console.log(error)
      }
    },
    handleDelete(item) {
      this.$confirm('此操作将永久删除该好友, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除后刷新列表
        this.deleteFriend(item.id)
      })
    },
    async deleteFriend(id) {
       try {
        const res = await friend.delFriend({id: id})
        if (res.error_code === 0) {
           this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getAllFriend()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async addFriend() {
      try {
        const res = await friend.addFriend(this.form)
        if (res.error_code === 0) {
          this.$message.success(`${res.msg}`)
          this.dialogFormVisible = false
        }
      } catch (error) {
        console.log(error)
      }
      // 添加后刷新列表
      this.getAllFriend()
    },
    async getAllFriend() {
      try {
        const res = await friend.getFrinds()
        this.friends = res
      } catch (error) {
        console.log(error)
      }
    },
    async updateFriend() {
      try {
        const res = await friend.updateFrinds(this.updateForm)
        if (res.error_code === 0) {
          this.$message.success(`${res.msg}`)
          this.updateVisible = false
        }
      } catch (error) {
        console.log(error)
      }
      // 添加后刷新列表
      this.getAllFriend()
    },
  },
  components: {
    friendItem
  }
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
  .link-wrap{
    display: flex;
    flex-wrap: wrap;
    .link-wrap-inner{
      margin: 10px 22px 24px 0;
    }
  }
  .link-btn-grop{
    display: flex;
    justify-content: space-between;
    padding: 0 36px;
  }
}
</style>

<style lang="scss">
.frend-eg-wrap{
  display: flex;
}
.observe{
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
