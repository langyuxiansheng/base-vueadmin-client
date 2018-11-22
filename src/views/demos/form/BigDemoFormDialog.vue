<template>
    <DialogContainer :dialogConf="dialogConf">
        <el-row class="app-form" :gutter="$store.state.config.dialogFormGutterWidth">
            <el-form :model="sendData" :label-position="$store.state.config.labelPosition" :rules="rules" ref="AppForm" label-width="125px" @submit.native.prevent>
                <el-col :span="12">
                    <el-form-item label="示例Name" prop="demoName">
                        <el-input v-model="sendData.demoName" placeholder="请输入示例Name"></el-input>
                    </el-form-item>
                    <el-form-item label="选择示例">
                        <el-select class="select-block" v-model="sendData.demoName" placeholder="请选择">
                            <el-option label="默认顶级" :value="0" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="示例Name" prop="demoName">
                        <el-input v-model="sendData.demoName" placeholder="请输入示例Name"></el-input>
                    </el-form-item>
                    <el-form-item label="选择示例">
                        <el-select class="select-block" v-model="sendData.demoName" placeholder="请选择">
                            <el-option label="默认顶级" :value="0" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="radio">
                        <el-radio-group v-model="sendData.demoName">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
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
import { addDemo, updateDemo } from '@/http';

export default {
    name: 'BigDemoFormDialog',
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
                demoName: null //名字
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
            this.type = type;
            this.dialogConf.isShow = true;
            if (title) this.dialogConf.title = title;
            if (type === 'update') {
                this.sendData = {...this.sendData, ...data};
            } else {
                for (const item in this.sendData) {
                    if (item != 'Forbidden') {
                        this.sendData[item] = false;
                    } else if (item != 'SysOpen') {
                        this.sendData[item] = true;
                    } else {
                        this.sendData[item] = null;
                    }
                }
            }
        },

        /**
         * 提交表单
         */
        submitForm (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    if (this.type === 'add') { //新增
                        const { code } = await addDemo(this.sendData);
                        if (code === 200) {
                            this.$message.success(this.$t('msg.add_success'));
                            this.dialogConf.isShow = false;
                            this.$emit('refresh');
                        };
                    } else { //修改
                        const { code } = await updateDemo(this.sendData);
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
