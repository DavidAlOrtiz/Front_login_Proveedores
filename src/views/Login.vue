<template>
  <h1 class="my-5">Iniciar session</h1>
  <!-- <div class="alert alert-danger" v-if="error.tipo != null">
    {{ error.msg }}
  </div> -->
  <form  @submit.prevent="procesarFormulario">
    <div class="row">
      <div class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input
              type="email"
              class="form-control my-3"
              v-model.trim="email"
              id="nombre"
              :class="[error.tipo == 'email' ? 'is-invalid' : '']"
            />
            <label for="nombre">email</label>
          </div>
          <div class="input-field col s12">
            <input
              type="password"
              class="form-control my-3"
              v-model.trim="pasword"
              :class="[error.tipo == 'password' ? 'is-invalid' : '']"
            />
            <label for="nombre">Contraseña</label>
          </div>
          <div class="input-field col s12">
            <button class="btn waves-effect waves-light" type="submit" :disabled="bloquear">
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script >
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
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
    ...mapActions(["ingresoUsuario"]),
    async procesarFormulario() {
      await this.ingresoUsuario({ email: this.email, pasword: this.pasword });
      if (error.tipo !== null) {
        return;
      }
      this.email = "";
      this.pasword = "";
    },
  },
};
</script>

<style scoped>
</style>