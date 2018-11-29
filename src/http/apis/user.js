export default {

    /**
     * 用户登录
     * @param {*} data
     */
    userLogin(data) {
        return {
            url: `/login/aminLogin`,
            method: 'post',
            data
        };
    },

    /**
     * 获取图片验证码
     */
    getImgValidate() {
        return {
            url: `/common/getImgValidate`,
            method: 'get'
        };
    }

    /*   ownerUpdatePassword: function (data) { // 管理员修改密码
          return {
              url: '/parking/owner/setOwnerPassword',
              method: 'post',
              data,
              header: {
                  method: 'PUT'
              }
          };
      }, */

};