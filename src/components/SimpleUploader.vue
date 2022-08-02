<template>
  <div id="uploader">
    <!-- 上传 -->
    <uploader
      ref="uploader"
      :options="options"
      :autoStart="false"
      @file-added="onFileAdded"
      @file-success="onFileSuccess"
      @file-progress="onFileProgress"
      @file-error="onFileError"
    >
      <uploader-unsupport></uploader-unsupport>
      <uploader-btn id="uploader-btn" :class="{'visibility-btn':!showBtn}" :attrs="attrs" ref="uploadBtn">
        {{btnText}}
      </uploader-btn>

      <uploader-list v-show="panelShow">
        <div class="file-panel" slot-scope="props" :class="{'collapse': collapse}">
          <div class="file-title">
            <h2>文件列表</h2>
            <div class="operate">
              <a-space align="center" direction="horizontal">
                <a-icon :type="collapse?'block':'minus'" @click="fileListShow" :title="collapse ? '展开':'折叠' "/>
                <a-icon type="close" @click="close" title="关闭"/>
              </a-space>
            </div>
          </div>

          <ul class="file-list">
            <li v-for="file in props.fileList" :key="file.id">
              <uploader-file :class="'file_' + file.id" ref="files" :file="file" :list="true"></uploader-file>
            </li>
            <div class="no-file" v-if="!props.fileList.length"><i class="iconfont icon-empty-file"></i> 暂无待上传文件</div>
          </ul>
        </div>
      </uploader-list>

    </uploader>
  </div>
</template>

<script>
import SparkMD5 from 'spark-md5'
// https://github.com/simple-uploader/Uploader/blob/develop/README_zh-CN.md#%E9%85%8D%E7%BD%AE
export default {
  name: 'SimpleUploader',
  props: {
    showBtn: { // 是否显示上传按钮
      type: Boolean,
      default: true
    },
    btnText: { // 上传按钮文字
      type: String,
      default: '选择文件'
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    params: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      options: {
        target: 'http://www.xxxx',
        chunkSize: '2048000',
        fileParameterName: 'file', // 上传文件时文件的参数名，默认 file
        maxChunkRetries: 3, // 最大自动失败重试上传次数
        testChunks: true, // 是否开启服务器分片校验
        // 服务器分片校验函数，秒传及断点续传基础
        checkChunkUploadedByResponse: function (chunk, message) {
          const objMessage = JSON.parse(message)
          if (objMessage.skipUpload) {
            return true
          }
          return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0
        },
        headers: {
          Authorization: 'access_token'
        },
        query: (file, chunk) => {
          return {
            ...file.params
          }
        }
      },
      attrs: {
        accept: this.accept
      },
      panelShow: false, // 选择文件后，展示上传panel
      collapse: false
    }
  },
  computed: {
    uploader () {
      return this.$refs.uploader.uploader
    }
  },
  methods: {
    onFileAdded (file) {
      this.panelShow = true
      this.computeMD5(file)
      // 2022/1/10 将额外的参数赋值到每个文件上，解决了不同文件使用不同params的需求
      file.params = this.params
      this.$emit('fileAdded')
    },
    onFileProgress (rootFile, file, chunk) {
      console.log(`上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`)
    },
    onFileSuccess (rootFile, file, response, chunk) {
      const res = JSON.parse(response)
      // 服务器自定义的错误（即虽返回200，但是是错误的情况），这种错误是Uploader无法拦截的
      if (!res.result) {
        this.$message({ message: res.message, type: 'error' })
        // 文件状态设为“失败”
        this.statusSet(file.id, 'failed')
        return
      }
      // 如果服务端返回需要合并
      if (res.needMerge) {
        // 文件状态设为“合并中”
        this.statusSet(file.id, 'merging')
        // api.mergeSimpleUpload({
        //   tempName: res.tempName,
        //   fileName: file.name,
        //   ...file.params
        // }).then(res => {
        //   // 文件合并成功
        //   this.$emit('fileSuccess')
        //   this.statusRemove(file.id)
        // }).catch(e => {})
        // 不需要合并
      } else {
        this.$emit('fileSuccess')
        console.log('上传成功')
      }
    },
    onFileError (rootFile, file, response, chunk) {
      this.$message({
        message: response,
        type: 'error'
      })
    },
    /**
       * 计算md5，实现断点续传及秒传
       * @param file
       */
    computeMD5 (file) {
      const fileReader = new FileReader()
      const time = new Date().getTime()
      const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
      let currentChunk = 0
      const chunkSize = 10 * 1024 * 1000
      const chunks = Math.ceil(file.size / chunkSize)
      const spark = new SparkMD5.ArrayBuffer()
      // 文件状态设为"计算MD5"
      this.statusSet(file.id, 'md5')
      file.pause()
      loadNext()
      fileReader.onload = e => {
        spark.append(e.target.result)
        if (currentChunk < chunks) {
          currentChunk++
          loadNext()
          // 实时展示MD5的计算进度
          this.$nextTick(() => {
            $(`.myStatus_${file.id}`).text('校验MD5 ' + ((currentChunk / chunks) * 100).toFixed(0) + '%')
          })
        } else {
          const md5 = spark.end()
          this.computeMD5Success(md5, file)
          console.log(`MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size} 用时：${new Date().getTime() - time} ms`)
        }
      }
      fileReader.onerror = function () {
        this.error(`文件${file.name}读取出错，请检查该文件`)
        file.cancel()
      }

      function loadNext () {
        const start = currentChunk * chunkSize
        const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
        fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end))
      }
    },
    computeMD5Success (md5, file) {
      file.uniqueIdentifier = md5
      file.resume()
      this.statusRemove(file.id)
    },
    fileListShow () {
      const $list = $('#uploader .file-list')
      if ($list.is(':visible')) {
        $list.slideUp()
        this.collapse = true
      } else {
        $list.slideDown()
        this.collapse = false
      }
    },
    close () {
      this.uploader.cancel()
      this.panelShow = false
    },
    /**
       * 新增的自定义的状态: 'md5'、'transcoding'、'failed'
       * @param id
       * @param status
       */
    statusSet (id, status) {
      const statusMap = {
        md5: {
          text: '校验MD5',
          bgc: '#fff'
        },
        merging: {
          text: '合并中',
          bgc: '#e2eeff'
        },
        transcoding: {
          text: '转码中',
          bgc: '#e2eeff'
        },
        failed: {
          text: '上传失败',
          bgc: '#e2eeff'
        }
      }
      this.$nextTick(() => {
        $(`<p class="myStatus_${id}"></p>`).appendTo(`.file_${id} .uploader-file-status`).css({
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          zIndex: '1',
          backgroundColor: statusMap[status].bgc
        }).text(statusMap[status].text)
      })
    },
    statusRemove (id) {
      this.$nextTick(() => {
        $(`.myStatus_${id}`).remove()
      })
    },
    error (msg) {
      this.$notify({
        title: '错误',
        message: msg,
        type: 'error',
        duration: 2000
      })
    }
  }
}
</script>

<style scoped lang="less">
  #uploader {
    /deep/ .uploader {
      position: static;
    }

    .file-panel {
      width: 520px;
      background-color: #fff;
      border: 1px solid #e2e2e2;
      border-radius: 7px 7px 0 0;
      box-shadow: 0 0 10px rgba(0, 0, 0, .2);
      position: fixed;
      right: 15px;
      bottom: 15px;
      z-index: 100;

      .file-title {
        display: flex;
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
        border-bottom: 1px solid #ddd;

        h2 {
          margin-bottom: 0;
          font-size: 18px;
        }

        .operate {
          flex: 1;
          text-align: right;
        }
      }

      .file-list {
        position: relative;
        height: 240px;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #fff;

        > li {
          background-color: #fff;
        }
      }

      &.collapse {
        .file-title {
          background-color: #E7ECF2;
        }
      }
    }

    .no-file {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 16px;
    }

    /deep/ .uploader-file-icon {
      &:before {
        content: '' !important;
      }

      &[icon=image] {
        background: url(../assets/images/image-icon.png);
      }

      &[icon=video] {
        background: url(../assets/images/video-icon.png);
      }

      &[icon=document] {
        background: url(../assets/images/text-icon.png);
      }
    }

    /deep/ .uploader-file-actions > span {
      margin-right: 6px;
    }

    /deep/ .uploader-btn {
      background: #1890ff;
      border-color: #1890ff;
      color: #fff;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
    }
  }

  /* 隐藏上传按钮 */
  .visibility-btn {
    position: fixed;
    left: -999px;
    clip: rect(0, 0, 0, 0);
  }
</style>
