<template>
  <div>
    <div class="head">
    <el-button type="primary" plain @click="toHome">返回主页面</el-button>
    <el-button type="primary" plain @click="toBack">返回上一级</el-button>
    </div>
    <el-form label-width="100px" class="demo-ruleForm">
  <div class="banner">
  <el-form-item
    label="标题">
   <el-input v-model="title"></el-input>
  </el-form-item>
  <el-form-item
    label="作者">
   <el-input v-model="name" disabled></el-input>
  </el-form-item>
  <el-form-item label="内容" >
    <el-input type="textarea" rows="8" v-model="content"></el-input>
  </el-form-item>
  </div>
  <div class="foot">
  <el-form-item>
    <el-button type="primary" @click="open2()">提交</el-button>
    <el-button disabled="">重置</el-button>
  </el-form-item>
  </div>
</el-form>
  </div>
</template>

<script>
export default {
    name: 'Detail',
    data () {
      return {
        id: '',
        paicheNo: '',
        title: '',
        content: '',
        name: ''
      }
    },
    created(){
      //  console.log('this.Route', this.$route)
       this.getDetailData()
    },
    methods: {
      getDetailData () { // 接受List页面传过来的id
        let sid
        if (this.$route.query && this.$route.query.id) {
          sid = this.$route.query.id
        }
        let params = {
          id: sid // 接受List页面传过来的id
        }
        this.$http.post('/detail', params).then(resp => {
          // console.log('resp', resp.data)
          let data = resp.data.data
          this.name = data.name
          this.title = data.title
          this.content = data.content
        })
      },
      // open2() {
      //   let params = {
      //     id: this.$route.query.id,
      //     title: this.title,
      //     content: this.content
      //   }
      //   this.$http.post('/edit', params).then(resp => {
      //     if (resp.data.code === 1) {
      //       this.$message({
      //         message: '提交成功',
      //         type: 'success'
      //       });
      //       this.toBack();
      //     }
      //   })
      // },
        open2() {
          let params = {
            id: this.$route.query.id,
            title: this.title,
            content: this.content
          }
          this.$http.post('/edit', params).then(resp => {
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.toBack();
          })
        },
        toHome() {
          this.$router.replace({name: 'home'})
        },
        toBack(){
          this.$router.replace({name: 'list'})
        }
    }
  }
    
</script>


<style scoped>
 .banner, .foot{
   width: 50%;
   margin: 20px ;
 }
</style>
