<template>
  <div>
    <Header></Header>
    <div><!--:data="this.fForm"-->
      <el-upload
        action="http://localhost:8081/car/oss/file"
        list-type="picture-card"
        :auto-upload="true">
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <img width="100%" :src="dialogImageUrl" alt="">
    </div>

  </div>
</template>
<!--排行-->
<script>
import Header from '../components/header'
export default {
  name: 'ph',
  components: { Header },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fForm: {
        userId: 1
      }
    }
  },
  methods: {
    save () {
      this.$refs.upload.submit()
    },
    handleRemove (file) {
      console.log(file)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload (file) {
      console.log(file)
    }
  },
  created () {
    this.dialogImageUrl = 'https://superb-car.oss-cn-beijing.aliyuncs.com/2021/04/01/79de75d47d0c4a6d8efe29721358a2dc.jpg'
  }
}
</script>

<style scoped>

</style>
