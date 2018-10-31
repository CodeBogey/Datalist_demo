<template>
   <div>
       <p>{{ cdata }}</p>
       <el-button   type="primary" @click="addThis">点击</el-button>
   </div>
</template>

<script>
export default {
  name: 'CChild',
  props: {
     cdata:{
         type:String
     }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
      addThis (){
          this.$emit('clickThing','子像父传值')
      }
  }
}
</script>


<style scoped>

</style>
