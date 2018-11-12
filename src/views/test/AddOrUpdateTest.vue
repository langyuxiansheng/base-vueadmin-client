<template>
    <div class="rh-form">
        <el-row :gutter="config.dialogFormGutterWidth">
            <el-form :model="sendData" :label-position="config.labelPosition" :rules="rules" ref="rhForm" label-width="125px">
                <el-col :span="12">

                </el-col>
                <el-col :span="12">

                </el-col>
                <el-col :span="24">
                    <div class="plat-submit-box">
                        <el-form-item class="rh-text-center">
                            <el-button type="primary" @click="submitForm('rhForm')">{{portId ? '立即修改':'立即添加'}}</el-button>
                            <el-button :disabled="portId ? true:false" @click="resetForm('rhForm')">重新填写</el-button>
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
		return {
			portId: null,

			//数据
			sendData: {

			},

			//验证规则
			rules: {

			}
		};
	},

	created () {

	},

	watch: {

	},

	methods: {

		/**
		 * 修改初始化
		 * */
		init (parkId) {
			if (parkId) {
				this.portId = parkId;
			} else {
				this.portId = null;
				this.resetForm('rhForm');
			}
		},

		/**
		 * 提交表单
		 * */
		submitForm (formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.formName = formName;

					if (this.portId) { //修改

					} else { //新增

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
		},

		...mapActions([

		])
	},

	computed: {
		...mapGetters([
			'config'
		])
	}
};
</script>