<template>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container navbar__container p-4">
        <router-link to="/homepage" class="navbar-brand"><img src="../assets/white-logo.png" alt="logo groupomania" height="60" width="220" class="logo" /></router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li class="nav-item"><router-link class="active nav-link" to="/profil">Profil</router-link></li>
            <li class="nav-item"><router-link class="active nav-link" to="/homepage">Fil d'actualité</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
</template>


<script>
export default {
  name: "Header",
  methods: {
    emitLogoutEvent() {
      this.$emit("logout-click");
    },
  },
};
</script>

<style lang="scss" scoped>

.navbar {
  flex-wrap: nowrap;
  background-color: #D31D2A;

  &-collapse{
    justify-content: end;
  }

  &-nav {
    align-items: flex-end;
    color: white;
  }

  &-light {
    color: white;
  }
}

.nav-link.active {
  color: white;
}

.nav-link {
  font-size: 15px;
  font-weight: bold;
  color: white;

  &:hover {
    color: #D31D2A;
  }

}

.logo {
  @media (max-width: 375px) {
    width: 120px;
    height: 35px;
  }
}

</style>
