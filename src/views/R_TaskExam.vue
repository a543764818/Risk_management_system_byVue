<template>
    <div class="r_task_exam">
        <BreadNav :texts="['日常任务', '任务审核']" />
        <el-card>
            <el-row>
                <el-col :span="4" :offset="20"
                    ><el-button type="primary" @click="getList"  size="medium">查询</el-button>
                </el-col></el-row
            >
            <el-form inline>
                <el-form-item label="任务名称"
                    ><el-input
                        v-model="queryInfo.taskName"
                        class="inputInwidth"
                        clearable
                        @clear="getList"  size="medium"
                    ></el-input
                ></el-form-item>

                <el-form-item label="终端人员">
                    <el-select
                        v-model="queryInfo.staff"
                        clearable
                        @clear="getList"  size="medium"
                    >
                        <el-option
                            v-for="(item, index) in options"
                            :key="index"
                            :label="item.name"
                            :value="item.name"
                        ></el-option></el-select
                ></el-form-item>
                <el-form-item label="任务周期">
                    <el-input
                        v-model.number="queryInfo.cycle"
                        placeholder="输入任务的周期，单位天"
                        clearable
                        @clear="getList"  size="medium"
                    ></el-input>
                </el-form-item>
                
            </el-form>
            <TaskTable :tasklist="showData" tableType="examine" />
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.page"
                :page-sizes="[5, 10, 15]"
                :page-size="queryInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="queryInfo.total"
            >
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import TaskTable from 'components/routine_task/TaskTable';
import {
    GetTasks,
    setTask,
    getTaskDevices,
    AllocateTask,
    removeTask,
} from 'network/task';
import {mapState} from 'vuex'
export default {
    name: 'R_TaskManage',
    data() {
        return {
            queryInfo: {
                taskName: '',
                cycle: '',
                staff: '',
                pageSize: 10,
                page: 1,
                total: 0,
            },
            tasklist: [],
            showData: [],
        };
    },
    computed:{
        ...mapState({
            options:'staffs'
        })
    },
    methods: {
        async getList() {
            const res = await GetTasks({
                enterpriseName: sessionStorage.getItem('enterpriseName'),
                name: this.queryInfo.taskName,
                cycle: this.queryInfo.cycle,
                userName: this.queryInfo.staff,
                state:'1'
            });
            // console.log(res);

            if (!res.flag) return this.$message.error('任务列表获取失败');

            res.tasks.forEach((val) => {
                if (val.state != '0') {
                    this.tasklist.push({
                        ...val,
                        checked: false,
                    });
                }
            });
            console.log(res.tasks, this.tasklist);

            const { pageSize: size, page } = this.queryInfo;
            const offset = (page - 1) * size;
            this.showData = this.tasklist.slice(offset, offset + size);
            this.queryInfo.total =this.tasklist.length;
        },
        handleSizeChange(size) {
            this.queryInfo.pageSize = size;
            this.changeShowData();
        },
        handleCurrentChange(page) {
            this.queryInfo.page = page;
            this.changeShowData();
        },
        changeShowData() {
            const { page, pageSize: size } = this.queryInfo;
            const offset = (page - 1) * size;
            console.log(
                offset,
                size + offset,
                this.tasklist.slice(offset, offset + size)
            );

            this.showData = this.tasklist.slice(offset, offset + size);
        },
    },
    created() {
        this.getList();
    },
    components: {
        TaskTable,
    },
};
</script>

<style scoped lang="less">
.r_task_exam {
    .el-form {
        /deep/ input {
            width: 220px;
        }
    }
    .el-row {
        margin-bottom: 10px;
    }
}
</style>
