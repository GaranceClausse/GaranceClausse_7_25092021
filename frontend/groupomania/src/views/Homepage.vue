<template>
  <div class="homepage justify-content-center container col-md-10 col-12">
    <PostCreate> </PostCreate>
    
    <h1 class="title">Les derniers post en date :</h1>
    <PostDisplay v-for="post in posts" :key="post.id" :post="post" :user="user">
    </PostDisplay>
  </div>
</template>

<script>
import PostCreate from "@/components/PostCreate.vue";
import PostDisplay from "@/components/PostDisplay.vue";

import { mapState } from 'vuex';

export default {
  name: "Homepage",
  components: {
    PostCreate,
    PostDisplay,
  },
  beforeMounted: function () {
    console.log(this.$store.state.user.userId);
    this.$store
      .dispatch("getUserData", { id: 0 })
      .then((user) => {
        console.log(user);
        this.$store.commit("userOn", user);
      })
      .catch((error) => console.error(error));
  },
  mounted: function () {
    if (this.$store.state.user.userId === 0) {
      this.$store
        .dispatch("getUserData", { id: 0 })
        .then((user) => {
          this.$store.commit("userOn", user.data);
          
    console.log(this.$store.state.user);
        })
        .catch((error) => {
          console.error(error);
          this.$store.commit("logout");
          this.$router.push("/");
        });
    }
    this.$store.dispatch("postGetAll");
  },
  computed: {
    ...mapState({
      user: "user",
      posts: "posts",
    }),
  },
};
</script>

<style lang="scss" scoped>

.title {
    position: relative;
    z-index: 1;
    max-width: 650px;
    padding: 25px 25px 25px 0;
    margin: auto;
    font-size: 17px;
}
</style>
