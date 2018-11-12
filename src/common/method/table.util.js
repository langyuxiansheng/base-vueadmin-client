/**
 * @description: table工具类插件
 * @author: Wolf Mr.Yu
 * @version: v1.0.0
 * @date: 2018/03/16
 * */
export default function install(Vue, options) {
    Vue.prototype.$elTable = {
        //分页器配置
        propsPage: {
            tableIndex: 1, //表格索引
            currentPage: 1, //前往x页
            pageSizes: [5, 10, 15, 20], //每页x条
            size: 10, //每页 x 条数据
            layout: 'prev, pager, next, jumper', //配置
            total: 0, //总大小
            data: [], //源数据
            exportData: [], //导出表格数据源
            keyword: '',
            searchData: null //搜索过滤数据
        },

        /**
         * 表格插件初始化
         * @param data {Array} 表格数据列表
         * */
        init(data) {
            //表格数据
            this.propsPage.data = data || [];
            this.propsPage.searchData = null;
            return this.tablePagination({
                data: this.propsPage.data,
            });
        },

        /**
         * 表格分页器
         * @param config {Object} 表格数据对象
         * @param Object.data {Array} //源数据
         * @param Object.sizeChange {Number} //每页大小
         * @param Object.currentChange {Number} //当前页
         * @return Array
         * */
        tablePagination(config) {
            let option = config || {};
            //表格数据
            let data = this.propsPage.searchData || option.data || this.propsPage.data;
            //每页大小
            this.propsPage.size = option.sizeChange || this.propsPage.size;
            let sizeChange = this.propsPage.size;
            //当前页
            let currentChange = option.currentChange || this.propsPage.currentPage; //当前页
            //总大小
            this.propsPage.total = data.length;
            //临时存储
            let newTableList = [];
            if (data && data.length > 0) {
                //索引
                let index = (currentChange - 1) * sizeChange;
                this.propsPage.tableIndex = index + 1;
                for (let i = index; i < sizeChange * currentChange; i++) {
                    if (data[i]) {
                        newTableList.push(data[i]);
                    }
                }
            }
            return newTableList;
        },

        /**
         * 表格搜索
         * @param keyWord {String} 关键字
         * @return Array
         * */
        tableSearch(keyWord) {
            this.propsPage.keyword = keyWord;
            let data = this.propsPage.data;
            let reg = new RegExp(keyWord);
            let newList = [];
            let newArray = [];

            if (data && data.length > 0) {
                newArray = data.map((item) => {
                    for (let x in item) {
                        if (String(item[x]).match(reg)) {
                            return item;
                        }
                    }
                });

                //过滤 null 或undefined 的索引字
                if (newArray.length > 0) {
                    for (let item in newArray) {
                        if (newArray[item]) {
                            newList.push(newArray[item]);
                        }
                    }
                }
            }
            //关键字不为 空时 传递搜索数据到分页器
            if (keyWord.length != 0) {
                this.propsPage.searchData = newList;
            }

            return this.tablePagination({
                data: newList
            });
        },

        /**
         * 导出所有数据表格
         * @param exportExcelConfig {Object} 导出文件配置
         * */
        exportAllExcel(exportExcelConfig) {
            let tHeader = exportExcelConfig.tHeader;
            let fileName = exportExcelConfig.fileName || 'ExcelTable';

            const list = exportExcelConfig.exportData || [];

            if (!list || list && list.length == 0) {
                return alert('无数据导出!');
            }

            if (!tHeader && !filterVal) {
                return alert('Export Error!');
            }

            import ('../../../static/js/vendor/Export2Excel').then(excel => {
                excel.export_json_to_excel(tHeader, list, fileName);
            });
        },

        /**
         * 时间戳转日期格式
         * @param timestamp {Number} 时间戳
         * @return
         * */
        timestampToTime(timestamp) {
            let date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = date.getDate() + ' ';
            let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
            let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
        }
    };
}

/*
<el-col :span="12">
    <el-form :inline="true">
        <el-form-item label="搜索项">
            <el-input
                    placeholder="请输入内容"
                    v-model="tableSearchKeyWord"
                    prefix-icon="el-icon-search"
                    @keyup.native="tableSearch(tableSearchKeyWord)">
            </el-input>
        </el-form-item>
    </el-form>
</el-col>

<div class="table-pagination">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="$elTable.propsPage.currentPage"
        :page-size="$elTable.propsPage.size"
        :page-sizes="$elTable.propsPage.pageSizes"
        :layout="$elTable.propsPage.layout"
        :total="$elTable.propsPage.total">
    </el-pagination>
</div>

tableDataShow:true, //首次进入
tableData:[],   //表格数据
tableSearchKeyWord:'',  //搜索关键字

portList(val){
    if(val){
	    this.tableData = this.$elTable.init(val);
    }
}

//表格搜索
tableSearch(keyWord){
	if(keyWord == '' && keyWord.length == 0){
		this.tableData = this.$elTable.init(this.portList);
	} else {
		this.tableData = this.$elTable.tableSearch(keyWord);
	}
},

/!**
 * 每页大小
 * *!/
handleSizeChange(val) {
	this.tableData = this.$elTable.tablePagination({
		sizeChange:val,
	});
},

/!**
 * 翻页
 * *!/
handleCurrentChange(val) {
	this.tableData = this.$elTable.tablePagination({
		currentChange:val,
	});
},*/