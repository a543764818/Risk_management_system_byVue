import Vue from 'vue';
import {
    Button,
    Form,
    FormItem,
    Input,
    Message,
    MessageBox,
    Container,
    Aside,
    Header,
    Main,
    Menu,
    MenuItem,
    Submenu,
    Breadcrumb,
    BreadcrumbItem,
    Tooltip,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Tag,
    Popover,
    Dialog,
    Tabs,
    TabPane,
    Carousel,
    CarouselItem,
    Pagination
} from 'element-ui';

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Header);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tooltip)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
//挂载 全局的 方法
Vue.prototype.$message = Message;
Vue.prototype.$confirm=MessageBox.confirm;
