<template>
    <div class="rh-form">
        <el-row :gutter="config.dialogFormGutterWidth">
            <el-form :model="sendData" :label-position="config.labelPosition" :rules="rules" ref="rhForm" label-width="125px">
                <el-col :span="12">
                    <el-form-item label="车牌号" prop="licenseNumber">
                        <el-input v-model="sendData.licenseNumber" placeholder="请输入车牌号" ></el-input>
                    </el-form-item>
                    <el-form-item label="过期时间" prop="">
                        <el-date-picker
                            class="select-block"
                            v-model="effectiveEndTime"
                            type="date"
                            @change="handleTime"
                            value-format="timestamp"
                            placeholder="选择过期时间(不选则默认永久)">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="联系人" prop="userName">
                        <el-input v-model="sendData.userName" placeholder="请输入联系人" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="sendData.phone" placeholder="请输入手机号" ></el-input>
                    </el-form-item>
                    <el-form-item label="车场">
                        <el-select class="select-block" multiple v-model="sendData.parkId" v-if="parkList.length > 0" placeholder="请选择车场(不选则默认所有车场)">
                            <el-option v-for="(item,k) in parkList" :key="k" :label="item.name" :value="item.parkId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注" prop="vendor">
                        <el-input v-model="sendData.Descr" placeholder="请输入备注" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <div class="plat-submit-box">
                        <el-form-item class="rh-text-center">
                            <el-button type="primary" @click="submitForm('rhForm')">{{id ? '立即修改':'立即添加'}}</el-button>
                            <el-button :disabled="id ? true:false" @click="resetForm('rhForm')">重新填写</el-button>
                        </el-form-item>
                    </div>
                </el-col>
            </el-form>
        </el-row>
    </div>
</template>
<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex';

export default {
    name: 'AddOrUpdateTest',
    data () {
        //验证号码
        let isPhone = (rule, value, callback) => {
            let reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
            if (!reg.test(value)) {
                callback(new Error(this.$t('msg.the_phone_number_is_not_correct_please_reenter_it')));
            } else {
                callback();
            }
        };

        return {
            id: null,
            effectiveEndTime: null,  //过期时间

			//数据
            sendData: {
                licenseNumber: null, //车牌
	            parkId: [],    //车场数组
	            userName: null,  //姓名
                phone: null, //联系人
	            effectiveStartTime: null, //有效开始时间
	            effectiveEndTime: null,  //有效结束时间
	            applyType: null, //适用范围 1.线上2.线下 null 所有
	            Descr: null //备注
            },

			//验证规则
            rules: {

                licenseNumber: [
			        {required: true, message: '请输入车牌', trigger: 'blur'}
		        ],

		        userName: [
			        {required: true, message: '请输入联系人姓名', trigger: 'blur'}
		        ],

		        phone: [
			        { required: true, message: '请输入联系人手机号', trigger: 'blur' },
			        { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'change' },
			        { validator: isPhone, trigger: 'change' }
		        ]
            }
        };
    },

    methods: {

		/**
		 * 修改初始化
		 */
        init (id) {
            for (let x in this.sendData) {
                if (x == 'parkId') {
                    this.sendData[x] = [];
                } else {
                    this.sendData[x] = null;
                }
            }
            this.effectiveEndTime = null;
            this.getParkList(this);
        },

		/**
		 * 提交表单
		 */
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.formName = formName;
                    //新增
                    this.addWhiteList(this);
                } else {
                    this.$message.error(this.$t('msg.please_fill_out_the_form'));
                }
            });
        },

        /**
         * 处理过期时间
         */
        handleTime (val) {
            this.sendData.effectiveEndTime = val / 1000;
        },

		/**
		 * 重置表单
		 * @param formName
		 */
        resetForm (formName) {
            this.$refs[formName].resetFields();
        },

        ...mapActions([
            'addWhiteList',
            'getParkList'
        ])
    },

    computed: {
        ...mapGetters([
            'config',
            'parkList'
        ])
    }
};
</script>
<style lang="less" scoped>
    .el-date-editor.el-input{
        width: auto;
    }
</style>
