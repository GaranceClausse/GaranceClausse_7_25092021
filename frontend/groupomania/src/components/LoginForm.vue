<template>
  <div class="container col-8">
    <div class="row">
      <div class="card">
        <h1 class="card_title" v-if="mode === 'login'">Connexion</h1>
        <h1 class="card_title" v-else>Inscription</h1>
        <p class="card_subtitle" v-if="mode === 'login'">
          Pas encore de compte?
          <button class="card_action" @click="switchToCreateAccount()">
            Créer un compte
          </button>
        </p>
        <p class="card_subtitle" v-else>
          Tu as déjà un compte?
          <button class="card_action" v-on:click="switchToLogin()">Se connecter</button>
        </p>
        <div class="form-row">
          <input
            v-model="email"
            class="form_row_input col-12"
            type="text"
            placeholder="Adresse mail"
          />
        </div>
        <div class="form-row" v-if="mode === 'create'">
          <input
            v-model="username"
            class="form_row_input col-12"
            type="text"
            placeholder="Pseudo"
          />
        </div>
        <div class="form-row">
          <input
            v-model="password"
            class="form_row_input col-12"
            type="password"
            placeholder="Mot de passe"
          />
        </div>
        <div class="form_row" v-if="mode == 'login' && status == 'error_login'">
          Adresse mail et/ou mot de passe invalide
        </div>
        <div class="form_row" v-if="mode == 'create' && status == 'error_create'">
          <p class="wrongInfo">Adresse mail et/ou mot de passe invalide</p>
          <p class="wrongMdp"><i class="fas fa-exclamation-triangle"></i>   Le mot de passe doit faire 8 caractères et contenir une majuscule, une minuscule, et une chiffre</p>
        </div>
        <div class="form_row">
          <button
          v-on:click="userLogin()"
            class="button"
            :class="{ 'button--disabled': !validatedFields }"
            v-if="mode === 'login'">
            <span v-if="status == 'loading'">Connexion en cours...</span>
          <span v-else>Connexion</span>
          </button>
          <button
            v-on:click="createAccount()"
            class="button"
            :class="{ 'button--disabled': !validatedFields }"
            v-else>
          <span v-if="status == 'loading'">Création en cours...</span>
          <span v-else>Créer mon compte</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "LoginForm",
  data() {
    return {
      mode: "login",
      username: "",
      email: "",
      password: "",
      validated: false,
    };
  },
  mounted: function() {
    if (this.$store.state.user.userId != 0) {
      this.$router.push("/profil");
      return;
    }
  },    
  computed: {
    validatedFields() {
      if (this.mode == "create") {
        if (this.email != "" && this.username != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(['status'])
  },
  methods: {
    switchToCreateAccount() {
      this.mode = "create";
    },
    switchToLogin() {
      this.mode = "login";
    },
    // fonction pour se connecter, envoie les donné user au backend
    userLogin: function () {
      this.$store
        .dispatch("userLogin", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          this.$router.push("/profil");
        })
        .catch((error) => console.error(error));
    },
    createAccount() {
      if (this.email == "administrateur@groupomania.fr")
      {
        this.$store
        .dispatch("createAccount", {
          nom: this.username,
          email: this.email,
          password: this.password,
          isAdmin: true,
        })
        .then((res) => {
          console.log(res);
          this.userLogin(); // si ok, lance la fonction login
        })
        .catch((error) => console.error(error));
      }
      else 
      {
        this.$store
        .dispatch("createAccount", {
          nom: this.username,
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          this.userLogin(); // si ok, lance la fonction login
        })
        .catch((error) => console.error(error));
        }
    },
    
  },
};
</script>

<style scoped lang="scss">
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
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  outline: 0;
  border: 0;
  border-radius: 12px;
  width: 100%;
  padding: 15px;
  margin: 10px auto;
  background: #AD1D2A;
  color: #fafafa;
  text-transform: uppercase;

  &--disabled {
    background: grey;
  }
}

.container {
  padding: 8% 0 0;
  width: 365px;
  margin: auto;
}

.card {
  position: relative;
  z-index: 1;
  max-width: 450px;
  margin: 0 auto 100px;
  padding: 45px;
  border-radius: 12px;
  background-color: #f2f2f2;
  opacity: 0.85;
  
  align-items: center;
  text-align: center;
}

.card_action {
  text-decoration: underline;
  border: none;
  background-color: #fafafa;
}

.card_title {
  font-size: 25px;
}

.wrongInfo {
  margin-bottom: 5px;
}
.wrongMdp {
  font-size: 10px;
  
  margin-bottom: 5px;
}
</style>
