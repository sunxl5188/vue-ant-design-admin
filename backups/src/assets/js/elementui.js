import { Button, Table, TableColumn, Card, Icon, Pagination, Image, Row, Col } from "element-ui";

const elementUI = {
  install: (Vue) => {
    Vue.use(Button);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(Card);
    Vue.use(Icon);
    Vue.use(Pagination);
    Vue.use(Image);
    Vue.use(Row);
    Vue.use(Col);
  },
};

export default elementUI;
