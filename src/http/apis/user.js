// const PARKING_SERVER = '/parking';
const COMMON_SERVER = '/common';
export default {

    userLogin(data) { // 用户登录
        return {
            url: `/login/aminLogin`,
            method: 'post',
            data
        };
    },

    userLogout() { // 用户注销
        return {
            url: `${COMMON_SERVER}/parking/owner/loginOut`,
            method: 'post'
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