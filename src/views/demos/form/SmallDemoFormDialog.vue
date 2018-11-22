<template>
    <DialogContainer :dialogConf="dialogConf">
        <el-row class="app-form" :gutter="$store.state.config.dialogFormGutterWidth">
            <el-form :model="sendData" :label-position="$store.state.config.labelPosition" :rules="rules" ref="AppForm" label-width="125px" @submit.native.prevent>
                <el-col :span="24">
                    <el-form-item label="demoName" prop="demoName">
                        <el-input v-model="sendData.demoName" disabled></el-input>
                    </el-form-item>
                    <el-form-item v-if="type === 'add'" label="add" prop="add">
                        <el-input v-model="sendData.add" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item v-if="type === 'remove'" label="" prop="remove">
                        <el-input v-model="sendData.remove" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <div class="plat-submit-box">
                        <el-form-item class="rh-text-center">
                            <el-button type="primary" @click="submitForm('AppForm')">确认{{type==='payAgent' ? '添加':'移除'}}</el-button>
                            <el-button @click="resetForm('AppForm')">重新填写</el-button>
                        </el-form-item>
                    </div>
                </el-col>
            </el-form>
        </el-row>
    </DialogContainer>
</template>
<script type="text/ecmascript-6">
import { addDemo } from '@/http';

export default {
    name: 'SmallDemoFormDialog',
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
                demoName: null, //名字
                add: null, //
                remove: null //
            },

            //验证规则
            rules: {
                demoName: [
                    { required: true, message: '请输入名字', trigger: 'blur' },
                    { min: 1, max: 32, message: '长度在 10 到 16 位', trigger: 'blur' }
                ]
            },
            type: 'add'
        };
    },

    methods: {

        /**
         * 初始化
         */
        init ({ type, title, data }) {
            this.dialogConf.isShow = true;
            this.type = type;
            if (title) this.dialogConf.title = title;
        },

        /**
         * 提交表单
         */
        submitForm (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    if (this.type === 'add') {
                        const { code } = await addDemo(this.sendData);
                        if (code === 200) {
                            this.$message.success(this.$t('msg.operation_success'));
                            this.dialogConf.isShow = false;
                            this.$emit('refresh');
                        };
                    } else if (this.type === 'remove') {
                        const { code } = await addDemo(this.sendData);
                        if (code === 200) {
                            this.$message.success(this.$t('msg.operation_success'));
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
