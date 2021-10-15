<template>
  <div class="homepage justify-content-center container col-10">
    <h1>Fil d'actualité</h1>
    <div class="d-flex justify-content-center row">
        <h2 class="display-6" v-if="likes.length > 0">Vos posts préférés!</h2>
        <MessageDisplay v-for="like in likes" v-bind:key='like'></MessageDisplay>
    </div>
      <h2 class="display-6">Les derniers postes en date!</h2>
    <div class="d-flex justify-content-center row">
          <MessageDisplay v-for="post in posts" v-bind:key='post' v-on:post_like="liker" role="show_post">{{ post }}</MessageDisplay>
    </div>
    </div>
</template>

<script>
import MessageDisplay from "@/components/MessageDisplay.vue";

export default {
    name: 'Homepage',
    components: {
        MessageDisplay
    },
    data() {
       return {
           user: "",
           posts: ["Poste de mireille", "poste de robert", "poste de jean"],
           likes: []
        }
    },
    methods: {
        liker: function (post) {
            this.likes.push(post);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>