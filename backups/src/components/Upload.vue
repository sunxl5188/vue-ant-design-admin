<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div id="fileList" class="webUploader">
          <div id="EDIT_WU_FILE_0" class="image-item image-lg" fid="1">
            <img src="../../static/images/001.jpg" width="150" height="150">
            <div class="image-panel" style="display: block;">
              <span class="data">上传成功</span>
              <a href="javascript:void(0);" class="cancel">删除</a>
            </div>
            <div class="uploadIfy-progress" style="display: none;">
              <div class="uploadIfy-progress-bar" style="width: 100%;"></div>
            </div>
          </div>
        </div>
        <input type="hidden" name="file_id" v-model="file_id"/>
        <div id="picker">选择图片</div>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div id="fileList2" class="webUploader">
          <div class="uploadIfy-queue-item" id="EDIT_WU_FILE_1" fid="2">
            <div class="cancel"><a href="javascript:void(0);">X</a></div>
            <span class="fileName">05.jpg (187KB)</span><span class="data"></span>
            <div class="uploadIfy-progress" style="display: none;">
              <div class="uploadIfy-progress-bar"></div>
            </div>
          </div>
        </div>
        <input type="hidden" name="file_id2" v-model="file_id"/>
        <div id="picker2">选择文件</div>
      </div>
    </div>
  </div>
</template>

<script>
import webupload from '@~/js/webupload'

export default {
  name: 'Upload',
  data () {
    return {
      file_id: [],
      file_id2: []
    }
  },
  computed: {},
  mounted () {
    let self = this
    webupload(self.file_id, {fileList: {id: '#fileList', type: 'image'}})
    webupload(self.file_id2, {
      pick: '#picker2',
      fileSingleSizeLimit: 1024 * 1024 * 20,
      fileList: {id: '#fileList2', type: 'file'}
    })
  },
  methods: {}
}
</script>
