<template>
  <div class="container col-8">
    <div class="row">
      <div class="card">
        <h1 class="card_title" v-if= "mode == 'login'">Connexion</h1>
        <h1 class="card_title" v-else>Inscription</h1>
        <p class="card_subtitle" v-if= "mode == 'login'">
          Pas encore de compte?
          <button class="card_action" @click="switchToCreateAccount()">Créer un compte</button>
        </p>
        <p class="card_subtitle" v-else>
          Tu as déjà un compte?
          <button class="card_action" v-on:click="switchToLogin()">Se connecter</button>
        </p>
        <div class="form-row ">
          <input
            v-model="email"
            class="form_row_input col-12"
            type="text"
            placeholder="Adresse mail"
          />
        </div>
        <div class="form-row" v-if="mode == 'create'">
          <input v-model="name" class="form_row_input col-12" type="text" placeholder="name" />
          <input
            v-model="pseudo"
            class="form_row_input col-12"
            type="text"
            placeholder="Pseudo"
          />
        </div>
        <div class="form-row">
          <input
            v-model="psw"
            class="form_row_input col-12"
            type="password"
            placeholder="Mot de passe"
          />
        </div>
        <div class="form_row">
          <button class="button button--disabled" v-if="mode == 'login'">
            Connexion
          </button>
          <button v-on:click="createAccount()" class="button" :class="{ 'button--disabled': !validatedFields() }" v-else>
            Créer mon compte
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      mode: "login",
      email: "",
      name: "",
      pseudo: "",
      psw: "",
    };
  },
  computed: {
    validatedFields() {
      if (this.mode == "create") {
        if (this.email != "" && this.name != "" && this.pseudo != "" && this.psw != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.psw != "") {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  methods: {
    switchToCreateAccount() {
      this.mode="create";
    },
    switchToLogin() {
      this.mode="login";
    },
    createAccount() {
      this.$store.dispatch("createAccount", {
        email: this.email,
        name: this.name,
        pseudo: this.pseudo,
        pwd: this.pwd,
      });
    },
  },
};
</script>

<style scoped>
.form-row {
  display: flex;
  margin: 10px auto;
  flex-wrap: wrap;
}

.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
}

.button {
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  outline: 0;
  border: 0;
  border-radius: 12px;
  width: 100%;
  padding: 15px;
  margin: 10px auto;
  background: #D1515A;
  color: #FAFAFA;
  text-transform: uppercase;
}

.container{
  padding: 8% 0 0;
  width: 365px;
  margin: auto;
}

.card{
  position: relative;
  z-index: 1;
  max-width: 450px;
  margin: 0 auto 100px;
  padding: 45px;
  border-radius: 12px;
  background-color:#f2f2f2;
  opacity: 0.85;
}

.card_action {
    text-decoration: underline;
    border: none;
    background-color: #FAFAFA;

}

.card_title {
    font-size: 25px;
}

</style>
