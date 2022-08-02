import {
  ConfigProvider,
  Layout,
  Menu,
  Icon,
  Button,
  DatePicker,
  TimePicker,
  Space,
  Avatar,
  Dropdown,
  Breadcrumb,
  Row,
  Col,
  message,
  notification,
  Modal, Progress, List, Popconfirm, Table, Form, FormModel, Input, Badge, Spin, Tabs, Tag, Select, Card, Checkbox, Radio, Cascader
} from 'ant-design-vue'

const components = [
  ConfigProvider,
  Layout,
  Menu,
  Icon,
  Button,
  DatePicker,
  TimePicker,
  Space,
  Avatar,
  Dropdown,
  Breadcrumb,
  Row,
  Col,
  Modal,
  Progress,
  List,
  Popconfirm,
  Table,
  Form,
  FormModel,
  Input,
  Select,
  Badge,
  Spin,
  Tabs,
  Tag,
  Card,
  Checkbox,
  Radio,
  Cascader
]

const install = (Vue) => {
  components.map(component => {
    Vue.use(component)
  })

  Vue.prototype.$message = message
  Vue.prototype.$notification = notification
  Vue.prototype.$info = Modal.info
  Vue.prototype.$success = Modal.success
  Vue.prototype.$error = Modal.error
  Vue.prototype.$warning = Modal.warning
  Vue.prototype.$confirm = Modal.confirm
  Vue.prototype.$destroyAll = Modal.destroyAll

  Vue.prototype.$confirmOpt = {
    title: '温馨提示',
    content: '',
    closable: true,
    width: 350
  }
}

export default {
  install
}
