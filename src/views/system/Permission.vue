<template>
    <div class="app-permission">
        <TableUtilContainer :utils="{
            left:[{label:'',slot:'add'}],
            right:[{label:'',slot:'search'}],
        }">
            <el-button slot="add" type="primary" icon="el-icon-plus" plain @click="showDialog ({type:'add'})">添加权限</el-button>
        </TableUtilContainer>
        <el-row :gutter="20">
            <!-- <el-col :xs="24" :md="6" :lg="6">
                <el-tree class="app-tree" :data="trees" :props="treeConfig" node-key="id" default-expand-all :expand-on-click-node="false">
                    <div class="custom-tree-node" slot-scope="{ node, data }">
                        <span @contextmenu.prevent="showDialog ({type:'add',nodeData:data})">{{ node.label }}</span>
                        <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
                            <li>关闭</li>
                            <li>关闭其它</li>
                            <li>关闭全部</li>
                        </ul>
                    </div>
                </el-tree>
            </el-col> -->
            <el-col :xs="24" :md="24" :lg="24">
                <el-table :data="table.data" stripe>
                    <!-- <el-table-column align="center" type="index" :label="$t('label.index_num')"/> -->
                    <el-table-column v-for="(col,k) in tableCols" :key="k" :show-overflow-tooltip="col.key !== 'operation' && col.overflow" :align="col.align || 'center'" :width="col.width" :label="col.label">
                        <template slot-scope="scope">
                            <span v-if="col.key === 'operation'">
                                <el-button type="warning" @click="showDialog ({type:'update',data:scope.row})">编辑</el-button>
                                <el-button type="danger" @click="delHandler(scope.row.permissionId)">删除</el-button>
                            </span>
                            <span v-if="col.key === 'PermissionType'">
                                {{scope.row[col.key] == 1 ? '菜单':'按钮'}}
                            </span>
                            <span v-else>{{scope.row[col.key]}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination class="table-pagination" @current-change="handleCurrentChange" :page-size="$store.state.config.pagination.size" :page-sizes="$store.state.config.pagination.pageSizes" :layout="$store.state.config.pagination.layout" :total="table.total">
                </el-pagination>
            </el-col>
        </el-row>
        <PermissionFormDialog ref="PermissionFormDialog" @refresh="init()" />
    </div>
</template>

<script>
import { getPermissions, delPermission } from '@/http';
// import util from '@/common/method/util';
import PermissionFormDialog from './form/PermissionFormDialog.vue';
export default {
    name: 'AdminManage',
    components: {
        PermissionFormDialog
    },
    data () {
        return {
            visible: false,
            top: 0,
            left: 0,
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
                    key: 'permissionId',
                    label: '权限ID'
                },
                {
                    key: 'permissionName',
                    label: '权限名'
                },
                {
                    key: 'permissionType',
                    label: '权限类型'
                },
                {
                    key: 'parentId',
                    label: '权限父级ID'
                },
                {
                    key: 'path',
                    label: '菜单路径'
                },
                {
                    key: 'component',
                    label: '组件名称'
                },
                {
                    key: 'permissionValue',
                    label: '权限排序值'
                },
                {
                    key: 'meta',
                    label: '元值',
                    overflow: false
                },
                {
                    key: 'operation',
                    label: '操作',
                    width: '180px'
                }
            ],
            trees: [],
            treeConfig: {
                label: 'permissionName'
            }
        };
    },
    created () {
        this.init();
    },
    methods: {

        async init () {
            const { data, total } = await getPermissions(this.table.queryData);
            // const res = await getPermissions({});
            this.table.data = data.menus;
            this.table.total = total;
            // this.trees = util.toTree(res.data, 'ParentID', 'PermissionID', 0);
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
	     * 添加权限
	     */
        async showDialog ({ type, data, nodeData }) {
            if (type === 'add') {
                this.$refs.PermissionFormDialog.init({ type, title: '添加权限' });
            } else {
                this.$refs.PermissionFormDialog.init({ type, title: '编辑权限', data });
            }
        },

        /**
         * 删除权限
         */
        delHandler (permissionId) {
            this.$confirm('此操作将删除该权限, 是否继续?', '敏感操作提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                type: 'warning'
            }).then(async () => {
                const { code } = await delPermission(permissionId);
                if (code === 200) {
                    this.$message.success(this.$t('msg.deleted_success'));
                    this.init();
                }
            });
        },

        append (data) {

        },

        remove (node, data) {

        }
    }
};
</script>
