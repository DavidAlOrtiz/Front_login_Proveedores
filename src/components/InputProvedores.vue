<template>
  <!-- {{objFormProve}} -->

  <div class="row">
    <div class="input-field col m4 s12">
      <input
        type="text"
        v-model="objFormProve.rfc"
        placeholder="RFC:"
        class="form-control my-2"
        id="txtRfac"
      />
      <!-- <label for="txtRfac">Calle:</label> -->
    </div>
    <div class="input-field col m4 s12">
      <input
        type="text"
        v-model="objFormProve.razonSocial"
        placeholder="Razon social:"
        class="form-control my-2"
        id="txtRS"
      />
      <!-- <label for="txtRS">Razon social:</label> -->
    </div>
    <div class="input-field col m4 s12">
      <i class="material-icons prefix">account_circle</i>
      <input
        id="icon_prefix"
        v-model="objFormProve.nombre"
        type="text"
        class="validate"
      />
      <!-- <label for="icon_prefix">First Name</label> -->
    </div>
    <div class="input-field col m6 s12">
      <input
        id="txtCalle"
        v-model="objFormProve.calle"
        placeholder="Calle:"
        type="text"
      />
      <!-- <label for="txtCalle">Calle:</label> -->
    </div>
    <div class="input-field col m3 s12">
      <input
        id="txtNi"
        v-model="objFormProve.noI"
        placeholder="No.Int"
        type="text"
      />
      <!-- <label for="txtNi">No. Int:</label> -->
    </div>
    <div class="input-field col m3 s12">
      <input
        id="txtEt"
        placeholder="No. ext"
        v-model="objFormProve.noE"
        type="text"
      />
      <!-- <label for="txtEt">No. Ext:</label> -->
    </div>
    <!-- <div class="input-field col m4 s12">
      <input id="txtCol" v-model="objFormProve.localidad" placeholder="Colonia:" type="text" />
      <label for="txtCol">Colonia:</label>
    </div> -->
    <!-- <div class="input-field col m3 s12">
      <input id="txtLocali" placeholder="Localidad" v-model="objFormProve.localidad" type="text" />
      <label for="txtLocali">Localidad:</label>
    </div> -->
    {{ this.municipios }}
    <!-- Selects -->
    <div class="input-field col m4 s12">
      <select @change="cambiar" v-model="objFormProve.entidad" ref="select">
        <option value="" disabled selected>Seleccionar</option>

        <option
          v-for="municipioLista in this.municipios"
          :key="municipioLista"
          :value="municipioLista.nombre"
        >
          {{ municipioLista.nombre }}
        </option>
      </select>
      <label>Entidad</label>
    </div>

    <div class="input-field col m4 s12">
      <select v-model="objFormProve.municipio" >
        <option value="" disabled selected>Seleccionar</option>
        <option
          v-for="municipioLista in this.municipiosE"
          :key="municipioLista"
          :value="municipioLista.nombre"
        >
          {{ municipioLista.nombre }}
        </option>
      </select>
      <label>Municipio</label>
    </div>

    <!-- <div class="input-field col m2 s12">
      <input id="txtPais" type="text" />
      <label for="txtPais">Pais:</label>
    </div> -->
    <div class="input-field col m4 s12">
      <input
        id="txtCp"
        placeholder="Codigo Postal:"
        v-model="objFormProve.codigoPostal"
        type="text"
      />
      <!-- <label for="txtCp">CP:</label> -->
    </div>

    <div class="input-field col m4 s12">
      <i class="material-icons prefix">email</i>
      <input
        id="emial"
        placeholder="Gmail:"
        v-model="objFormProve.correo"
        type="email"
        class="validate"
      />
      <!-- <label for="emial">Gmail:</label> -->
    </div>
    <div class="input-field col m4 s12">
      <i class="material-icons prefix">local_phone</i>
      <input
        id="telefono"
        placeholder="Telefono"
        v-model="objFormProve.telefono"
        type="text"
        class="validate"
      />
      <!-- <label for="telefono">Telefono:</label> -->
    </div>

    <!-- select estatus -->
    <div class="md-layout-item input-field col m4 s12">
      <select ref="estatus" class="md-select" v-model="objFormProve.estatus">
        <option value="" disabled selected>Seleccionar</option>
        <option value="Activo">Activo</option>
        <option value="Desactivo">Desactivo</option>
        <option value="Moroso">Moroso</option>
      </select>
      <label>Estatus</label>
    </div>
  </div>
  <input
    type="submit"
    class="btn btn-primary mt-2 w-100"
    value="Guardar/Actualizar"
  />
  {{this.municipiosE}}
</template>

<script>
import { onBeforeUnmount, onUpdated } from "@vue/runtime-core";
export default {
  props: {
    objFormProve: Object,
  },
  data() {
    return {
      municipios: [],
      municipiosE: [],
      municipiosFultrados: [],
    };
  },
  computed: {
    // desavilitar(){
    //   return this.objForm.nombre.trim() === "" ? true : false
    // }
  },
  methods: {
    async cambiar(e) {
      const id = e.target.value;
      console.log(e.target.value)
      this.municipiosE = this.municipiosFultrados.filter(
        (x) => x.entidad == id
      );
      console.log(this.municipiosFultrados);
    },
  },
  async beforeMount() {
 //
    const datos = await fetch("http://localhost:9080/entidades");
    const resultado = await datos.json();
    this.municipios = resultado;
    setTimeout(()=>{
    M.AutoInit();
    }, 1000)
  },
  async mounted() {
   
    //
    const datosE = await fetch("http://localhost:9080/municipios");
    const resultadoE = await datosE.json();
    this.municipiosE = resultadoE;
    this.municipiosFultrados = resultadoE;
    console.log(this.municipiosE);
    this.municipiosE = this.municipiosE.filter(x => x.entidad == this.objFormProve.entidad)
    console.log(this.municipiosE);
    setTimeout(()=>{
    M.AutoInit();
    }, 1000)
  },
};
</script>

<style>
</style>