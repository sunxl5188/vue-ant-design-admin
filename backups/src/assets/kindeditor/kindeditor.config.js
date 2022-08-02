require('@@/kindeditor/kindeditor-all')

const config = {
  width: 800,
  height: 400,
  resizeType: 0, // 2或1或0，2时可以拖动改变宽度和高度，1时只能改变高度，0时不能拖动
  basePath: '/static/kindeditor/',
  allowPreviewEmoticons: false, // true时鼠标放在表情上可以预览表情。
  allowImageUpload: true, // true时显示图片上传按钮。
  uploadJson: 'http://www.api.me/index/kindeditor/index', // 指定上传文件的服务器端程序
  fileManagerJson: '', // 指定浏览远程图片的服务器端程序
  allowFileManager: true, // true时显示浏览远程服务器按钮。
  imageTabIndex: 1, // 图片弹出层的默认显示标签索引
  extraFileUploadParams: { id: '' }, // 上传图片、Flash、视音频、文件时，支持添加别的参数一并传到服务器
  filePostName: 'file', // 指定上传文件form名称
  items: [
    'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
    'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
    'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
    'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
    'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
    'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
    'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
    'anchor', 'link', 'unlink', '|', 'about'
  ],
  afterCreate: function () { // 设置编辑器创建后执行的回调函数。
    this.sync()
  },
  afterBlur: function () { // 编辑器失去焦点(blur)时执行的回调函数。
    this.sync()
  },
  afterChange: function () { // 编辑器内容发生变化后执行的回调函数。
    this.sync()
  }
}

export default function kindEditor (picker, options) {
  const opts = $.extend(config, options)
  window.KindEditor.create(picker, opts)
}
