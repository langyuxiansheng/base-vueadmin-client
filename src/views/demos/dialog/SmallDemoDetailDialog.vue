<template>
    <DialogContainer :dialogConf="dialogConf">
        <el-row class="app-detail" :gutter="$store.state.config.dialogFormGutterWidth" v-if="data">
            <el-col :span="12">
                <div class="app-row">
                    <span class="app-title">demo编号:</span>
                    <span class="app-label">{{data.demoId}}</span>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="app-row">
                    <span class="app-title">demoName:</span>
                    <span class="app-label">{{data.demoName}}</span>
                </div>
            </el-col>
        </el-row>
        <div v-else class="app-data-null">
           <h1 class="null">暂无数据</h1>
        </div>
    </DialogContainer>
</template>
<script type="text/ecmascript-6">
export default {
    name: 'SmallDemoDetailDialog',
    data () {
        const { dialogFormWidth } = this.$store.state.config;
        return {
            dialogConf: {
                width: dialogFormWidth,
                isShow: false,
                center: true,
                title: null,
                closeOnClickModal: true
            },
            data: null
        };
    },

    methods: {

        /**
         * 初始化
         */
        init ({ title, data }) {
            this.dialogConf.isShow = true;
            if (title) this.dialogConf.title = title;
            this.data = data;
        }
    }
};
</script>
<style lang="less" scoped>
    .app-detail{
        font-size: 16px;
        .app-row{
            margin-bottom: 10px;
            border-bottom: 1px solid #eaeaea;
            padding-bottom: 10px;
            .app-title{
                font-weight: bold;
            }
            .app-label{
                margin-left: 10px;
            }
        }
    }
    .app-data-null{
        .title{
            font-size: 18px;
            text-align: center;
        }
    }
</style>

