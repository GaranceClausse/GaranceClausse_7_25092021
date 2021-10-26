<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    HelloWorld
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
    if (this.$store.state.user.userId === 0) {
      this.$store
        .dispatch("getUserData", { id: 0 })
        .then((user) => {
          this.$store.commit("userOn", user.data);
          this.$router.push("/homepage");
        })
        .catch((error) => {
          console.error(error);
          this.$store.commit("logout");
          this.$router.push("/login");
        });
    }
  },

}
</script>
