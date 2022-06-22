<template>
  <h1>Proveedor:</h1>
  <form @submit.prevent="registrarProveedor(objFormProve)" >
    <InputProvedores :objFormProve=objFormProve  />
  </form>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import InputProvedores from '../components/InputProvedores.vue'
export default {
 components:{
        InputProvedores
    },
    computed:{
        ...mapState(['objFormProve'])
    },
    methods:{
        ...mapActions(['setTareaEditarProvedor',"registrarProveedor"])
    },
    created(){
        //this.setTareaEditarProvedor(this.$route.params.id);
    }
}
</script>

<style>

</style>