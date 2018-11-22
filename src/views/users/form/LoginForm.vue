<template>
    <div class="login-form" @keyup.enter="submitForm('Form')">
        <h1 class="title">管理平台</h1>
        <div class="login-form-body">
            <el-row>
                <el-col :span="24">
                    <el-form :model="sendData" status-icon :rules="rules" ref="Form" class="right-form" @submit.native.prevent>
                        <el-form-item class="user-label" label="" prop="account">
                            <div class="user-input">
                                <el-input type="text" v-model="sendData.account" placeholder="请输入管理员账号" auto-complete="off"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item class="user-label" label="" prop="pwd">
                            <div class="user-input">
                                <el-input type="password" v-model="sendData.pwd" placeholder="请输入管理员密码" auto-complete="off"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item class="btn-label">
                            <el-button type="primary" class="login-btn" @click="submitForm('Form')" :loading="loading">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import Cookies from 'js-cookie';
import {userLogin} from '@/http';
import permissions from '@/router/permission';

export default {
    name: 'LoginForm',
    data () {
        // 用户账户
        let validateAccount = (rule, value, callback) => {
            if (value === null) {
                callback(new Error('请输入管理员账号'));
            } else {
                callback();
            }
        };

        // 用户密码
        let validatePass = (rule, value, callback) => {
            if (value === null) {
                callback(new Error('请输入管理员密码'));
            } else {
                callback();
            }
        };

        return {
            loading: false,
            sendData: {
                account: null,
                pwd: null,
                passWord: null
            },

            rules: {
                account: [
                    { required: true, message: '请输入管理员账号', trigger: 'blur' },
                    { validator: validateAccount, message: '请输入管理员账号', trigger: 'blur' }
                ],

                pwd: [
                    { required: true, message: '请输入管理员密码', trigger: 'blur' },
                    { validator: validatePass, message: '请输入管理员密码', trigger: 'blur' }
                ]
            }
        };
    },

    methods: {
        submitForm (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    this.sendData.password = this.sendData.pwd;
                    const { data } = await userLogin(this.sendData);
                    if (data) {
                        const { token, userInfo, menus } = data;
                        Cookies.set('adminToken', token);
                        if (menus) { //普通管理员登录
                            window.localStorage.setItem(`adminSessionData`, JSON.stringify({userInfo, menus}));
                        } else {
                            window.localStorage.setItem(`adminSessionData`, JSON.stringify({userInfo}));
                        }
                        //映射路由表到vuex
                        this.$store.dispatch('getRoutes', permissions.getRoutes());
                        this.$router.push(`/dashboard/index`);
                    }
                } else {
                    this.$message.error('请输入用户名和密码');
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>
<style lang="less">
.login-form {
  padding: 10px 0;
  width: 500px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  color: #fff;
  .title {
    padding: 20px 10px;
    font-size: 28px;
    border-bottom: 1px solid #eaf0ff;
    text-align: center;
  }

  .login-form-body {
    padding: 68px 0;
    .right-form {
      width: 360px;
      margin: 0 auto;
      .user-label {
        margin-bottom: 28px;
      }
      .btn-label {
        margin-top: 34px;
        .login-btn {
          display: block;
          width: 100%;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
