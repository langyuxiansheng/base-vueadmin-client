<template>
    <DialogContainer :dialogConf="dialogConf">
        <el-row class="app-form" :gutter="$store.state.config.dialogFormGutterWidth">
            <el-col :span="24">
                <el-tree
                    :props="treeConfig"
                    show-checkbox
                    node-key="permissionId"
                    ref="tree"
                    :default-checked-keys="defaulfCheckedNodes"
                    :highlight-current="true"
                    :data="trees">
                </el-tree>
            </el-col>
            <el-col :span="24">
                <div class="plat-submit-box rh-text-center">
                    <el-button type="primary" @click="submitForm('AppForm')">立即设置</el-button>
                    <el-button @click="resetForm('AppForm')">取消</el-button>
                </div>
            </el-col>
        </el-row>
    </DialogContainer>
</template>
<script type="text/ecmascript-6">
import { setPlatformRolePermission, getPermissions } from '@/http';
import util from '@/common/method/util';

export default {
    name: 'SetPermissionFormDialog',
    data () {
        const { dialogSingleFormWidth } = this.$store.state.config;
        return {
            dialogConf: {
                width: dialogSingleFormWidth,
                isShow: false,
                center: true,
                title: null
            },
            queryData: {
                roleId: null //角色ID
            },

            //数据
            sendData: {
                permissionIds: [], //权限ID列表
                roleId: null //角色ID
            },
            trees: [], //树形
            treeConfig: {
                label: 'permissionName'
            },
            checkedNodes: []
        };
    },

    methods: {

        /**
         * 修改初始化
         */
        init ({ title, roleId }) {
            this.dialogConf.isShow = true;
            this.sendData.roleId = roleId;
            this.queryData.roleId = roleId;
            if (title) this.dialogConf.title = title;
            this.getTrees();
        },

        /**
         * 获取权限列表树
         */
        async getTrees() {
            //获取已分配的权限
            const {data} = await getPermissions(this.queryData);
            const {menus, onMenus} = data;
            this.trees = util.toTree(menus, 'parentId', 'permissionId', 0);
            this.checkedNodes = onMenus;
        },

        /**
         * 提交表单
         */
        async submitForm (formName) {
            const nodes = this.$refs.tree.getCheckedNodes();
            let menus = [];
            for (const m of nodes) {
                if (m.parentId == 0) {
                    menus.push(m.permissionId);
                }
                if (m.parentId) {
                    menus.push(m.parentId);
                    menus.push(m.permissionId);
                }
            }
            //去重
            this.sendData.permissionIds = Array.from(new Set(menus));
            const { code } = await setPlatformRolePermission(this.sendData);
            if (code === 200) {
                this.$message.success(this.$t('msg.set_success'));
                this.dialogConf.isShow = false;
                this.$emit('refresh');
            };
        },

        /**
		 * 重置表单
		 * @param formName
		 */
        resetForm (formName) {
            this.dialogConf.isShow = false;
        }
    },
    computed: {
        defaulfCheckedNodes() {
            const menus = this.trees;
            let onMenu = this.checkedNodes.map(item => item.permissionId);
            if (menus && menus.length > 0 && onMenu && onMenu.length > 0) {
                for (const item of menus) {
                    for (const checkedId of onMenu) {
                        if (item.children && item.permissionId == checkedId) {
                            onMenu.splice(onMenu.findIndex(i => checkedId == i), 1);
                        }
                    }
                }
            }
            return onMenu;
        }
    }
};
</script>
