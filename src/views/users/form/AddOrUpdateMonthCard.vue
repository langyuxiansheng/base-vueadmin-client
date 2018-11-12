<template>
    <div class="rh-form">
        <el-row :gutter="config.dialogFormGutterWidth">
            <el-form :model="sendData" :label-position="config.labelPosition" :rules="rules" ref="rhForm" label-width="125px">
                <el-col :span="12">
                    <el-form-item label="输入车牌号" prop="licenseNumber">
                        <el-input v-model="sendData.licenseNumber" placeholder="请输入输入车牌号" ></el-input>
                    </el-form-item>
                    <el-form-item label="车型选择" prop="chargeType">
                        <el-select @change="carModelSelect" :disabled="isDisabled" class="select-block" v-model="sendData.chargeType" placeholder="请选择车型">
                            <el-option v-for="(v,k) in carModel" :key="k" :label="v.remark" :value="v.type"></el-option>
                            <el-option label="特殊类" value="special"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="联系人" prop="userName">
                        <el-input v-model="sendData.userName" placeholder="请输入联系人" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="选择开卡时间" prop="manyMonth">
                        <el-select :disabled="isDisabled" class="select-block" @change="monthSelect" v-model="sendData.manyMonth" placeholder="请选择开卡时间">
                            <el-option v-for="(v,k) in monthArr" :key="k" :label="v.label" :value="v.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="sendData.phone" placeholder="请输入手机号" ></el-input>
                    </el-form-item>
                    <el-form-item label="开卡费用" prop="payAmount">
                        <el-input v-if="sendData.chargeType == 'special'" v-model="sendData.payAmount" placeholder="开卡费用" >
                            <template slot="append">元</template>
                        </el-input>
                        <span v-else>{{sendData.payAmount}}元</span>
                    </el-form-item>
                    <el-form-item v-if="sendData.chargeType != 'special'" label="允许在线续费">
                        <el-switch :active-value="1" :inactive-value="0" v-model="sendData.canRenewal"></el-switch>
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
    name: 'AddOrUpdateMonthCard',
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
                monthCardId: null,
		        parkId: null,   //车场id
		        licenseNumber: null, //车牌号
		        manyMonth: 1,    //开卡时间
		        chargeType: null,    //	车型
		        payAmount: 0, //支付金额
		        phone: null, //联系电话
		        userName: null,  //用户名
		        canRenewal: 0
            },

			//验证规则
            rules: {
                licenseNumber: [
			        { required: true, message: '请输入车牌号', trigger: 'blur' },
			        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
		        ],

		        chargeType: [
			        { required: true, message: '请选择车型', trigger: 'change' }
		        ],

		        userName: [
			        { required: true, message: '请输入姓名', trigger: 'blur' }
		        ],

		        phone: [
			        { required: true, message: '请输联系人电话', trigger: 'blur' }
		        ],

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
            if (data.monthCardId) {
                for (let k in data) {
                    for (let v in this.sendData) {
                        if (k == v) {
                            this.sendData[v] = data[k];
                        } else if (k == 'monthCardId') {
                            this.sendData.monthCardId = data[k];
                        }
                    }
                }
            } else {
                this.sendData.monthCardId = null;
                this.resetForm('rhForm');
            }

            this.sendData.parkId = data.parkId;
            this.getSelectPrice(this);
        },

		/**
		 * 提交表单
		 */
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.formName = formName;
                    if (this.sendData.monthCardId) { //修改
                        this.checkPasswordPrompt('update');
                    } else { //新增
                        this.checkPasswordPrompt('add');
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

        /**
         * 车型选择
         */
        carModelSelect (val) {
            for (let v of this.carModel) {
                if (val == v.type) {
                    this.bestCarModel = v;
                }
            }
            //选择特殊类强制标记为不可续费
            if (val == 'special') {
                this.sendData.canRenewal = 0;
            }
            this.mostFavorable(this.bestCarModel, this.sendData.manyMonth);
        },

        /**
         * 月份选择
         */
        monthSelect (val) {
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
            if (type == 'add') {
                this.addMonthCard(this);
            } else {
                this.updateMonthCardByPop(this);
            }
        },

        ...mapActions([
            'getSelectPrice',
            'addMonthCard',
            'updateMonthCardByPop',
            'checkPassword'
        ])
    },

    computed: {
        isDisabled () {
            return !!this.sendData.monthCardId;
        },
        ...mapGetters([
            'config',
            'selectPrice'
        ])
    }
};
</script>
