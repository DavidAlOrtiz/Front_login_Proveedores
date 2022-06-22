<template>
  <input type="text"
    class="form-control my-2 " placeholder="ingresa tu nombre" 
     v-model.trim="objForm.nombre"/>
    <input class="form-control my-2 " type="email" placeholder="Ingresa tu email" v-model.trim="objForm.email">
     <input class="form-control my-2 " type="password" placeholder="Ingresa tu email" v-model.trim="objForm.pasword">
    <input type="submit" :disabled="desavilitar" class="btn btn-primary mt-2 w-100" value="Enviar" />
</template>

<script>

export default {
    props:{
        objForm: Object,
    },
    computed:{
    desavilitar(){
      return this.objForm.nombre.trim() === "" ? true : false
    }
  },
}
</script>

<style>

</style>