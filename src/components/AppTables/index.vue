<template>
    <card-container class="app-table">
        <!-- 顶部状态栏 -->
        <slot name="topBar"></slot>
        <!-- 表格工具栏 -->
        <div class="app-table-utils">
            <el-row :gutter="0">
                <el-form class="app-util-form" :inline="true" @submit.native.prevent>
                    <el-col :span="utils.cols && utils.cols[0] || cols[0]" class="flex-container">
                        <el-form-item v-for="(item,index) in utils.left" :key="index" :label="item.label">
                            <slot :name="item.slot"></slot>
                        </el-form-item>
                    </el-col>
                    <el-col :span="utils.cols && utils.cols[1] || cols[1]" class="flex-container rh-text-right">
                        <el-form-item v-for="(item,index) in utils.right" :key="index" :label="item.label">
                            <slot :name="item.slot"></slot>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
        </div>
        <!-- 表格状态栏 -->
        <slot name="tableBar"></slot>
        <!-- 普通表格 -->
        <el-table
            v-if="table.tableType === 1"
            :data="table.data"
            stripe>
            <el-table-column
                v-for="(col,k) in table.cols"
                :key="k"
                :show-overflow-tooltip="col.key !== 'operation' && !col.overflow"
                :align="col.align || 'center'"
                :width="col.width || 'auto'"
                :label="col.label">
                <template slot-scope="{row}">
                    <slot name="column" :data="{row,col}">
                        <!-- <template v-if="col.key === 'operation'">
                            <el-button type="text">操作按钮</el-button>
                            <el-button type="text">
                                <router-link class="rh-link-to" :to="`/peoples/admin/logList`">跳转链接</router-link>
                            </el-button>
                        </template>
                        <template v-else>{{row[col.key] || '-'}} </template> -->
                    </slot>
                </template>
            </el-table-column>
        </el-table>
        <!-- 多类型表格 -->
        <el-table
            v-if="table.tableType === 2"
            :data="table.data"
            stripe>
            <template v-for="(col,k) in table.cols">
                <el-table-column
                    v-if="col.types.includes(Number(include))"
                    :key="k"
                    :show-overflow-tooltip="col.key !== 'operation' && !col.overflow"
                    :align="col.align || 'center'"
                    :width="col.width || 'auto'"
                    :label="col.label">
                    <template slot-scope="{row}">
                        <slot name="column" :data="{row,col}">
                            <!-- <template v-if="col.key === 'operation'">
                                <el-button type="text">操作按钮</el-button>
                                <el-button type="text">
                                    <router-link class="rh-link-to" :to="`/peoples/admin/logList`">跳转链接</router-link>
                                </el-button>
                            </template>
                            <template v-else>{{row[col.key] || '-'}} </template> -->
                        </slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <!-- 自定义表格 -->
        <template v-else-if="table.tableType == 3">
            <slot name="appTable" :data="{table}"></slot>
        </template>
        <el-pagination
            v-if="paginationAuths.includes(table.tableType)"
            class="table-pagination"
            @current-change="handleCurrentChange"
            :current-page="table.page"
            :page-size="config.table.pagination.size"
            :page-sizes="config.table.pagination.sizes"
            :layout="config.table.pagination.layout"
            :total="table.total">
        </el-pagination>
        <!-- 其它组件 如表格的dialog -->
        <slot name="other"></slot>
    </card-container>
</template>
<script>
export default {
    data() {
        return {
            cols: [12, 12],
            paginationAuths: [1, 2], //哪种表格显示分页器
            demo: { //test params
                table: {
                    queryData: { //查询参数
                        keyWord: null,
                        page: 1,
                        limit: 10
                    },
                    data: [], //表格数据
                    total: 0, //总页数
                    page: 1, //页码索引
                    tableType: 3, //表格类型
                    utils: { //表格工具栏
                        left: [{ label: '', slot: 'add' }],
	                right: [{ label: '', slot: 'search' }]
                    },
                    cols: [ //表格列配置
                        {
                            key: 'id',
                            label: '机构名称'
                        },
                        {
                            key: 'operation',
                            width: '200px',
                            label: '操作'
                        }
                    ]
                }
            }
        };
    },
    props: {
        utils: { //表格工具栏
            left: Array,
            right: Array,
            type: Object,
            cols: Object,
            default() {
                return {
                    left: [{ label: '', slot: 'add' }],
                    right: [{ label: '', slot: 'search' }],
                    cols: [12, 12]
                };
            }
        },
        table: {
            type: Object,
            data: [], //表格数据
            page: 1, //页码索引
            total: 0, //总页数
            cols: [], //表格列配置
            tableType: 1, //1 普通表格 2 多类型表格 3 自定义表格
            default() {
                return {
                    data: [],
                    page: 1,
                    total: 0,
                    cols: [{
                        key: '',
                        label: ''
                    }],
                    tableType: 1
                };
            }
        },
        include: null //表格多类型区分字段
    },
    computed: {
        config() {
            console.log(this.table);
            return this.$store.state.config;
        }
    },
    methods: {

        /**
         * 翻页
         */
        handleCurrentChange(page) {
            this.$emit(`pageChange`, page);
        }
    }
};
</script>
