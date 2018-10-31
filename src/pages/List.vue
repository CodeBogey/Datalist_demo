<template>
  <div>
    <!-- 头部 -->
<div class="line"></div>
<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1">处理中心</el-menu-item>
  <el-submenu index="2">
    <template slot="title">我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="3" disabled>消息中心</el-menu-item>
  <el-menu-item index="4"><a href="http://localhost:8080/" >返回首页</a></el-menu-item>
</el-menu>
 <!-- 搜索框部分 -->
<div class="naver"> 
<div><el-input v-model="input" placeholder="请输入内容"></el-input></div>

<el-select v-model="selectModel"  clearable placeholder="请选择" >
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
<div class="block">
    <el-date-picker
      v-model="timeValue"
      type="datetimerange"
      :picker-options="pickerOptions2"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      unlink-panels
      >
    </el-date-picker>
  </div>
  <div class="but">
  <el-button type="primary" plain @click='infoSearch'>搜索</el-button>
  <el-button type="success" plain @click="dialogFormVisible = true ">新增</el-button>
  <el-dialog title="新增" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="标题" >
      <el-input v-model="newTitlt" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="内容" >
      <el-input v-model="newContent" type='textarea' rows="6" cols="20"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addInfo; open3()">确 定</el-button>
  </div>
</el-dialog>
  </div>
  </div>
 <!-- 主体信息 -->
  <el-table
    :data="tableData"
    v-loading.body='loadFlag'
    @sort-change="sortChangHandle"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="id"
      label="编号"
      sortable
      sortable="custom"
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="创始人"
      >
    </el-table-column>
    <el-table-column
      prop="content"
      label="内容"
      >
    </el-table-column>
    <el-table-column
      prop="createdTime"
      label="创建时间"
      >
    </el-table-column>
    <el-table-column
      prop="yiNum"
      label="易指数"
      >
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger"  @click="handleDel(scope.row)" >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    title="提示"
    :visible.sync="centerDialogVisible"
    width="30%"
    center>
    <span>确定要删除？</span>
    <span slot="footer" class="dialog-footer">
      <el-button  @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="centerDialogVisible = false; handleDelete(); open2()" >确 定</el-button>
    </span>
  </el-dialog>
  <!-- 分页器 -->
  <div class="pagination">
  <el-pagination
  @current-change="handleCurrentChange"
  :current-page.sync="params.pageIndex"
  background
  layout="prev, pager, next"
  :total="total">
</el-pagination>
</div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        selectModel: '',
        activeIndex: '1',
        activeIndex2: '1',
        loadFlag: false,
        curIndex: 0,
        input: '',
        tableData: [],
        timeValue: '',
        newTitlt: '',
        newContent: '',
        centerDialogVisible: false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        options: [],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value5: '',
        dialogList: {
             title: '',
             content: ''
        },
        params: {
            pageIndex: 1,
            order: '',
            title: '',
            name: '',
            createTime: []
        },
        total: 1,
        removeId: ''
      };
    },
    mounted () {
      this.$http.post("/articleCategory/list").then(response => {
      this.options = response.data.data;
    });
      this.list()
    },
    methods: {
      sortChangHandle ({ column, prop, order }) { // 排序功能
      console.log('column', column)
      console.log('prop', prop)
      console.log('order', order)
      if (order == null) {
        this.params.order = ''
        this.list()
      }
      if (order === 'ascending') {
        this.params.order = 'asc'
        this.list()
      }
      if (order === 'descending') {
        this.params.order = 'desc'
        this.list()
      }
    },
      open2() {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      },
      open3() {
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.addInfo();
      },
      handleCurrentChange (i) {
      this.params.pageIndex = i
      this.list()
    },
    layout() {
      this.$http.post("/loginout").then(resp => {});
    },
      list () {
        // console.log('clicked')
        this.loadFlag = true
        let params = this.params
        this.$http.post('/list',params).then(resp => {
        // console.log('resp', resp.data)
        this.tableData = resp.data.rows
        this.loadFlag = false
        this.total = resp.data.total
        })
      },
    infoSearch() { // 搜索
      this.params.title = this.input;
      this.pageIndex = 1;
      this.params.createTime = this.timeValue;
      this.params.name = this.selectModel;
      this.list();
    },
      addInfo() {// 新增
        let params = {
          title: this.newTitlt,
          content: this.newContent
        }
        this.$http.post('/list/add',params).then(resp =>{
          this.dialogFormVisible = false;
          this.list()
        })
      },
      handleDel (item) {
        this.centerDialogVisible = true //点击这里就把centerDialogVisible变为true，弹框会出现
        this.removeId = item.id; // 把id传给removeId
      },
      handleDelete() {// 删除
        let params = {id: this.removeId};
        this.$http.post("/remove",params).then(resp =>{
        this.dialogFormVisible = false;
        this.list()
        });
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleEdit(item) { // 编辑  此页面只要跳转路由和带个参数进去就行
        let params = {
          id: item.id,
        }
        this.$router.push({ name: "detail", query:{id:item.id}});
      }
    }
  }
</script>


<style scoped>
    .naver{
      width: 98%;
      height: 61px;
      line-height: 61px;
      display: flex;
      margin: 10px;
      justify-content: space-between;
      background: aliceblue;
      /* position: sticky; 
      top: 0;
      z-index: 2001; */
      
    }
    .pagination{
      text-align: center;
      margin: 20px;
    }
  
     
</style>
