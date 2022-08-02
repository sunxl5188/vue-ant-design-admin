<template>
  <el-card class="box-card" shadow="never" :body-style="{ padding: 0 }">
    <div slot="header" class="d-flex justify-content-between">
      <strong>{{ title }}</strong>
      <slot name="headerRight" v-if="showHeaderBtn">
        <div>
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click.passive="deleteAll"
          ></el-button>
          <el-button
            size="mini"
            icon="el-icon-delete"
            @click.passive="editorAll"
          ></el-button>
        </div>
      </slot>
    </div>
    <el-table
      style="width: 100%"
      :data="source"
      :border="border"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
    >
      <el-table-column
        type="selection"
        width="45"
        align="center"
        v-if="selection"
      />
      <template v-for="(item, i) in propAndTit">
        <!--字段需要格式化的-->
        <el-table-column
          :label="item.label"
          :key="i"
          :align="item.align ? item.align : 'center'"
          :width="item.width ? item.width : ''"
          :prop="item.name"
          :formatter="formatAny"
          v-if="item.type === 'format'"
        />
        <!--显示图片字段-->
        <el-table-column
          :key="i"
          :align="item.align ? item.align : 'center'"
          :width="item.width ? item.width : ''"
          v-else-if="item.type === 'image'"
        >
          <template slot-scope="scope">
            <el-image
              :src="scope.row[item.name]"
              style="width: 60px; height: 60px; background: #dedede"
              fit="contain"
            />
          </template>
        </el-table-column>
        <!--显示字段的-->
        <el-table-column
          :label="item.label"
          :key="i"
          :align="item.align ? item.align : 'center'"
          :width="item.width ? item.width : ''"
          :prop="item.name"
          :sortable="item.sortable ? 'custom' : ''"
          show-overflow-tooltip
          v-else
        />
      </template>
      <el-table-column
        label="操作"
        align="center"
        :width="opeWidth ? opeWidth : ''"
      >
        <template slot-scope="scope">
          <!--插槽按钮-->
          <slot name="btn" :row="scope.row"></slot>
          <!--封存开启按钮-->
          <template v-if="sealed">
            <el-button
              type="text"
              @click="onStatus(scope.row)"
              v-if="scope.row.status === 0"
            >
              封存
            </el-button>
            <el-button type="text" @click="onStatus(scope.row)" v-else>
              开启
            </el-button>
          </template>
          <!--查看编辑按钮-->
          <el-button type="text" @click="lookUp(scope.row.id)" v-if="look">
            查看
          </el-button>
          <el-button type="text" @click="editor(scope.row.id)" v-if="edit">
            编辑
          </el-button>
          <el-button type="text" @click="deleteOne(scope.row.id)" v-if="edit">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" v-if="total > 0">
      <el-pagination
        background
        @current-change="pageChange"
        :total="total"
        :current-page.sync="thisPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
      />
    </div>
  </el-card>
</template>

<script>
export default {
  name: "myTable",
  props: {
    title: {
      // 表格标题
      type: String,
      required: true,
    },
    source: {
      // 数据源
      type: Array,
      required: true,
    },
    propAndTit: {
      // 表格要显示的列
      type: Array,
      required: true,
    },
    pageSize: {
      // 每页大小
      type: Number,
      default: 20,
    },
    currentPage: {
      // 当前分页
      type: Number,
      default: 1,
    },
    total: {
      // 分页总条数
      type: Number,
      default: 0,
    },
    border: {
      // 表格边框
      type: Boolean,
      default: false,
    },
    selection: {
      // 例表选择
      type: Boolean,
      default: false,
    },
    look: {
      // 查看按钮
      type: Boolean,
      default: false,
    },
    edit: {
      // 编辑按钮
      type: Boolean,
      default: true,
    },
    sealed: {
      // 是否显示封存按钮
      type: Boolean,
      default: false,
    },
    opeWidth: {
      // 操作单元宽度
      type: String,
      default: "",
    },
    showHeaderBtn: {
      // 是否显示批量操作按钮
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      thisPage: 0,
      multipleSelection: [],
    };
  },
  created() {
    this.thisPage = this.currentPage;
  },
  methods: {
    pageChange(page) {
      this.$emit("onChange", page);
    },
    editor(id) {
      this.$emit("onEditor", id);
    },
    deleteOne(id) {
      this.$emit("onDeleteOne", id);
    },
    lookUp(id) {
      this.$emit("onLookUp", id);
    },
    onStatus(row) {
      this.$emit("onStatus", row);
    },
    formatAny(row, column) {
      let string = "";
      switch (column.property) {
        case "sex":
          string = row.sex === 1 ? "男" : row.sex === 2 ? "女" : "未填写";
          break;
        case "phone":
          string = this.formatPhone(row.phone);
          break;
        case "status":
          string = row.status === 1 ? "是" : "否";
          break;
        case "attr":
          string = row.attr === 0 ? "预制" : "";
          break;
        case "need_arm":
          string = row.need_arm === 1 ? "是" : "否";
          break;
      }
      return string;
    },
    formatPhone(value) {
      let string = "--";
      if (value) {
        const first = value.substr(0, 3);
        const after = value.substr(value.length - 3);
        string = first + "*****" + after;
      }
      return string;
    },
    handleSelectionChange(val) {
      val.map((item) => {
        this.multipleSelection.push(item.id);
      });
    },
    handleSortChange(column) {
      const { prop, order } = column;
      this.$emit("sortChange", prop, order === null ? "" : order);
    },
    editorAll() {
      this.$emit("editorAll", JSON.stringify(this.multipleSelection));
    },
    deleteAll() {
      this.$emit("deleteAll", JSON.stringify(this.multipleSelection));
    },
  },
};
</script>

<style scoped lang="scss">
.box-card {
  border: none;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  & /deep/ .el-card__header {
    position: relative;
    &:before {
      position: absolute;
      left: 0;
      top: 33%;
      content: "";
      display: block;
      width: 4px;
      height: 34%;
      background: #409eff;
    }
    & strong {
      line-height: 30px;
    }
  }
  & .pagination {
    text-align: center;
    padding: 1.2rem 0;
  }
}
</style>
