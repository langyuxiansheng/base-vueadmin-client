<template>
    <el-dialog
        v-if="dialogConf.isShow"
        :width="dialogConf.width"
        :center="dialogConf.center"
        :visible.sync="dialogConf.isShow">
        <span slot="title">
            {{dialogConf.title}}
        </span>
        <el-row>
            <el-col :span="24">
                <slot></slot>
            </el-col>
        </el-row>
    </el-dialog>
</template>
<script type="text/ecmascript-6">
export default {
    name: 'DialogContainer',
    props: {
        dialogConf: {
            type: Object,
            default: {
                width: null,
                isShow: false,
                center: true,
                title: null
            }
        }
    }
};
</script>
<style lang="less" scoped>

</style>
