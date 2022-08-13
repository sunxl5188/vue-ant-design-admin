<template>
  <div class="cropper-app">
    <a-form-model
          ref="formValidate"
          layout="horizontal"
          :model="formValidate"
          :rules="ruleValidate"
          :label-col="{span:5}"
          :wrapper-col="{span:12}"
          @submit.prevent="submitSave"
        >
      <a-form-model-item label="封面上传" prop="mainImage">
        <div class="list-img-box">
          <div v-if="formValidate.mainImage !== ''">
            <img :src="formValidate.mainImage" style='width:300px;height:150px' alt="自定义封面">
          </div>
          <div v-else class="upload-btn" style="height: 120px;" @click="uploadPicture('flagImg')">
            <i class="el-icon-plus" style="font-size: 30px;"></i>
            <span>封面设置</span>
          </div>
        </div>
        <input type="hidden" v-model="formValidate.mainImage" placeholder="请添加封面">
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{span:12,offset:5}">
        <a-button type="primary" html-type="submit">
          提交
        </a-button>
      </a-form-model-item>
    </a-form-model>

    <!-- 剪裁组件弹窗 -->
    <a-modal
      title="裁切封面"
      :visible="cropperModel"
      :confirm-loading="false"
      :footer="null"
      width="950px"
      @ok="handleConfirm"
      @cancel="cropperModel=false"
    >
      <upload-cropper
        :Name="cropperName"
        @uploadImgSuccess = "handleUploadSuccess"
        ref="child">
      </upload-cropper>
    </a-modal>

    <!--查看大封面-->
    <a-modal
      title="查看大封面"
      :visible="imgVisible"
      :confirm-loading="false"
      :closable="false"
      @cancel="imgVisible=false"
    >
      <img :src="imgName" v-if="imgVisible" style="width: 100%" alt="查看">
    </a-modal>
  </div>
</template>

<script>
import uploadCropper from '@/components/UploadCropper'

export default {
  name: 'Tailoring',
  components: { uploadCropper },
  data () {
    return {
      formValidate: {
        mainImage: ''
      },
      ruleValidate: {
        mainImage: [
          { required: true, message: '请上传封面', trigger: 'blur' }
        ]
      },
      // 裁切图片参数
      cropperModel: false,
      cropperName: '',
      imgName: '',
      imgVisible: false
    }
  },
  mounted () {
    // console.log(this.http)
  },
  methods: {
    // 封面设置
    uploadPicture (name) {
      this.cropperName = name
      this.cropperModel = true
    },
    // 图片上传成功后
    handleUploadSuccess (data) {
      console.log(data)
      switch (data.name) {
        case 'flagImg':
          this.formValidate.mainImage = 'http://ydfblog.cn/dfs/' + data.url
          console.log('最终输出' + data.name)
          break
      }
      this.cropperModel = false
    },
    handleConfirm () {},
    submitSave () {}
  }
}
</script>

<style scoped>
  .upload-list-cover{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 40px;
    align-items: center;
    background: rgba(0,0,0,.6);
    opacity: 0;
    transition: opacity 1s;
  }
  .cover_icon {
    font-size: 30px;
  }
  .upload-btn{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: 1px solid #cccccc;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 1px #cccccc;
  }
  .upload-btn:hover {
    border: 1px solid #69b7ed;
  }
  .upload-btn i{
    margin: 5px;
  }
</style>
