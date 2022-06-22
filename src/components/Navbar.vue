<template>
  <!-- <div class="navbar navbar-dark bg-dark">
    <div class="flex">
      <router-link v-if="usuarioAutenticado" to="/" class="btn btn-dark">
        Tareas
      </router-link>
      <router-link
        v-if="!usuarioAutenticado"
        to="/registro"
        class="btn btn-dark"
      >
        Registro
      </router-link>
      <router-link v-if="!usuarioAutenticado" to="/login" class="btn btn-dark">
        Iniciar Session
      </router-link>
      <button
        v-if="usuarioAutenticado"
        @click="cerrarSesion"
        class="btn btn-dark"
      >
        Cerrar Session
      </button>
    </div>
  </div> -->
  <nav>
    <div class="nav-wrapper cyan darken-4">
      <router-link to="/" class="brand-logo" style="margin-left:10px"> Porvedores </router-link>

      <ul id="nav-mobile" class="right hide-on-med-and-down" style="margin-right:10px">
        
        <li>
          <router-link v-if="usuarioAutenticado" to="/" class="btn btn-dark">
            Proveedores
          </router-link>
        </li>
        <li>
          <router-link
            v-if="!usuarioAutenticado"
            to="/registro"
            class="btn btn-dark"
          >
            Registro
          </router-link>
        </li>
        <li>
          <router-link
            v-if="!usuarioAutenticado"
            to="/login"
            class="btn btn-dark"
          >
            Iniciar Session
          </router-link>
        </li>
        <li>
          <button 
            v-if="usuarioAutenticado"
            @click="cerrarSesion"
            class="btn btn-dark"
          >
            Cerrar Session
          </button>
        </li>
      </ul>
      
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["usuarioAutenticado"]),
  },
  methods: {
    ...mapActions(["cerrarSesion"]),
  },
};
</script>

<style>
</style>