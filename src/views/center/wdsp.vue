<template>
  <div>
    <el-button v-if="this.$store.getters.GET_USER.sfrz === 1" type="text" style="float: right;margin-right: 110px" @click="tjVideo()">发布视频</el-button>
    <div>
      <div v-if="page.total !== 0" class="left2">
      <!--一条新闻-->
      <div class="ytxw" v-for="video in page.records">
        <!--新闻右侧-->
        <div class="xwyc">
          <router-link :to="{name: '',query: {id: video.id}}"><h3 style="height: 60px">{{video.videoTitle}}</h3></router-link>
          <router-link :to="{name: 'ckyh',query: {userId: video.user.userId}}"><h4 style="float: left">{{video.user.userName}}</h4></router-link>
          <div style="margin-top: 25px;float: left">
          <i class="vip"><img src="../../assets/icons/vip.png" alt="vip" /></i>
          <span style="font-size: 14px;margin-left: 20px">{{video.createTime}}</span>
          </div>
          <h5 style="font-size: 14px;float: right"><span style="font-size: 25px;margin-right: 6px" class="el-icon-s-help"></span>在看：{{video.count}}</h5>
          <div style="margin-left: 350px">
          <router-link :to="{name: '',query: {id: video.id}}"><span v-if="video.zt === 1"><img style="width: 100px" src="../../assets/static/dsh.jpg"></span></router-link>
          <router-link :to="{name: '',query: {id: video.id}}"><span v-if="video.zt === 2"><img style="width: 100px" src="../../assets/static/yfb.jpg"></span></router-link>
          <router-link :to="{name: '',query: {id: video.id}}"><span v-if="video.zt === 3"><img style="width: 100px" src="../../assets/static/ybh.jpg"></span></router-link>
          </div>
        </div>
        <!--新闻图-->
        <div class="xwt">
          <router-link :to="{name: '',query: {id: video.id}}">
            <video style="width: 100%;height: 100%" :src="video.videoUrl"></video>
          </router-link>
        </div>
      </div>
      <div style="float: left;margin: 30px 0 30px 50px">
        <el-pagination
          background="true"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.current"
          :page-sizes="[5, 8, 10, 15]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
    </div>
      <div style="padding: 200px 350px" v-else><h2 style="color: red">暂无数据</h2></div>
    </div>
    <el-dialog title="发布视频" :visible.sync="dialogVideoFormVisible">
      <el-form :model="video" :rules="rulesVideo" ref="video" label-width="100px" class="demo-ruleForm" style="margin-left: 140px">
        <el-form-item label="标题" prop="videoTitle">
          <el-input style="width: 300px" v-model="video.videoTitle"></el-input>
        </el-form-item>
        <el-form-item label="视频上传" ref="uploadElement" prop="videoId">
          <el-upload
            class="upload-demo"
            action="http://localhost:8081/car/video/uploadAlyVideo/"
            :on-success="successVideo"
            limit="1"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">支持上传mp4文件，且不超过1024MB</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="关联车型" prop="styleId">
          <el-select style="width: 300px" v-model="video.styleId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.styleId"
              :label="item.styleName"
              :value="item.styleId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="摘要" prop="videoText">
          <el-input type="textarea" style="width: 300px" v-model="video.videoText"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitVideoForm ('video')">保存</el-button>
          <el-button @click="resetForm ('video')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<!--选车-->
<script>
import Header from '../../components/header'
export default {
  name: 'wdsp',
  components: { Header },
  data () {
    return {
      dialogVideoFormVisible: false,
      video: {
        videoTitle: '',
        videoText: '',
        videoId: '',
        styleId: '',
        userId: ''
      },
      fileList: [],
      options: [],
      rulesVideo: {
        videoTitle: { required: true, message: '请输入标题', trigger: 'blur' },
        styleId: { required: true, message: '请关联车型', trigger: 'blur' },
        videoId: { required: true, message: '待上传', trigger: 'blur' }
      },
      page: {
        records: [],
        current: 1,
        total: 0,
        size: 5
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      const that = this
      this.$http.get('/video/listByUserId?userId=' + this.$store.getters.GET_USER.userId + '&size=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      const that = this
      this.$http.get('/video/listByUserId?userId=' + this.$store.getters.GET_USER.userId + '&size=' + that.page.size + '&current=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    submitVideoForm (formName) {
      const that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/video/saveVideo', that.video).then(function (rest) {
            that.dialogVideoFormVisible = false
            that.open()
          }, function (error) {
            console.log(error)
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    tjVideo () {
      this.dialogVideoFormVisible = true
      const that = this
      this.$http.get('/style/itemDjl').then(function (rest) {
        that.options = rest.data.data
      }, function (error) {
        console.log(error)
      })
      this.resetForm('video')
    },
    // 图片上传成功
    successVideo (response, file, fileList) {
      this.video.videoId = response.msg
      this.video.userId = this.$store.getters.GET_USER.userId
    },
    open () {
      this.$notify({
        title: '提示',
        message: '保存成功，等待管理员审核...',
        offset: 145,
        type: 'success'
      })
    }
  },
  created () {
    const that = this
    this.$http.get('/video/listByUserId?userId=' + this.$store.getters.GET_USER.userId).then(function (rest) {
      that.page = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>

  .left2 {
    width: 850px;
    float: left;
    margin-top: 20px;
  }
  .ytxw {
    width: 1000px;
    height: 200px;
    margin: 10px 20px;
    border: 1px solid #ccc;
    float: left;
  }
  .vip img{
    margin: 0 3px;
    width: 40px;
  }
  .xwt {
    width: 220px;
    height: 160px;
    float: left;
    margin: 20px;
  }
  .xwyc {
    width: 680px;
    height: 160px;
    margin: 20px 20px 20px 0;
    float: right;
  }

  a {
    text-decoration: none;
    color: #1f2129;
  }
  a:hover {
    color: red;
  }
</style>
