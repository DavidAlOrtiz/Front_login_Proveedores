<template>
  <h1 class="my-5">Registro de usuarios</h1>

  <form @submit.prevent="procesarFormulario()">
    <input
      type="text"
      placeholder="nombre"
      class="form-control my-3"
      v-model.trim="nombre"
    />
    <input
      type="email"
      placeholder="Email"
      class="form-control my-3"
      v-model.trim="email"
      :class="[error.tipo == 'email' ? 'is-invalid' : '']"
    />
    <input
      type="password"
      placeholder="Password"
      class="form-control my-3"
      v-model.trim="pasword"
    />
    <button class="btn btn-primary" type="submit" :disabled="bloquear">
      Registrar
    </button>
  </form>
  
</template>

<script >
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      nombre: "",
      email: "",
      pasword: "",
    };
  },
  computed: {
    bloquear() {
      if (!this.email.includes("@")) {
        return true;
      }
      if (this.pasword.length > 5) {
        return false;
      }
      return true;
    },
    ...mapState(["error"]),
  },
  methods: {
    ...mapActions(["registrarUsuario"]),
    async procesarFormulario() {
      await this.registrarUsuario({
        nombre: this.nombre,
        email: this.email,
        pasword: this.pasword,
      });
      if (this.error.tipo != null) {
        return;
      }
      this.email = "";
      this.password = "";
      this.password2 = "";
    },
  },
};
</script>

<style scoped>
</style>