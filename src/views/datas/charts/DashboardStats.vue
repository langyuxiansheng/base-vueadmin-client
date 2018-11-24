<template>
    <div class="app-stats-container">
        <h2 class="stats-header">
            <i :class="options.config.icon"></i>
            {{options.config.title}}
        </h2>
        <div class="app-stats-items">
            <div class="app-stats-item"
            v-for="(item,k) in list"
            v-if="item"
            :key="k"
            :style="{background:item.background}">
                <div class="item-info">
                    <p class="number"><ICountUp :startVal="0" :endVal="item.value" :decimals="0"/></p>
                    <p class="label">{{item.label}}</p>
                </div>
                <div class="item-icon">
                    <i :class="item.icon"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ICountUp from 'vue-countup-v2';

export default {
    components: {
        ICountUp
    },
    props: {
        options: {
            required: true,
            type: Object,
            default: {
                config: {
                    title: '关键数指标',
                    icon: 'fa fa-line-chart fa-lg'
                },
                data: [
                    {
                        label: '测试数据',
                        value: 4135,
                        icon: 'fa fa-users fa-3x',
                        background: '#fc8675'
                    }
                ]
            }
        }
    },
    computed: {
        list() {
            const {userInfo} = this.$store.state.users;
            const {options} = this;
            //访问权限设定
            const active = [`当前在线人数`];
            return options.data.map(item => {
                if (userInfo && userInfo.IsAdmin) return item; //超级管理员
                return active.indexOf(item.label) === -1 ? item : null;
            });
        }
    }
};
</script>
<style lang="less" scoped>
.app-stats-container{
    background-color: #fff;
    padding: 10px;
    .stats-header{
        color: #777;
        border-color: #e6e6e6;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }
    .app-stats-items{
        display: flex;
        flex-wrap:wrap;
        .app-stats-item{
            width: 390px;
            display: flex;
            overflow: hidden;
            color: #fff;
            cursor: pointer;
            height: 105px;
            padding: 20px 20px;
            justify-content: space-between;
            margin-right: 20px;
            margin-bottom: 20px;
            align-items: center;
            .item-info{
                .number{
                    font-size: 35px;
                    font-family: inherit;
                    line-height: 1.1;
                    font-weight: 500;
                }
                .label{
                    font-size: 14px;
                    font-family: inherit;
                    margin-top: 3px;
                    line-height: 1.1;
                }
            }
            .item-icon{
                i{
                    font-size: 60px;
                    opacity: .3;
                    margin-right: 40px;
                }
            }
        }
    }

}
</style>
