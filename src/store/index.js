import { createStore } from "vuex";
import router from "@/router";
export default createStore({
  state: {
    proveedores: [],
    objForm: {
      id: "",
      nombre: "",
      email: "",
      pasword: "",
    },
    objFormProve: {
      nombre: "",
      correo: "",
      rfc: "",
      razonSocial: "",
      calle: "",
      noI: "",
      noE: "",
      entidad: "",
      municipio: "",
      codigoPostal: "",
      estatus: "",
      telefono: "",
      id: "",
    },
    user: null,
    user2: null,
    error: { tipo: null, msg: null },
  },
  getters: {},
  mutations: {
    setError(state, payLoad) {
      if (payLoad == null) {
        return (state.error = { tipo: null, msg: null });
      }
      if (payLoad === "EMAIL_NOT_FOUND") {
        return (state.error = { tipo: "email", msg: "Email no registrado" });
      }
      if (payLoad === "INVALID_PASSWORD") {
        return (state.error = {
          tipo: "password",
          msg: "Contraseña equivocada",
        });
      }
      if (payLoad === "EMAIL_EXISTS") {
        return (state.error = {
          tipo: "email",
          msg: "email ya esta registrado!!",
        });
      }
      if (payLoad === "INVALID_EMAIL") {
        return (state.error = { tipo: "email", msg: "email invalido!!" });
      }
    },
    setUser(stage, payLoad) {
      stage.user = payLoad;
    },
    set(stage, payLoad) {
      stage.proveedores.push(payLoad);
      console.log(stage.proveedores);
      localStorage.setItem('proveedores', JSON.stringify(stage.proveedores))
    },
    eliminar(stage, payLoad) {
      stage.proveedores = stage.proveedores.filter(
        (item) => item.id !== payLoad
      );
      //localStorage.setItem('proveedores', JSON.stringify(stage.proveedores))
    },
    tarea(stage, payLoad) {
      if (!stage.proveedores.find((item) => item.id === payLoad)) {
        router.push("/");
        return;
      }
      stage.objForm = stage.proveedores.find((item) => item.id === payLoad);
    },
    update(stage, payload) {
      stage.proveedores = stage.proveedores.map((item) =>
        item.id === payload.id ? payload : item
      );
      router.push("/");
      //localStorage.setItem('proveedores', JSON.stringify(stage.proveedores))
    },
    cargar(stage, payload) {
      stage.proveedores = payload;
      console.log(stage.proveedores);
    },
    provedoresSet(stage, payLoad) {
      if (!stage.proveedores.find((item) => item.rfc === payLoad)) {
        router.push("/");
        return;
      }
      stage.objFormProve = stage.proveedores.find(
        (item) => item.rfc === payLoad
      );
    },
    updateTareas(stage, payload) {
      stage.proveedores = stage.proveedores.map((item) =>
        item.id === payload.id ? payload : item
      );
      router.push("/");
    },
    updateProvedores(stage, payload) {
      stage.proveedores = stage.proveedores.map((item) =>
        item.id === payload.id ? payload : item
      );
      router.push("/");
    },
  },
  actions: {
    cerrarSesion({ commit }) {
      commit("setUser");
      router.push("/login");
      localStorage.removeItem("usuario");
    },
    async ingresoUsuario({ commit }, usuario) {
      console.log(usuario);
      try {
        const data = await fetch("http://localhost:9080/usuarios/login", {
          method: "POST",
          dataType: "JSON",
          body: JSON.stringify({
            email: usuario.email,
            pasword: usuario.pasword,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const userDB = await data.json();
        console.log(userDB);
        if (userDB.error) {
          console.log(userDB.error);
          return commit("setError", userDB.error.message);
        }

        commit("setUser", userDB);
        commit("setError", null);
        router.push("/");
        localStorage.setItem("usuario", JSON.stringify(userDB));

      } catch (error) {}
    },
    async registrarUsuario({ commit }, usuario) {
      try {
        const res = await fetch(`http://localhost:9080/usuarios/add`, {
          method: "POST",
          body: JSON.stringify({
            nombre: usuario.nombre,
            email: usuario.email,
            pasword: usuario.pasword,
          }),
          headers: { "Content-Type": "application/json" },
        });
        //const datos = await res.json()
        //commit('setUser', datos )
        //localStorage.setItem("")
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
      console.log(usuario);
    },
    async registrarProveedor({ commit }, proveedor) {
      const {nombre, correo, rfc, razonSocial, calle, noI,
            noE, entidad, municipio, codigoPostal, estatus, telefono   } = proveedor;
      try {
        const res = await fetch(`http://localhost:9080/proveedor/add`, {
          method: "POST",
          body: JSON.stringify({
            nombre, correo, rfc, razonSocial, calle, noI,
            noE, entidad, municipio, codigoPostal, estatus, telefono 
          }),
          headers: { "Content-Type": "application/json" },
        });
        const datos = await res.json()
        if (!datos) {
          console.log(userDB.error);
          //return commit("setError", userDB.error.message);
        }
        router.push("/");
        commit('set', proveedor)
        //localStorage.setItem("usuario", JSON.stringify(proveedor));
      } catch (error) {
        console.log(error);
      }
      //console.log(usuario);
    },
    async cargarLocalStorage({ commit, state }) {
      if (localStorage.getItem("usuario")) {
        commit("setUser", JSON.parse(localStorage.getItem("usuario")));
      } else {
        return commit("setUser", null);
      }

      try {
        const res = await fetch(`http://localhost:9080/proveedor`);
        const db = await res.json();
        const arrayDatos = [];
         //Obtenemos la Entidad
         const restEntidad = await fetch(
           `http://localhost:9080/entidades/`
         );
         const entidad = await restEntidad.json();
         const restMunicipio = await fetch(
          `http://localhost:9080/municipios`
        );
        const municipio = await restMunicipio.json();

        for (let id in db) {
         
          // //Obtenemos el Municipio
         
          const mChalan = entidad.filter(x => x.id === db[id].entidad);
          const municipioFiltrado =  municipio.filter(x => x.id === db[id].municipio);
          // db[id].entidad = mChalan[0].nombre;
          // db[id].municipio = municipioFiltrado[0].nombre ;
          arrayDatos.push(db[id]);
        }

        commit("cargar", arrayDatos);
      } catch (error) {
        console.log(error);
      }
    },

    async setTarea({ commit, state }, objForm) {
      try {
        const res = await fetch(`http://localhost:9080/usuarios/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(objForm),
        });

        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      commit("set", objForm);
    },

    async deleteproveedores({ commit, state }, id) {
      try {
        const res = await fetch(`http://localhost:9080/proveedor/delete/${id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.log("Error");
      }
      commit("eliminar", id);
    },

    setTareaEditar({ commit }, id) {
      commit("tarea", id);
    },
    setTareaEditarProvedor({ commit }, id) {
      commit("provedoresSet", id);
    },
    async updateTarea({ commit, state }, tarea) {
      try {
        const res = await fetch(
          `http://localhost:9080/usuarios/update/${tarea.id}`,
          {
            method: "PUT",
            body: JSON.stringify(tarea),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    async updateProveedor({ commit, state }, proveedor) {
      try {
        const res = await fetch(
          `http://localhost:9080/proveedor/update/${proveedor.id}`,
          {
            method: "PUT",
            body: JSON.stringify(proveedor),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    },


  },
  getters: {
    usuarioAutenticado(state) {
      return !!state.user;
    },
  },
  modules: {},
});
