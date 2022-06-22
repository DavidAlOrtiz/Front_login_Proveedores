<template>
  <!-- <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">email</th>
        <th scope="col">pasword</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tareas" :key="item.id">
        <th scope="row">{{ item.id }}</th>
        <td>{{ item.nombre }}</td>
        <td>
          {{ item.email }}
        </td>
        <td>{{ item.pasword }}</td>
        <td>
          <button class="btn teal accent-4" @click="deleteTareas(item.id)">
            Eliminar
          </button>
          <router-link
            class="btn teal accent-4 ml-2 btn-sm"
            :to="{
              name: 'editar',
              params: {
                id: item.id,
              },
            }"
          >
            Editar
          </router-link>
        </td>
      </tr>
    </tbody>
  </table> -->

  <div class="row mt4" style="margin-top:18px">
    <div v-for="item in proveedores" :key="item.rfc">
      <div class="col s12 m6 l5">
        <div class="card z-depth-3">
          <div class="card-image">
            <img class="responsive-img" height="80px"
              src="https://static.vecteezy.com/system/resources/previews/000/357/350/original/businessman-vector-icon.jpg"
            />
             <router-link
              class="btn-floating
                halfway-fab
                waves-effect waves-light
                teal
                teal lighten-1"
              :to="{
                name: 'editarP',
                params: {
                  id: item.rfc,
                },
              }"
            >
              <i class="large material-icons">mode_edit</i>
            </router-link>
          </div>
          <div class="card-content ">
            <strong>
              Nombre: 
            </strong>{{ item.nombre }}
            <br>
            <strong>
              gmail: 
            </strong>{{ item.correo }}
             <br>
            <strong>
              Telefono: 
            </strong>{{ item.telefono }}
            <br>
            <strong>
              RFC: 
            </strong>{{ item.rfc }}
            <strong>
              Razon Social: 
            </strong>{{ item.razonSocial }}
             <br>
            <strong>
              Calle: 
            </strong>{{ item.calle }}
            <strong>
              No. Int: 
            </strong>{{ item.noI }}
            <strong>
              No. Ext: 
            </strong>{{ item.noE }}
             <br>
             <strong>
              Entidad: 
            </strong>{{ item.entidad }}
             <strong>
              Municipio: 
            </strong>{{ item.municipio }}
            <br>
            <strong>
              codigoPostal: 
            </strong>{{ item.codigoPostal }}
            <br>
            <strong>
              Estatus: 
            </strong>{{ item.estatus }}
          </div>
          <div class="card-action">
           <button
              class="
                btn
                 teal lighten-1
              "
              @click="deleteproveedores(item.id)"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="fixed-action-btn">
    <router-link  
            to="/agregarProvedores"
            class="btn-floating btn-large  pulse teal darken-1"
          >
            <i class="large material-icons">add</i>
    </router-link>
</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["proveedores"]),
  },
  methods: {
    ...mapActions(["deleteproveedores"]),
  },
};
</script>

