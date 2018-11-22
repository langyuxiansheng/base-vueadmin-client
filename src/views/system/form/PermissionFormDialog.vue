<template>
    <DialogContainer :dialogConf="dialogConf">
        <el-row class="app-form" :gutter="$store.state.config.dialogFormGutterWidth">
            <el-form :model="sendData" :label-position="$store.state.config.labelPosition" :rules="rules" ref="AppForm" label-width="125px" @submit.native.prevent>
                <el-col :span="12">
                    <el-form-item label="权限名称" prop="permissionName">
                        <el-input v-model="sendData.permissionName" placeholder="请输入权限名称"></el-input>
                    </el-form-item>
                    <el-form-item label="权限类型" prop="permissionType">
                        <el-radio-group v-model="sendData.permissionType">
                            <el-radio label="1">菜单</el-radio>
                            <el-radio label="2">按钮</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="权限排序值">
                        <el-input v-model="sendData.permissionValue" placeholder="请输入权限排序值"></el-input>
                    </el-form-item>
                    <el-form-item label="父级菜单">
                        <el-select class="select-block" v-model="sendData.parentId" placeholder="请选择父级菜单">
                            <el-option label="默认顶级" :value="0" />
                            <el-option v-for="item in permissions" :key="item.permissionId" :label="item.permissionName" :value="item.permissionId" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="菜单路径">
                        <el-input v-model="sendData.path" placeholder="请输入菜单路径"></el-input>
                    </el-form-item>
                    <el-form-item label="组件名称">
                        <el-input v-model="sendData.component" placeholder="请输入组件名称"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单名称">
                        <el-input v-model="sendData.meta.title" placeholder="请输入菜单名称"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单图标类名">
                        <el-input v-model="sendData.meta.icon" placeholder="请输入菜单图标类名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <div class="plat-submit-box">
                        <el-form-item class="rh-text-center">
                            <el-button type="primary" @click="submitForm('AppForm')">{{this.type === 'add' ? '立即添加':'立即修改'}}</el-button>
                            <el-button @click="resetForm('AppForm')">重新填写</el-button>
                        </el-form-item>
                    </div>
                </el-col>
            </el-form>
        </el-row>
    </DialogContainer>
</template>
<script type="text/ecmascript-6">
import { getPermissions, addPermission, updatePermission } from '@/http';

export default {
    name: 'PermissionFormDialog',
    data () {
        const { dialogFormWidth } = this.$store.state.config;
        return {
            dialogConf: {
                width: dialogFormWidth,
                isShow: false,
                center: true,
                title: null
            },

            //数据
            sendData: {
                permissionName: null, //权限名称
                permissionType: 1, //1菜单 2其他
                permissionValue: null, //权限值
                parentId: null, //父级ID
                path: null, //菜单路径
                component: null, //组件名称
                meta: {
                    requireAuth: false, //是否验证
                    title: null, // 菜单名称
                    icon: null //菜单图标
                }
            },

            initData: {
                permissionName: null, //权限名称
                permissionType: 1, //1菜单 2其他
                permissionValue: null, //权限值
                parentId: null, //父级ID
                path: null, //菜单路径
                component: null, //组件名称
                meta: {
                    requireAuth: false, //是否验证
                    title: null, // 菜单名称
                    icon: null //菜单图标
                }
            },

            //验证规则
            rules: {
                permissionName: [
                    { required: true, message: '请输入权限名称', trigger: 'blur' },
                    { min: 1, max: 32, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ]
            },
            permissions: [],
            type: 'add',
            permissionId: null
        };
    },

    methods: {

        /**
         * 修改初始化
         */
        async init ({ type, title, data, permissionId }) {
            this.type = type;
            this.dialogConf.isShow = true;
            const res = await getPermissions({});
            const {menus} = res.data;
            this.permissions = menus;
            if (type === 'update') {
                this.sendData = { ...data };
                this.permissionId = data.permissionId;
            } else {
                const init = this.initData;
                this.sendData = { ...init };
                this.sendData.meta = {
                    requireAuth: false, //是否验证
                    title: null, // 菜单名称
                    icon: null //菜单图标
                };
                this.sendData.parentId = permissionId;
            }
            if (title) this.dialogConf.title = title;
        },

        /**
         * 提交表单
         */
        submitForm (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    if (this.type === 'add') { //新增
                        const { code } = await addPermission(this.sendData);
                        if (code === 200) {
                            this.$message.success(this.$t('msg.add_success'));
                            this.dialogConf.isShow = false;
                            this.$emit('refresh');
                        };
                    } else { //修改
                        const { code } = await updatePermission({ PermissionID: this.PermissionID, data: this.sendData });
                        if (code === 200) {
                            this.$message.success(this.$t('msg.update_success'));
                            this.dialogConf.isShow = false;
                            this.$emit('refresh');
                        };
                    }
                } else {
                    this.$message.error(this.$t('msg.please_fill_out_the_form'));
                }
            });
        },

        /**
		 * 重置表单
		 * @param formName
		 */
        resetForm (formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>
