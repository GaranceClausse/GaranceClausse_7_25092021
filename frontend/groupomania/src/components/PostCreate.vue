<template>
  <div class="">
    <div class="jumbotron card homepage">
      <div class="createPost">
        <h1 class="card_title">Quoi de neuf {{ user.nom }} ? Partagez avec vos collègues!</h1>

        <form class="" enctype="multipart/form-data">
          <div class="col-6 center mx-auto my-2">
            <input
              v-model="title"
              type="text"
              name="title"
              placeholder="Titre..."
              class="form_row_input col-12 py-1"
              aria-required="true"
              @input="formValid()"
            />
          </div>

          <div class="col-6 center mx-auto my-2">
            <input
              v-model="content"
              type="text"
              name="content"
              placeholder="Quoi de neuf?"
              class="form_row_input col-12 py-3"
              aria-required="true"
              @input="formValid()"
            />
          </div>

          <div class="mx-auto my-2" v-if="image.length == 0">
            <input
              type="file"
              name="file"
              ref="file"
              accept=".png, .jpg, .jpeg, .gif"
              @change="fileSetting"
            />
          </div>

          <img v-if="image.length > 0" :src="image" alt="" class="imgPost" />

          <button
            type="button"
            class="card_action btn"
            :disabled="!validated"
            @click.prevent="postCreate()"
          >
            Poster
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PostCreate",
  data() {
    return {
      title: "",
      file: {},
      content: "",
      image: "",
      validated: false,
    };
  },
  
  computed: {
    ...mapState({
      user: "user",
    }),
  },
  mounted: function () {      
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId === 0) {
      this.$store
        .dispatch("getUserData", { id: 0 })
        .then((user) => {
          this.$store.commit("userOn", user.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
  methods: {
    fileSetting: function (event) {
      this.file = event.target.files[0] || event.dataTransfer.files;
      if (this.file == null) {
        this.image = "";
        return;
      }
      this.createImage(this.file);
    },
    // creation image permet l'apperçu de l'image pour la publication
    createImage: function (file) {
      let reader = new FileReader();
      reader.onload = (event) => {
        this.image = event.target.result;
        this.formValid();
      };
      reader.readAsDataURL(file);
    },
    // fonction creation post
    postCreate: function () {
      const formData = new FormData
      formData.append("file", this.file);
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("UserId", this.user.userId);
      console.log(this.file);
      this.$store
        .dispatch("postCreate", formData)
        .then((res) => {
          console.log(res);
          this.$router.push("/homepage");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // validation formulaire
    formValid: function () {
      if (
        (this.title.length > 0 && this.content.length > 0) ||
        (this.title.length > 0 && this.image.length > 0)
      ) {
        this.validated = true;
        return;
      }
      this.validated = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  z-index: 1;
  max-width: 650px;
  margin: 0 auto 100px;
  padding: 25px;
  border-radius: 12px;
  background-color: #f2f2f2;
  opacity: 0.85;
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

.imgPost {
    max-width: 220px;
}
</style>
