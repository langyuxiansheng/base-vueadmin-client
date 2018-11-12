<template>
    <div class="rh-form">
        <el-row :gutter="config.dialogFormGutterWidth">
            <el-form :model="sendData" :label-position="config.labelPosition" :rules="rules" ref="rhForm" label-width="125px">
                <el-col :span="24">
                     <el-form-item label="选择续费时间" prop="manyMonth">
                        <el-select class="select-block" @change="monthSelect" v-model="sendData.manyMonth" placeholder="请选择开卡时间">
                            <el-option v-for="(v,k) in monthArr" :key="k" :label="v.label" :value="v.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="续费费用" prop="payAmount">
                        <el-input v-if="sendData.chargeType == 'special'" v-model="sendData.payAmount" placeholder="开卡费用" >
                            <template slot="append">元</template>
                        </el-input>
                        <span v-else>{{sendData.payAmount}}元</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <div class="plat-submit-box">
                        <el-form-item class="rh-text-center">
                            <el-button type="primary" @click="submitForm('rhForm')">{{sendData.monthCardId ? '立即修改':'立即添加'}}</el-button>
                            <el-button :disabled="sendData.monthCardId ? true:false" @click="resetForm('rhForm')">重新填写</el-button>
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
    name: 'RechargeMonthCard',
    data () {
        let month = function () {
            let arr = [];
            for (let i = 1; i <= 12; i++) {
                arr.push({
                    label: i + ' 个月',
                    value: i
                });
            }
            return arr;
        };

        return {
            monthArr: month(),   //月份列表
            carModel: [],    //车型
            bestCarModel: null,  //选择好的车型,用于运算价格

			//数据
            sendData: {
                parkId: null,   //车场id
		        licenseNumber: null, //车牌号
		        payAmount: 0, //支付金额
		        manyMonth: null, //续费时间
		        chargeType: null    //	车型
            },

			//验证规则
            rules: {
		        manyMonth: [
			        { required: true, message: '请选择开卡时间', trigger: 'change' }
		        ],

		        payAmount: [
			        { required: true, message: '请选择输入开卡金额', trigger: 'change' }
		        ]
            }
        };
    },

    watch: {
        //车型
        selectPrice (val) {
            this.carModel = val.price;
        }
    },

    methods: {

		/**
		 * 修改初始化
		 */
        init (data) {
            const {parkId, chargeType, licenseNumber} = data;
            this.resetForm('rhForm');
            this.bestCarModel = null;
            this.sendData.parkId = parkId;
		    this.sendData.chargeType = chargeType;
            this.sendData.licenseNumber = licenseNumber;
            this.getSelectPrice(this);
        },

		/**
		 * 提交表单
		 */
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.formName = formName;
                    this.checkPasswordPrompt();
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

        /**
         * 月份选择
         */
        monthSelect (val) {
            for (let v of this.carModel) {
		        if (this.sendData.chargeType == v.type) {
			        this.bestCarModel = v;
		        }
	        }
	        this.mostFavorable(this.bestCarModel, val);
        },

        /**
         * 最优惠的价格
         */
        mostFavorable (car, month) {
            if (!car) return false;
            let fees = car.fees;
            let totalFee = 0;

            let m = month;
            let rem = 0;
            let s = 0;

            for (let i = fees.length - 1; i >= 0; i--) {
                //取余
                rem = m % fees[i].num; //1 1 1 0
                //商取整
                s = Number.parseInt(m / fees[i].num); //0 0 0 1
                totalFee = totalFee + s * fees[i].fee; //0 0 0 100
                m = rem;  //1 1 1 0
            }
            this.sendData.payAmount = totalFee;
        },

           /**
	     * 密码确认输入框
	     */
        checkPasswordPrompt (type) {
            this.$prompt('请输入登录密码', '安全验证', {
                center: true,
                inputType: 'password',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[^\s]+$/,
                inputErrorMessage: '密码不能为空',
                closeOnHashChange: false,
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        this.checkPasswordValue = instance.inputValue;
                        this.done = done;
                        this.checkPasswordPromptType = type;
                        this.checkPassword(this);
                    } else {
                        done();
                    }
                }
            }).then(({ value }) => {
                this.tableDataShow = true;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },

        /**
	     * 二次验证回调函数
	     */
        checkPasswordCallback (type) {
            this.rechargeMonthCardByPop(this);
        },

        ...mapActions([
            'getSelectPrice',
            'rechargeMonthCardByPop',
            'checkPassword'
        ])
    },

    computed: {
        ...mapGetters([
            'config',
            'selectPrice'
        ])
    }
};
</script>
