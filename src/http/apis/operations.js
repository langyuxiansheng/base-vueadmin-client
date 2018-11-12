/**
 * 运营管理
 */
export default {
    getGameList() { // 获取游戏列表
        return {
            url: `/gamecfg/getGameList`,
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