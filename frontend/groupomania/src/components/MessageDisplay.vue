<template>
    <div class="col-10">
        <p class="jumbotron card"> {{ name }}
          <button v-on:click="liker_post(name)" v-if="role == 'show_post'">Liker ce post</button>
        </p>
    </div>
</template>

<script>
export default {
    name: 'MessageDisplay',
    props: ['name', 'role'],
    methods: {
        liker_post: function (post) {
            this.$emit('post_like', post)
        }
    }
}
</script>

<style lang="scss" scoped>
.card{
  position: relative;
  z-index: 1;
  max-width: 650px;
  margin: 0 auto 100px;
  padding: 25px;
  border-radius: 12px;
  background-color:#f2f2f2;
  opacity: 0.85;
}
</style>