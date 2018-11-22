<template>
    <div>
        <TableUtilContainer :utils="{
            left:[{label:'',slot:'add'}],
            right:[{label:'',slot:'search'}],
        }">
            <el-button slot="add" type="primary" icon="el-icon-plus" plain @click="showDialog ({type:'add'})">添加角色</el-button>
        </TableUtilContainer>
        <el-table :data="table.data" stripe>
            <el-table-column align="center" type="index" :label="$t('label.index_num')">
            </el-table-column>
            <el-table-column v-for="(col,k) in tableCols" :key="k" :show-overflow-tooltip="col.key !== 'operation'" :align="col.align || 'center'" :width="col.width" :label="col.label">
                <template slot-scope="scope">
                    <span v-if="col.key === 'operation'">
                        <el-button type="primary" @click="showDialog ({ type:'setting', roleId:scope.row.roleId })">设置权限</el-button>
                        <el-button type="danger" @click="delRole(scope.row.roleId)">注销</el-button>
                    </span>
                    <span v-if="col.key === 'RoleName'">
                        {{scope.row.isAdmin ? '超级管理员': scope.row[col.key]}}
                    </span>
                    <span v-else>{{scope.row[col.key]}}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="table-pagination" @current-change="handleCurrentChange" :page-size="$store.state.config.pagination.size" :page-sizes="$store.state.config.pagination.pageSizes" :layout="$store.state.config.pagination.layout" :total="table.total">
        </el-pagination>
        <RoleFormDialog ref="RoleFormDialog" @refresh="init()" />
        <SetPermissionFormDialog ref="SetPermissionFormDialog" @refresh="init()" />
    </div>
</template>

<script>
import { getPlatformRoles, delPlatformRole } from '@/http';
import RoleFormDialog from './form/RoleFormDialog';
import SetPermissionFormDialog from './form/SetPermissionFormDialog';
export default {
    name: 'AdminManage',
    components: {
        RoleFormDialog,
        SetPermissionFormDialog
    },
    data () {
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
                    key: 'roleName',
                    label: '角色'
                },
                {
                    key: 'operation',
                    label: '操作',
                    width: '180px'
                }
            ]
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
        showDialog ({ type, roleId }) {
            if (type === 'add') {
                this.$refs.RoleFormDialog.init({ title: '添加角色' });
            } else if (type === 'setting') {
                this.$refs.SetPermissionFormDialog.init({ title: '设置权限', roleId });
            }
        },

        /**
         * 注销平台管理员
         */
        delRole (roleId) {
            this.$confirm('此操作将注销该角色, 是否继续?', '敏感操作提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                type: 'warning'
            }).then(async () => {
                const { code } = await delPlatformRole(roleId);
                if (code === 200) {
                    this.$message.success(this.$t('msg.deleted_success'));
                    this.init();
                }
            });
        }
    }
};
</script>
