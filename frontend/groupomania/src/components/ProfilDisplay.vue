<template>
  <div class="profil container">
    <div class="card">
      <h1 class="card__title">Espace perso</h1>
      <p>Bienvenue {{ user.nom }}</p>
      <img
        src="https://cdn.xxl.thumbs.canstockphoto.fr/symbole-neutre-classement-gris-r%C3%A9action-utilisateur-icon-figure-profil-vecteurs-eps_csp83470938.jpg"
        height="150"
        width="150"
      />
      <div class="form">
        <div class="user">
          <div v-if="mode !== 'modify'" class="inputfield py-3">
            <label for="username">Utilisateur :</label>
            <input
              type="text"
              id="username"
              name="username"
              :placeholder="user.nom"
              disabled
            />
          </div>
          <div v-if="mode === 'read'" class="inputfield py-3">
            <label for="email">Adresse email :</label>
            <input
              type="email"
              id="email"
              name="email"
              :placeholder="user.email"
              disabled
            />
          </div>
          <div v-if="mode === 'modify' || mode === 'delete'" class="inputfield py-3">
            <label for="password">Mot de passe :</label>
            <input
              v-model="password"
              type="password"
              id="password"
              name="password"
              maxlength="255"
              :required="mode === 'modify' || mode === 'delete'"
              :disabled="mode === 'read'"
            />
          </div>
          <div v-if="mode === 'modify'" class="inputfield">
            <label for="confirm">Confirmation :</label>
            <input
              v-model="confirm"
              type="password"
              id="confirm"
              maxlength="255"
              :required="mode === 'modify'"
              :disabled="mode !== 'modify'"
            />
          </div>
        </div>
        <div class="card__option">
          <h4 v-if="mode === 'read'">Gérer mon compte :</h4>
          <button
            v-if="mode === 'read'"
            role="button"
            class="card_action"
            @click="setModify"
          >
            Modifier mes informations
          </button>
          <button role="button" class="card_action" @click="setDelete">
            Supprimer mon compte
          </button>

          <button
            v-if="mode === 'modify' || mode === 'delete'"
            role="button"
            class="card_action"
            @click="setRead"
          >
            Annuler
          </button>
        </div>
        <div class="inputfield">
          <button
            v-if="mode === 'read'"
            @click="logout()"
            class="btn btn__lg btn__danger"
          >
            Déconnexion
          </button>
          <button
            v-if="mode === 'modify'"
            @click="setRead()"
            type="submit"
            class="btn btn__lg btn__success"
            :disabled="!validatedFields"
          >
            Enregistrer
          </button>
          <button
            v-if="mode === 'delete'"
            class="btn btn__lg btn__danger"
            @click="userDelete()"
          ><i class="fas fa-trash-alt"></i>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProfilDisplay",
  data() {
    return {
      mode: "read",
      username: "",
      email: "",
      password: "",
      confirm: "",
    };
  },
  computed: {
    validatedFields: function () {
      return this.password !== "" && this.password === this.confirm;
    },
    ...mapState({
      user: "user",
    }),
  },
  mounted() {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId === 0) {
      this.$store
        .dispatch("getUserData", { id: 0 })
        .then((user) => {
          this.$store.commit("userOn", user.data);
        })
        .catch((error) => {
          console.error(error);
          this.$store.commit("logout");
          this.$router.push("/");
        });
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
    setRead() {
      this.mode = "read";
    },
    setModify() {
      this.mode = "modify";
    },
    setDelete() {
      this.mode = "delete";
    },
    userDelete: function () {
      if (confirm("Etes vous sûr de vouloir supprimer votre compte ?")) {
        this.$store
          .dispatch("userDelete", {
            id: this.user.userId,
            password: this.password,
          })
          .then((res) => {
            console.log(res);
            this.$store.commit("logout");
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error);
            this.password = "";
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.btn {
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  outline: 0;
  border: 0;
  border-radius: 12px;
  width: 100%;
  padding: 15px;
  margin: 10px auto;
  background: #d1515a;
  color: #fafafa;
  text-transform: uppercase;
}

.profil {
  padding: 0;
  margin: 0 auto;
}

.user__info {
  padding: 25px auto;
}

.card {
  position: relative;
  z-index: 1;
  width: 550px;
  height: 100%;
  margin: 0 auto;
  padding: 45px;
  border-radius: 12px;
  background-color: #f2f2f2;
  opacity: 0.85;

  &__title {
    padding-bottom: 45px;
  }

  &__option {
    padding-top: 95px;
    display: flex;
    flex-direction: column;
  }

  &_action {
    text-decoration: underline;
    border: none;
    &:hover {
      color: #d1515a;
    }
  }
}
</style>
