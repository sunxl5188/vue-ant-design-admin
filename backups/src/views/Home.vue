<template>
  <el-row>
    <el-col :span="24">111</el-col>
  </el-row>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      source: [
        {
          id: 1,
          name: "名字",
          attr: 1,
          sex: 1,
          status: 1,
          date: "2021-10-01",
          url: require("../assets/images/003.jpg"),
        },
        {
          id: 2,
          name: "名字2",
          attr: 1,
          sex: 0,
          status: 1,
          date: "2021-10-03",
          url: require("../assets/images/002.jpg"),
        },
        {
          id: 3,
          name: "名字2",
          attr: 1,
          sex: 0,
          status: 1,
          date: "2021-10-07",
          url: require("../assets/images/001.jpg"),
        },
      ],
      propAndTit: [
        {
          label: "姓名",
          name: "name",
        },
        {
          label: "日期",
          name: "date",
          sortable: true,
        },
        {
          label: "图片",
          name: "url",
          type: "image",
        },
      ],
    };
  },
  methods: {
    getSelection(ids) {
      console.log(ids);
    },
    sortChange(prop, order) {
      console.log(prop, order);
    },
  },
  components: {},
};
</script>
