<template>
    <DialogContainer :dialogConf="dialogConf">
        <el-row class="app-form" :gutter="$store.state.config.dialogFormGutterWidth">
            <el-form :model="sendData" :label-position="$store.state.config.labelPosition" ref="AppForm" label-width="125px" @submit.native.prevent>
                <el-col :span="24">
                    <el-form-item label="选择角色">
                        <el-select class="select-block" v-model="sendData.roleId" placeholder="请选择角色">
                            <el-option label="默认" :value="null"/>
                            <el-option
                            v-for="role in roles"
                            :key="role.roleId"
                            :label="role.roleName"
                            :value="role.roleId"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <div class="plat-submit-box">
                        <el-form-item class="rh-text-center">
                            <el-button type="primary" @click="submitForm('AppForm')">立即设置</el-button>
                            <el-button @click="resetForm('AppForm')">重新填写</el-button>
                        </el-form-item>
                    </div>
                </el-col>
            </el-form>
        </el-row>
    </DialogContainer>
</template>
<script type="text/ecmascript-6">
import { setPlatformAdminRole, getPlatformRoles } from '@/http';
export default {
    name: 'SetRoleFormDialog',
    data () {
        const { dialogSingleFormWidth } = this.$store.state.config;
        return {
            dialogConf: {
                width: dialogSingleFormWidth,
                isShow: false,
                center: true,
                title: null
            },

            //数据
            sendData: {
                roleId: null, //角色ID
                adminId: null // 管理员ID
            },
            roles: [] //角色列表
        };
    },

    methods: {

        /**
         * 修改初始化
         */
        init ({ title, roleId, adminId }) {
            this.dialogConf.isShow = true;
            this.sendData.roleId = roleId;
            this.sendData.adminId = adminId;
            if (title) this.dialogConf.title = title;
            this.getRoles();
        },

        /**
         * 获取角色列表
         */
        async getRoles() {
            const {data} = await getPlatformRoles({});
            this.roles = data;
        },

        /**
         * 提交表单
         */
        async submitForm (formName) {
            const { code } = await setPlatformAdminRole(this.sendData);
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
    }
};
</script>
