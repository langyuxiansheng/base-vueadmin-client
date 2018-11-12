<template>
    <div v-if="ownerItem">
        <el-row>
            <el-col :span="12">
                <div v-if="personCenterDialog.isUpdatePassWord">
                    <el-form :model="updatePassword" status-icon :rules="rulesForm" ref="updatePasswordForm" label-width="120px" class="updatePassword-form">
                        <el-form-item label="请输入旧密码" prop="password">
                            <el-input type="password" placeholder="请输入旧密码" v-model="updatePassword.password"></el-input>
                        </el-form-item>
                        <el-form-item label="请输入新密码" prop="newPassword">
                            <el-input type="password" placeholder="请输入新密码" v-model="updatePassword.newPassword"></el-input>
                        </el-form-item>
                        <el-form-item label="请确认新密码" prop="checkNewPassword">
                            <el-input type="password" placeholder="请确认新密码" v-model="updatePassword.checkNewPassword"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="small" icon="el-icon-check" @click="submitForm('updatePasswordForm')">
                                确认修改
                            </el-button>
                            <el-button size="small" icon="el-icon-close" @click="resetForm('updatePasswordForm')">
                                取消
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-else>
                    <div class="detail-row">
                        <span class="name">账号:</span>
                        <span class="content">{{ownerItem.accountNo}}</span>
                    </div>
                    <div class="detail-row">
                        <span class="name">姓名:</span>
                        <span class="content">{{ownerItem.name}}</span>
                    </div>
                    <div class="detail-row">
                        <span class="name">电话:</span>
                        <span class="content">{{ownerItem.phone}}</span>
                    </div>
                    <div class="detail-row">
                        <span class="name">角色:</span>
                        <span class="content" v-if="ownerItem.isAdmin">超级管理员</span>
                        <span class="content" v-else>{{ownerItem.roleName}}</span>
                    </div>
                </div>
            </el-col>
            <el-col :offset="2" :span="10">
                <div class="detail-row">
                    <div v-if="!personCenterDialog.isUpdatePassWord">
                        <el-button type="primary" size="small" icon="el-icon-edit" @click="personCenterDialog.isUpdatePassWord = true">
                            修改密码
                        </el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script  type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'PersonalCenter',

    created () {
        this.getOwnerItem(this);
    },

    data () {
        let newPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.updatePassword.checkNewPassword !== '') {
                    this.$refs.updatePasswordForm.validateField('checkNewPassword');
                }
                callback();
            }
        };

        let checkNewPasswordVal = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.updatePassword.newPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        return {
            imgUrl: '',
            //个人中心模态框
            personCenterDialog: {
                dialogTitle: '个人中心',
                center: true,
                isShow: false,
                isUpdatePassWord: false
            },

            //修改密码
            updatePassword: {
                password: null,
                newPassword: null,
                checkNewPassword: null
            },

            rulesForm: {
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
		 * 修改密码
		 */
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.updatePassword.password = this.updatePassword.password;
                    this.updatePassword.newPassword = this.updatePassword.newPassword;
                    this.formName = formName;
                    this.ownerUpdatePassword(this);
                } else {
                    this.$message.error('请填写完表单!!!');
                    return false;
                }
            });
        },

        /**
         * 取消返回并重置表单
         */
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.personCenterDialog.isUpdatePassWord = false;
        },

        ...mapActions([
            'getOwnerItem',
            'ownerUpdatePassword'
        ])
    },

    computed: {
        ...mapGetters([
            'ownerItem'
        ])
    }
};
</script>
<style lang="less" type="text/less" scoped>
.dialog-title {
  font-size: 18px;
  font-weight: bold;
}

.detail-row {
  font-size: 16px;
  position: relative;
  padding: 10px 0;
  overflow: hidden;
  zoom: 1;
  .name {
    font-weight: bold;
    margin-right: 10px;
    float: left;
    display: block;
  }
  .content {
    float: right;
    text-align: left;
    display: block;
    width: 80%;
    max-height: 350px;
  }
  .detail-row-name {
    font-weight: bold;
  }
  .detail-row-input {
    display: block;
    margin-top: 10px;
  }
}
</style>
