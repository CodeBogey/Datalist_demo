<template>
    <div class="home">
      <div class="title">
           {{title}}
      </div>  
      <div class="users">
         <p>当前用户信息</p>
         <p>用户名：{{user.name}} </p>
         <p>获取用户信息的时间：{{ new Date().toLocaleString() }} </p>
         <p>token：{{user.token}} </p>
         <p>计数器：{{user.number}} </p>
   
      </div>
      <div class="foot">
         <router-link :to="{name: 'demo'}">去Demo页面</router-link>
         <br><router-link :to="{name: 'list'}">去列表页面</router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      title: 'DEMO 启动成功',
      user: {name:'admin',token:'248027',number:'1'}
    }
  }
}
</script>


<style scoped>
  .home{
      border: 1px solid #000;
      background: rgb(235, 226, 226);
      width: 100%;
      margin-top: 70px;
      padding: 20px;
  }
  .home .title{
      font-size: 30px;
  }
</style>
