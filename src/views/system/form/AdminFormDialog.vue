<template>
    <DialogContainer :dialogConf="dialogConf">
        <el-row class="app-form" :gutter="$store.state.config.dialogFormGutterWidth">
            <el-form :model="sendData" :label-position="$store.state.config.labelPosition" :rules="rules" ref="AppForm" label-width="125px">
                <el-col :span="24">
                    <el-form-item label="姓名或昵称" prop="AdminName">
                        <el-input v-model="sendData.AdminName" placeholder="请输入姓名或昵称"></el-input>
                    </el-form-item>
                    <el-form-item label="账号" prop="Account">
                        <el-input v-model="sendData.Account" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="Password">
                        <el-input v-model="sendData.Password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <div class="plat-submit-box">
                        <el-form-item class="rh-text-center">
                            <el-button type="primary" @click="submitForm('AppForm')">立即添加</el-button>
                            <el-button @click="resetForm('AppForm')">重新填写</el-button>
                        </el-form-item>
                    </div>
                </el-col>
            </el-form>
        </el-row>
    </DialogContainer>
</template>
<script type="text/ecmascript-6">
import { addPlatformAdmin } from '@/http';
export default {
    name: 'AdminFormDialog',
    data () {
        const { dialogPrompt } = this.$store.state.config;
        return {
            dialogConf: {
                width: dialogPrompt,
                isShow: false,
                center: true,
                title: null
            },

            //数据
            sendData: {
                AdminName: null,
                Account: null,
                Password: null
            },

            //验证规则
            rules: {
                AdminName: [
                    { required: true, message: '请输入姓名或昵称', trigger: 'blur' },
                    { min: 1, max: 32, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                Account: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 5, max: 32, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                Password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 32, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ]
            }
        };
    },

    methods: {

        /**
		 * 修改初始化
		 * */
        init ({ title }) {
            this.dialogConf.isShow = true;
            if (title) this.dialogConf.title = title;
        },

        /**
		 * 提交表单
		 * */
        submitForm (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const { code } = await addPlatformAdmin(this.sendData);
                    if (code === 200) {
                        this.$message.success(this.$t('msg.add_success'));
                        this.dialogConf.isShow = false;
                        this.resetForm(formName);
                        this.$emit('refresh');
                    };
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
