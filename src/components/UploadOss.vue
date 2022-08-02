<template>
  <div>
    <input type="file" name="file" :id="'file_'+ uid" :accept="acceptType" class="uploadBtn" @change="onChange">
    <a-space align="baseline" direction="horizontal" size="middle" v-if="listType==='list'">
      <a-button type="default" @click.stop="onSelectFile">选择文件</a-button>
      <a-button type="default" v-if="processPercent > 0 && processPercent < 100" @click="pauseUpload">暂停</a-button>
      <a-button type="default" v-if="processPercent > 0 && processPercent < 100" @click="resumeUpload">续传</a-button>
    </a-space>
    <a-space align="baseline" size="middle" v-if="listType==='picture-card'">
      <ul class="upload-list-picture-card">
        <li v-for="(item, i) in fileList" :key="i">
          <img :src="item.url" alt="">
          <span class="list-actions">
            <a-icon type="delete" @click.stop="deleteFile(i)" />
          </span>
        </li>
      </ul>
      <div class="upload-picture-card">
        <div @click.stop="onSelectFile">
          <div class="text-center">
            <a-icon type="plus" />
            <div class="upload-text">上传</div>
          </div>
        </div>
      </div>
    </a-space>
    <div class="text-gray-light" style="font-size: 12px;line-height: 1.5;">{{tips}}</div>
    <div class="fileList" v-if="listType==='list'">
      <div class="fileListItem" v-for="(item, i) in fileList" :key="item.name + i">
        <div class="fileListItemInfo" :class="item.status">
          <a-icon type="paper-clip"/>
          <span class="fileName" :title="item.name">{{item.name}}</span>
          <a-icon type="delete" class="close" @click="deleteFile(i)"/>
        </div>
        <a-progress
          :percent="processPercent"
          :show-info="true"
          status="active"
          :strokeWidth="2"
          v-if="item.status === ''"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OSS from 'ali-oss'
const perfix = process.env.VUE_APP_PREFIX

export default {
  name: 'UploadOss',
  props: {
    listType: {
      type: String,
      default: 'picture-card'
    },
    fileList: {
      type: Array,
      default: () => {
        return []
      }
    },
    tips: {
      type: String,
      default: '只允许上传1张,只能上传jpg,png,gif文件，且不超过500kb'
    },
    accept: {
      type: String,
      default: '.jpg,.gif,.jpeg,.png'
    },
    limit: {
      type: [Number, String],
      default: 1
    }
  },
  model: {
    prop: 'fileList',
    event: 'input'
  },
  data () {
    return {
      uid: '',
      ossConfig: {
        region: 'oss-cn-beijing',
        accessKeyId: '',
        accessKeySecret: '',
        bucket: '名称',
        stsToken: ''
      },
      baseAli: 'oss-cn-beijing.aliyuncs.com',
      client: {},
      tempCheckpoint: '',
      processPercent: 0,
      ossSavePath: '',
      fileObj: '',
      suffix: '',
      acceptType: ''
    }
  },
  created () {
    const removeTimes = _.debounce(function () {
      sessionStorage.removeItem(perfix + 'times')
    }, 1000)
    const times = new Date().getTime()
    if (sessionStorage.getItem(perfix + 'times') === null) {
      sessionStorage.setItem(perfix + 'times', times)
    }
    if (times - sessionStorage.getItem(perfix + 'times') === 0) {
      this.$get('/admin/upload/alibabaSTSToken').then(res => {
        if (res.status === 1) {
          sessionStorage.setItem('ossAccess', JSON.stringify(res.data))
        }
      })
    } else {
      removeTimes()
    }
    _.delay(() => {
      const data = sessionStorage.getItem('ossAccess') ? JSON.parse(sessionStorage.getItem('ossAccess')) : ''
      this.createOSS(data)
    }, 1000)
  },
  mounted () {
    if (this.accept.includes('jpg') || this.accept.includes('gif') || this.accept.includes('png')) {
      this.acceptType = 'image/*'
    }
    if (this.accept.includes('mp4')) {
      this.acceptType = 'video/*'
    }
    if (this.accept.includes('mp3')) {
      this.acceptType = 'audio/*'
    }
  },
  methods: {
    createOSS (data) {
      this.client = new OSS({
        region: 'oss-cn-beijing',
        accessKeyId: data.AccessKeyId,
        accessKeySecret: data.AccessKeySecret,
        stsToken: data.SecurityToken,
        bucket: '名称'
      })
      this.uid = this.uuid()
    },
    onSelectFile () {
      if (this.fileObj) {
        // 提示上传成功后选择文件
        this.$message.error('当前上传任务还未完成，请在完成后选择上传文件！')
      } else if (this.limit === this.fileList.length || this.limit < this.fileList.length) {
        layer.alert(`最多上传${this.limit}个文件，请删除原有文件后再上传!`, { icon: 2 })
      } else {
        document.getElementById('file_' + this.uid).click()
      }
    },
    onChange () {
      const fileObj = this.fileObj = document.getElementById('file_' + this.uid).files[0]
      this.suffix = fileObj.name.substring(fileObj.name.lastIndexOf('.'), fileObj.name.length)
      this.fileList.push({
        name: fileObj.name,
        url: '',
        status: ''
      })
      this.$nextTick(() => {
        this.uploadFile()
      })
    },
    async uploadFile () {
      this.ossSavePath = process.env.VUE_APP_OSS + '/' + this.$moment().format('yyyyMMDD') + '/' + this.uid + this.suffix
      const accept = this.accept.split(',')
      const isAllow = accept.indexOf(this.suffix)
      if (isAllow === -1) {
        this.fileObj = ''
        layer.alert('上传文件格式不正确', { icon: 2 })
        return false
      }
      const isOverLimit500M = (this.fileObj.size / 1024 / 1024 / 100) <= 5
      if (!isOverLimit500M) {
        this.fileObj = ''
        layer.alert('上传文件不得大于500MB!', { icon: 2 })
        return false
      }
      try {
        const self = this
        const result = await this.client.multipartUpload(this.ossSavePath, this.fileObj,
          {
            progress: function (p, checkpoint) { // 如果需要显示上传进度则需要使用progress函数
              self.processPercent = Math.floor(p * 100)
              // 断点记录点。浏览器重启后无法直接继续上传，您需要手动触发上传操作。
              self.tempCheckpoint = checkpoint// 记录上传断点
            },
            meta: {
              year: '',
              people: ''
            },
            headers: {
              'Content-Disposition': `attachment; filename=${encodeURIComponent(this.fileObj.name)}`,
              'Cache-Control': ''
            }
          })
        this.setResponse(result)
      } catch (e) {
        console.log(e)
      }
    },
    uuid () { // 类似于获取随机字符段
      const s = []
      const hexDigits = '0123456789qwertyuiopasdfghjklzxcvbnm'
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-'
      return s.join('')
    },
    pauseUpload () {
      this.client.cancel()
    },
    async resumeUpload () {
      try {
        const self = this
        const result = await this.client.multipartUpload(this.ossSavePath, this.fileObj, {
          checkpoint: self.tempCheckpoint,
          progress: (p, cpt, res) => {
            // 为了实现断点上传，您可以在上传过程中保存断点信息（checkpoint）。发生上传错误后，将已保存的checkpoint作为参数传递给multipartUpload，此时将从上次上传失败的地方继续上传。
            self.tempCheckpoint = cpt
            // 获取上传进度。
            self.processPercent = Math.floor(p * 100)
          }
        })
        this.setResponse(result)
      } catch (e) {
        console.log(e)
      }
    },
    setResponse (result) {
      const index = this.fileList.length - 1
      if (result) {
        this.fileList[index].url = 'https://' + this.ossConfig.bucket + '.' + this.baseAli + '/' + result.name
        this.fileList[index].status = 'done'
        // console.log(this.fileList[index].url)
        this.$nextTick(() => {
          this.fileObj = ''
          this.suffix = ''
          this.tempCheckpoint = ''
          this.ossSavePath = ''
        })
      } else {
        this.fileList[index].status = 'error'
      }
      this.$nextTick(() => {
        this.$emit('input', this.fileList)
      })
    },
    // 删除已上传文件
    deleteFile (i) {
      layer.confirm('您确定要删除？', { icon: 3 }, async (n) => {
        layer.close(n)
        const arr = _.cloneDeep(this.fileList)
        const fileName = arr[i].url.replace('https://' + this.ossConfig.bucket + '.' + this.baseAli + '/', '')
        if (arr[i].status) {
          const result = await this.client.delete(fileName)
          console.log(result.res.statusCode)
        }
        _.pullAt(arr, i)
        this.$nextTick(() => {
          this.$emit('input', arr)
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
  @width: 148px;

  .ant-space-item{
    margin-right: 0 !important;
  }

  .uploadBtn {
    position: fixed;
    clip: rect(0 0 0 0);
  }

  .upload-list-picture-card {
    margin: 0;
    display: inline;
    vertical-align: top;

    & > li {
      overflow: hidden;
      background-color: #fff;
      border: 1px solid #c0ccda;
      border-radius: 6px;
      width: @width;
      height: @width;
      margin: 0 8px;
      display: inline-block;
      position: relative;

      & > img {
        width: 100%;
        height: 100%;
      }

      & > span {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        -webkit-transition: all .3s ease 0s;
        -moz-transition: all .3s ease 0s;
        -ms-transition: all .3s ease 0s;
        transition: all .3s ease 0s;

        & .anticon-delete {
          color: #fff;
          cursor: pointer;
          font-size: 20px;
        }
        &:hover {
          opacity: 1;
        }
      }
    }
  }

  .upload-picture-card{
    width: @width;
    height: @width;
    border: 1px dashed #d9d9d9;
    background: #fbfdff;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    vertical-align: top;
    cursor: pointer;
    display:inline-block;
    color: #8c939d;

    & > div{
      width: @width;
      height: @width;
      display:flex;
      justify-content:center;
      align-items:center;

      & .anticon-plus{
        font-size: 28px;
      }

      & .upload-text {
        line-height: 30px;
      }
    }
  }

  .fileList {
    padding-top: 15px;

    & > .fileListItem {
      max-width: 280px;
      margin-bottom: 8px;
      line-height: initial;

      & .fileListItemInfo {
        display: flex;
        justify-content: start;
        align-items: flex-end;
        position: relative;
        padding: 0 5px;

        & .anticon-paper-clip {
          height: 17px;
        }

        & .fileName {
          max-width: 240px;
          height: 21px;
          line-height: 21px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          padding-right: 25px;
        }

        & .close {
          width: 14px;
          height: 14px;
          position: absolute;
          right: 0;
          bottom: 4px;
          cursor: pointer;
          z-index: 10;
          display: none;
          font-size: 12px !important;
        }

        &.error {
          color: red;

          & .close {
            display: inline-block;
          }
        }
      }

      &:hover {

        & .fileListItemInfo {
          background: #e6f7ff;

          & .close {
            display: inline-block;
          }
        }
      }
    }
  }
</style>
