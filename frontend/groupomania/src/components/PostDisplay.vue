<template>
  <div class="post">
    <div class="jumbotron card post">
      <div class="postDelete" @click="postDelete()">
          Supprimer
        <i class="fas fa-trash-alt"></i>
      </div>

      <div class="postUser">
        <span> {{ userExt.nomExt }} </span>
        <span class="postUserDate"> {{ post.createdAt.split("T")[0] }} </span>
      </div>
      <h2>{{ post.title }}</h2>

      <div class="postContent">
        <span>{{ post.content }} </span>
      </div>

      <div class="postPic">
        <img :src="post.imageUrl" :alt="post.title" class="imgPost"/>
      </div>

      <div class="postLikes">
        <button
          class="postLike"
          :disabled="disliked"
          :class="{ focused: liked }"
          @click="onLike"
        >
          <i class="fas fa-thumbs-up"></i>
          <span> {{ post.likes }} </span>
        </button>
        <button
          class="postDislike"
          :disabled="liked"
          :class="{ focused: disliked }"
          @click="onDislike"
        >
          <i class="fas fa-thumbs-down"></i>
          <span> {{ post.dislikes }} </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostDisplay",
  props: ["post", "user"],
  data() {
    return {
      userExt: {},
      postId: this.post.id,
      revele: false,
      liked: false,
      disliked: false,
      like: 0,
    };
  },
  mounted: function () {
    this.getPostUser();
    this.checkUserLike();
  },
  methods: {
    // recupere l'info du createur de l'article
    getPostUser: function () {
      this.$store
        .dispatch("getUserData", { id: this.post.UserId })
        .then((userExt) => {
          this.userExt = userExt.data;
        })
        .catch((error) => console.error(error));
    },
    // bouton pour delete article
    postDelete: function () {
      console.log(this.post.id);
      if (confirm("voulez-vous vraiment supprimer cette publication ?")) {
        this.$store
          .dispatch("postDelete", this.post.id)
          .then(() => {
            this.$store.dispatch("postGetAll");
          })
          .catch((error) => console.error(error));
      }
    },
    // fonction click like
    onLike: function () {
      if (this.liked) {
        this.like = 0;
      } else {
        this.like = 1;
      }
      this.liked = !this.liked;
      this.$store
        .dispatch("postLike", {
          id: this.postId,
          userId: this.user.userId,
          like: this.like,
        })
        .then((res) => {
          console.log(res);
          this.$store.dispatch("postGetAll");
        })
        .catch((error) => console.error(error));
    },
    // fonction click dislike
    onDislike: function () {
      if (this.disliked) {
        this.like = 0;
      } else {
        this.like = -1;
      }
      this.disliked = !this.disliked;
      this.$store
        .dispatch("postLike", {
          id: this.postId,
          userId: this.user.userId,
          like: this.like,
        })
        .then((res) => {
          console.log(res);
          this.$store.dispatch("postGetAll");
        })
        .catch((error) => console.error(error));
    },
    // check chaque article si like ou dislike par le user
    checkUserLike: function () {
      let userId = this.user.userId.toString();
      if (this.post.userLiked.includes(userId)) {
        this.liked = true;
      } else if (this.post.userDisliked.includes(userId)) {
        this.disliked = true;
      }
    },
    // autorisation admin ou user
    authorised: function () {
      if (this.user.isAdmin) {
        return true;
      }
      return false;
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
