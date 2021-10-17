<template>
  <div class="profil container">
    <section class="wrapper wrapper__sm">
      <div class="card">
        <h2 class="card__title">Mon profil</h2>
        <div class="form">
          <div class="user">
            <div v-if="mode !== 'modify'" class="inputfield py-3">
              <label for="username">Utilisateur :</label>
              <input type="text" id="username" name="username" disabled />
            </div>
            <div v-if="mode !== 'modify'" class="inputfield py-3">
              <label for="email">Adresse email :</label>
              <input type="email" id="email" name="email" disabled />
            </div>
            <div v-if="mode === 'modify'" class="inputfield py-3">
              <label for="psw">Mot de passe :</label>
              <input
                v-model="psw"
                type="psw"
                id="psw"
                name="psw"
                maxlength="255"
                :required="mode === 'modify'"
                :disabled="mode !== 'modify'"
              />
            </div>
            <div v-if="mode === 'modify'" class="inputfield">
              <label for="confirm">Confirmation :</label>
              <input
                v-model="confirm"
                type="psw"
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
            <button v-if="mode === 'delete'" class="btn btn__lg btn__danger">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Profilmode",
  data() {
    return {
      mode: "read",
      username: "",
      email: "",
      psw: "",
      confirm: "",
    };
  },
  computed: {
    validatedFields: function () {
      return this.psw !== "" && this.psw === this.confirm;
    },
    ...mapState({
      user: "userInfos",
    }),
  },
  mounted() {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId === -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("showProfile");
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
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
