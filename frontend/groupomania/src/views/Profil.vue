<template>
  <div class="profil">
    <ProfilDisplay/>
  </div>
</template>

<script>
import ProfilDisplay from "@/components/ProfilDisplay.vue";
import { mapState } from 'vuex';

export default {
    name: 'Profil',
    components: {
        ProfilDisplay
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
  },
  computed: {
    ...mapState({
      user: "user",
    }),
  },
}
</script>
