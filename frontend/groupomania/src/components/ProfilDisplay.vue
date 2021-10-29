<template>
  <div class="profil container">
    <div class="card">
      <h1 class="card__title">Espace perso</h1>
      <div class="card presentation">
        <p>Bienvenue {{ user.nom }}!!</p>
        <p>Te voilà sur ton espace personnel du réseau social groupomania.</p>
        <router-link class="homepageLink" to="/homepage">N'hésite pas à aller voir les dernières publications de tes collègues!</router-link>
      </div>
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
            Modifier mon mot de passe
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
            @click="userModify()"
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
          >
            <i class="fas fa-trash-alt"></i>
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
      window.location.reload();
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
    setHomepage() {
      
      this.$store.commit("logout");
      this.router.push("/homepage");      
      window.location.reload();
    },
    userModify: function () {
      if (confirm("Etes vous sûr de vouloir modifier votre mot de passe ?")) {
        this.$store
          .dispatch("userModify", {
            id: this.user.userId,
            password: this.password,
          })
          .then((res) => {
            console.log(res);
            this.mode = "read";
            this.$router.push("/profil");
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
  max-width: 650px;
  margin: 0 auto 100px;
  padding: 25px;
  border-radius: 12px;
  background-color: #f2f2f2;
  opacity: 0.85;
  align-items: center;
  text-align: center;

  &__title {
    padding-bottom: 45px;
  }

  &__option {
    padding-top: 75px;
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

.presentation {
  font-size: 20px;
  background-color: #fafafa;
  margin-bottom: 0;
}

.homepageLink {
  color: #091F43;
  text-decoration: none;
}
</style>
