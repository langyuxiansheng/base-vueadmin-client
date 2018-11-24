<template>
    <DialogContainer :dialogConf="dialogConf">
        <el-row class="app-form" :gutter="$store.state.config.dialogFormGutterWidth" v-if="isUpdate">
            <el-form :model="sendData" :label-position="$store.state.config.labelPosition" :rules="rules" ref="AppForm" label-width="125px" @submit.native.prevent>
                <el-col :span="24">
                    <el-form-item label="请输入旧密码" prop="password">
                        <el-input type="password" placeholder="请输入旧密码" v-model="sendData.password"></el-input>
                    </el-form-item>
                    <el-form-item label="请输入新密码" prop="newPassword">
                        <el-input type="password" placeholder="请输入新密码" v-model="sendData.newPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="请确认新密码" prop="checkNewPassword">
                        <el-input type="password" placeholder="请确认新密码" v-model="sendData.checkNewPassword"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <div class="plat-submit-box">
                        <el-form-item class="rh-text-center">
                            <el-button type="primary" @click="submitForm('AppForm')">确认修改</el-button>
                            <el-button @click="isUpdate = false">取消修改</el-button>
                        </el-form-item>
                    </div>
                </el-col>
            </el-form>
        </el-row>
        <el-row v-else class="app-detail" :gutter="$store.state.config.dialogFormGutterWidth">
            <el-col :span="24">
                <div class="app-row">
                    <span class="app-title">账号:</span>
                    <span class="app-label">{{user.account}}</span>
                </div>
                <div class="app-row">
                    <span class="app-title">姓名:</span>
                    <span class="app-label">{{user.adminName}}</span>
                </div>
                <div class="app-row">
                    <span class="app-title">联系方式:</span>
                    <span class="app-label">{{user.phone || '暂无'}}</span>
                </div>
                <div class="app-row">
                    <span class="app-title">角色:</span>
                    <span class="app-label">{{user.roleName}}</span>
                </div>
                <div class="app-row">
                    <el-button class="update-pwd" type="primary" @click="isUpdate = true">修改密码</el-button>
                </div>
            </el-col>
        </el-row>
    </DialogContainer>
</template>
<script  type="text/ecmascript-6">

export default {
    name: 'PersonalCenter',
    data () {
        const { dialogSingleFormWidth } = this.$store.state.config;
        let newPassword = (rule, value, callback) => {
            if (value === null) {
                callback(new Error('请输入密码'));
            } else {
                if (this.sendData.checkNewPassword !== null) {
                    this.$refs.AppForm.validateField('checkNewPassword');
                }
                callback();
            }
        };

        let checkNewPasswordVal = (rule, value, callback) => {
            if (value === null) {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.sendData.newPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            isUpdate: false,

            dialogConf: {
                width: dialogSingleFormWidth,
                isShow: false,
                center: true,
                title: null
            },

            //数据
            sendData: {
                password: null,
                newPassword: null,
                checkNewPassword: null
            },

            //验证规则
            rules: {
                password: [
                    { required: true, message: '请输入原始密码', trigger: 'blur' },
                    { min: 5, max: 32, message: '长度在 5 到 32 个字符', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, validator: newPassword, trigger: 'blur' },
                    { min: 5, max: 32, message: '长度在 5 到 32 个字符', trigger: 'blur' }
                ],
                checkNewPassword: [
                    { required: true, validator: checkNewPasswordVal, trigger: 'blur' }
                ]
            }
        };
    },

    methods: {
        /**
         * 初始化
         */
        init ({ title }) {
            this.dialogConf.isShow = true;
            if (title) this.dialogConf.title = title;
        },

        /**
         * 提交表单
         */
        submitForm (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    // const { code } = await addDemo(this.sendData);
                    // if (code === 200) {
                    //     this.$message.success(this.$t('msg.operation_success'));
                    //     this.dialogConf.isShow = false;
                    //     this.$emit('refresh');
                    // };
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
    },
    computed: {
        user() {
            const {userInfo} = this.$store.state.users;
            return userInfo || {};
        }
    }
};
</script>
<style lang="less" scoped>
    .app-detail{
        font-size: 16px;
        .app-row{
            margin-bottom: 10px;
            padding-bottom: 10px;
            .app-title{
                font-weight: bold;
            }
            .app-label{
                margin-left: 10px;
            }
        }
    }
</style>

