<template>
    <div class="container col-8">
    <div class="row">
      <div class="card">
        <h1 class="card_title">Votre profil</h1>
        <div class="form-row ">
          Pseudo : <span class="info"> {{ pseudo }} </span>
        </div>
        <div class="form-row">
          Nom : <span class="info"> {{ name }} </span>
        </div>
        <div class="form-row">
          E-mail : <span class="info"> {{ email }}</span>
        </div>
        <div class="form-row">
          Mot de passe : <span class="info">{{ psw }}</span>
        </div>
        <div class="form_row">
          <button class="button button--disabled">
           Modifier mon profil
          </button>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ProfilDisplay',
    data () {
    return {
      email: "kvgurie",
      name: "ljkghj",
      pseudo: "ljkh",
      psw: "mlihukg",
    };
  },
}
</script>

<style scoped>
.form-row {
  display: flex;
  margin: 10px auto;
  flex-wrap: wrap;
  font-weight: bold;
}

.info {
    font-weight: 400;
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
