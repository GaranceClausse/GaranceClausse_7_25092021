<template>
  <div class="post">
    <div class="jumbotron card post">
        <span class="postDelete px-4" v-if="authorised(this.post)" @click="postDelete()">
          <i class="fas fa-trash-alt deleteIcon"></i>
        </span>
      <div class="postUser col-8 py-3">
        <span class="postUserName"> Post de <span class="userName font-weight-bold">{{ userExt.nomExt }}</span> </span><br>
        <span class="postUserDate"> créé le {{ post.createdAt.split("T")[0] }} à {{ post.createdAt.split("T")[1].split(".")[0] }}</span>
        
      </div>
      
      <div class="postCard">
          <h2 class="postTitle">{{ post.title }}</h2>
        <div class="postContent pb-3">
          <span class="postContentText">{{ post.content }} </span>
        </div>

        <div class="postPic">
          <img :src="post.imageUrl" :alt="post.title" class="imgPost" />
        </div>

        <div class="postLikes">
          <button
            class="postLike postLike__left"
            :disabled="disliked"
            :class="{ focused: liked }"
            @click="onLike"
          >
            <i class="fas fa-thumbs-up px-2"></i>
            <span> {{ post.likes }} </span>
          </button>
          <button
            class="postLike postLike__mid"
            :disabled="liked"
            :class="{ focused: disliked }"
            @click="onDislike"
          >
            <i class="fas fa-thumbs-down px-2"></i>
            <span> {{ post.dislikes }} </span>
          </button>
          <button
            class="postLike postLike__right"
            :class="{ replyActive: revele }"
            @click="toggleReply"
          >
            <i class="fas fa-comment-alt"></i>
          </button>
        </div>
      </div>
      <Reply v-if="revele" :revele="revele" :postId="postId" />
    </div>
  </div>
</template>

<script>
import Reply from "../components/ReplyDisplay.vue";

export default {
  name: "PostDisplay",
  props: ["post", "user"],
  components: {
    Reply,
  },
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
    toggleReply: function () {
      this.revele = !this.revele;
    },
    // autorisation admin ou user
    authorised: function (model) {
      if (this.user.userId == model.UserId || this.user.isAdmin) {
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
  margin: 0 auto 30px;
  padding: 15px;
  border-radius: 12px;
  background-color: #f2f2f2;
  opacity: 0.85;
  align-items: center;
}


button:disabled {
    color:#7a7878;
}

.deleteIcon {
    color: #d1515a;
    padding: 10px;
    border: 1px solid #d1515a;
    border-radius: 20%;
    position: absolute;
    top: 18px; right: 40px;
    @media all and (max-width: 380px) {
    right:20px;
  }
}

.postUser {
    position: absolute;
    top: 13px;
    left: 5px;
    color:#4b4949;
    font-size: 15px;
}

.postUserDate {
    font-size: 10px;
    margin-top: 0;
}

.postTitle {
    font-size: 22px;
    padding-top: 75px;
    text-align: left;
    font-weight: 700;
}

.userName {
    color: #d1515a;
}

.postCard {
  width: 100%;
}

.postContentText {
    text-align: right;
}

.postLike {
  width: 33.3333333333333333333333333333%;
  color: #d1515a;
  border: 1px solid #b1acac;

  &__left {
    border-radius: 0 0 0 10px;
    border-right: none;
  }
  &__mid {
    border-left: none;
    border-right: none;
  }
  &__right {
    border-radius: 0 0 10px 0;
    border-left: none;
  }
}

.imgPost {
  width: 100%;
  border-radius: 10px 10px 0 0;
}
</style>
