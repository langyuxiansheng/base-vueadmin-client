<template>
    <div>
        <TableUtilContainer :utils="{
            left:[{label:'',slot:'add'}],
            right:[{label:'',slot:'search'}],
        }">
            <el-button slot="add" type="primary" icon="el-icon-plus" plain @click="showDialog ({type:'add'})">添加角色</el-button>
        </TableUtilContainer>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-tree :data="data5" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
                            <el-button type="text" size="mini" @click="() => append(data)">
                                Append
                            </el-button>
                            <el-button type="text" size="mini" @click="() => remove(node, data)">
                                Delete
                            </el-button>
                        </span>
                    </span>
                </el-tree>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getPlatformRoles, delPlatformRole } from '@/http';
import RoleFormDialog from './form/RoleFormDialog';
export default {
    name: 'AdminManage',
    components: {
        RoleFormDialog
    },
    data () {
        const data = [{
            id: 1,
            label: '一级 1',
            children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                    id: 9,
                    label: '三级 1-1-1'
                }, {
                    id: 10,
                    label: '三级 1-1-2'
                }]
            }]
        }, {
            id: 2,
            label: '一级 2',
            children: [{
                id: 5,
                label: '二级 2-1'
            }, {
                id: 6,
                label: '二级 2-2'
            }]
        }, {
            id: 3,
            label: '一级 3',
            children: [{
                id: 7,
                label: '二级 3-1'
            }, {
                id: 8,
                label: '二级 3-2'
            }]
        }];
        return {
            table: {
                queryData: {
                    keyWord: null, //搜索关键字
                    page: 1,
                    limit: 10
                },
                data: [],
                total: 0
            },

            tableCols: [
                {
                    key: 'RoleName',
                    label: '角色'
                },
                {
                    key: 'operation',
                    label: '操作',
                    width: '180px'
                }
            ],

            data5: JSON.parse(JSON.stringify(data))
        };
    },
    created () {
        this.init();
    },
    methods: {

        async init () {
            const { data, total } = await getPlatformRoles(this.table.queryData);
            this.table.data = data;
            this.table.total = total;
        },

        /**
         * 表格搜索
         */
        tableSearch () {

        },

        /**
        * 翻页
        */
        handleCurrentChange (val) {
            this.table.queryData.page = val;
            this.init();
        },

        /**
	     * 添加角色
	     */
        showDialog ({ type }) {
            if (type === 'add') {
                this.$refs.RoleFormDialog.init({ title: '添加角色' });
            }
        },

        /**
         * 注销平台管理员
         */
        delRole (RoleID) {
            this.$confirm('此操作将注销该角色, 是否继续?', '敏感操作提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                type: 'warning'
            }).then(async () => {
                const { code } = await delPlatformRole(RoleID);
                if (code === 200) {
                    this.$message.success(this.$t('msg.deleted_success'));
                    this.init();
                }
            });
        },

        append (data) {
            const newChild = { id: data.id++, label: 'testtest', children: [] };
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },

        remove (node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        }
    }
};
</script>
