<template>
  <div class="reply d-flex row mx-0 justify-content-center">
    <div class="replyList">
      <div class="replyCard card my-3" v-for="reply in replies" :key="reply.id">
        <div class="replyCard__info">
          <div class="replyCard__user">
            <span class="replyCard__date">
              Ecrit par
              <span class="font-weight-bold replyCard__name">{{ reply.nom }}</span
              ><br />
              le {{ reply.createdAt.split("T")[0] }} à
              {{ reply.createdAt.split("T")[1].split(".")[0] }}
            </span>
          </div>
          <span
            class="reply__delete"
            v-if="authorised(reply)"
            @click="replyDelete(reply.id)"
          >
            <i class="fas fa-trash-alt deleteIcon"></i>
          </span>
          <div class="replyCard__text">
            <span> {{ reply.comment }} </span>
          </div>
        </div>
      </div>
    </div>

    <div class="reply__post d-flex">
      <textarea
        v-model="comment"
        name="reply"
        aria-required="true"
        placeholder="Ecrivez un commentaire..."
        @input="replyValid()"
        class="reply__input"
      ></textarea>
      <button type="button" class="reply__add" :disabled="!validated" @click="replyPost">
        <i class="fas fa-plus reply__addIcon"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Reply",
  props: ["revele", "postId", "toggleReply"],
  data() {
    return {
      userExt: {},
      comment: "",
      replies: [],
      validated: false,
    };
  },
  computed: {
    ...mapState({
      user: "user",
    }),
  },
  mounted: function () {
    this.repliesGetAll();
  },
  methods: {
    replyPost: function () {
      this.$store
        .dispatch("replyPost", {
          comment: this.comment,
          nom: this.user.nom,
          UserId: this.user.userId,
          PostId: this.postId,
        })
        .then((res) => {
          console.log(res);
          this.repliesGetAll();
          this.comment = "";
          this.validated = false;
        })
        .catch((error) => console.error(error));
    },
    repliesGetAll: function () {
      this.$store
        .dispatch("repliesGetAll", this.postId)
        .then((res) => {
          this.replies = res.data;
        })
        .catch((error) => console.error(error));
    },
    replyDelete: function (id) {
      if (confirm("Voulez-vous supprimer ce commentaire ?")) {
        this.$store
          .dispatch("replyDelete", id)
          .then(() => {
            this.repliesGetAll();
          })
          .catch((error) => console.error(error));
      }
    },
    replyValid: function () {
      if (this.comment.length > 2) {
        this.validated = true;
        return;
      }
      this.validated = false;
    },
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
.reply {
  width: 100%;

  &__post {
    width: 100%;
  }

  &__input {
    width: 75%;
    border-right: none;
    border-radius: 10px 0 0 10px;
  }
  &__add {
    width: 10%;
    border-radius: 0 10px 10px 0;
    color: #4b4949;
  }
}

.replyList {
  width: 100%;
}

.replyCard {
  width: 80%;
  background: #ced2da;
  border-radius: 15px;

  @media all and (max-width: 472px) {
    max-width: 280px;
  }
  @media all and (max-width: 380px) {
    max-width: 200px;
  }

  &__user {
    position: absolute;
    top: 10px;
    left: 15px;
    color: #4b4949;
    font-size: 12px;
    @media all and (max-width: 472px) {
      top: 30px;
    }
  }
  &__text {
    padding-top: 1.5rem;
    text-align: left;
    @media all and (max-width: 472px) {
      padding-top: 55px;
    }

    &__name {
      color: #D31D2A;
    }
  }
}

.card {
  position: relative;
  z-index: 1;
  padding: 25px 25px 15px 15px;
  border-radius: 12px;
}

.deleteIcon {
  font-size: 12px;
  color: #D31D2A;
  padding: 5px;
  border: 1px solid #D31D2A;
  border-radius: 20%;
  position: absolute;
  top: 10px;
  right: 10px;
  @media all and (max-width: 472px) {
    top: 0;
    right: 0;
    border: none;
    border-bottom: solid;
    border-radius: 0 0 12px 12px;
    padding: 3% 51% 3% 45%;
    margin-top: 0;
    background: #f2f2f2;
  }
}
</style>
