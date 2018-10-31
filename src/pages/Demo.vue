<template>
   <div>
       <div class="head">返回首页</div>
       <div class="context">
           <el-button type="primary" icon="el-icon-arrow-left" @click='toHome'>上一页</el-button>
       </div>

       <div class="head">数据绑定</div>
       <div class="context">{{msg}}</div>

       <div class="head">数据的双向绑定(v-model)</div>
       <div class="context">
           <input type="text" v-model="info">
           <p>输入同步:{{info}}</p>
       </div>

       <div class="head">计算属性</div>
       <div class="context">反转后:{{msgReverse}}</div>
        
       <div class="head">监听器(watch)</div>
       <div class="context">
          <p>{{ watchText }}</p>
          <el-button type="success" @click="add"> 增加 </el-button>
          <el-button type="danger" @click="red"> 减少 </el-button>
          <p>F12打开控制台可查看watchTxt发生变化后触发了watch事件</p>
       </div>

       <div class="head">动态使用class和style</div>
       <div class="context">
         <el-button  :class="{active:isActive}" plain @click="isActive=true">tab1</el-button>
         <el-button  :class="isActive?'':'active'"  plain @click="isActive=false">tab2</el-button>
         <div :style="{ color: activeColor, fontSize: fontSize + 'px'}">动态style1</div>
         <div :style="activeStyle">动态style2</div>
       </div>

       <div class="head">条件渲染(v-if/v-else/v-show)</div>
       <div class="context">
           <el-button type="success" plain @click="show=true">显示</el-button>
           <el-button type="info" plain @click="show=false">隐藏</el-button>
           <div v-if='show'>如果按了显示就能看见我</div>
           <div v-else>如果按了隐藏就能看到我</div>
           <div v-show="show">如果你按了显示按钮就能看到我,即使我隐藏了，但我还在当前dom树上</div>
       </div>

       <div class="head">条件渲染</div>
       <div class="context">
           <ul>
               <li v-for="(val,index) in user">{{index  + 1}}、编号:{{val.id}},姓名:{{val.name}}</li>
           </ul>
       </div>

       <div class="head">修饰符</div>
       <div class="context">
          <input type="text" v-model.trim="val2">
          <p>使用trim修饰符，在上面input输入带空格的值得到去除空格的值：{{val2}}</p>
           <input type="text" v-model="val3"  @keyup.enter="alertInfo">
           <p>使用按键修饰符，在上面input输入值后点击回车键</p>
       </div>

       <div class="head">自定义组件</div>
       <div class="context">
           <c-child :cdata="msg2" @clickThing='clickThing'></c-child>
       </div>



   </div>
</template>

<script>
import CChild from '../components/CChild'
export default {
  name: 'Demo',
  data () {
    return {
        msg: 'This is a demo',
        msg2: '这是父像子传值',
        info: '',
        watchText: 0,
        activeColor: "purple",
        fontSize: "40",
        activeStyle: {
            color:'red',
            fontSize:'12px'
        },
        activeStyle1: {
            color: 'white',
        },
        isActive: false,
        show: true,
        user: [
            {id:1,name:"zhao"},
            {id:2,name:"qian"},
            {id:3,name:"sun"},
            {id:4,name:"li"}
        ],
        val2: '',
        val3: ''
    }
  },
  methods:{
      add (){
          return this.watchText++;
      },
      red (){
          return this.watchText--;
      },
      alertInfo (){
          alert(this.val3);
      },
      clickThing (data){
          alert(data)
      },
      toHome() {
        //   this.$router.go(-1)
        this.$router.replace({name: 'home'})
      }
  },
  computed: {
        msgReverse(){
            return this.msg.split('').reverse().join('');
        }
  },
  watch:{
            watchText (newV, oldV) {
                console.log("watch改变的最新值是",newV)
            }
        },
    components:{
        "c-child": CChild
    }
}
</script>


<style scoped>
  .head{
      width: 600px;
      margin: 70px 0 10px 0;
      background: #f40;
      padding: 10px;
  }
  .context{
      width: 600px;
      background: beige;
      padding: 15px;
  }
  .context input{
      width: 600px;
      height: 40px;
      outline: none;
  }
  .active{
      background: crimson;
  }
  .context ul{
      list-style-type: none;
      padding: 0;
  }
  .context ul li{
      margin: 8px;
  }
</style>
