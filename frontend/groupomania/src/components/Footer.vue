<template>
    <footer class="py-2 footer">
        <div class="container text-left">
            <div class="row ">
                <div class="col-xs-12 col-md-5">
                    <h5 class="footer__title pl-3">A propos</h5>
                    <ul class="footer__item">
                        <li class="footer__list">Fonctionnement du site</li>
                        <li class="footer__list">Conditions générales</li>
                        <li class="footer__list">Données et confidentialité</li>
                    </ul>
                </div>
                <div class="col-xs-12 col-md-5">
                    <h5 class="footer__title pl-3">Assistance</h5>
                    <ul class="footer__item">
                        <li class="footer__list">Centre d'aide</li>
                        <li class="footer__list">Nous contacter</li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
  name: "Footer",
  
};
</script>

<style lang="scss" scoped>
.footer {
    background-color: #D1515A;
    color: white;
    font-size: 12px;
    height: 100px;
    @media (max-width: 768px){
        height: 200px;
        justify-content: center;
    }

    &__title {
        font-size: 15px;
        font-weight: bold;
    }
  }
ul {
  padding-left: 1rem;
  list-style: none;
}

</style>