<template>
    <div class="reply">
        <div class="replyList">

            <div class="replyListCarte" v-for="reply in replis" :key="reply.id">

                <div class="replyListCarteInfo">
                    <div class="replyListCarteInfoUser">
                        <span> {{ reply.nom }} </span>
                        <span class="replyListCarteInfoUserDate"> {{ reply.createdAt.split('T')[0] }} </span>
                    </div>
                    
                    <div class="replyListCarteInfoText">
                        <span> {{ reply.comment }} </span>    
                    </div>
                </div>

                <div class="replyListCarteDelete" v-if="authorised(reply)" @click="replyDelete(reply.id)">
                    <i class="fas fa-trash-alt"></i>
                </div>

            </div>

        </div>

        <div class="replyPost">
            <textarea v-model="comment" name="reply" aria-required="true" placeholder="Ecrivez un commentaire..." @input="replyValid()"></textarea>
            <button type="button" :disabled="!validated" @click="replyPost">
                <i class="fas fa-plus"></i>
            </button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "Reply",
    props: ["revele", "articleId", "toggleReply"],
    mounted: function() {
        this.replyGetAll();
    },
    data() {
        return {
            comment: "",
            replies: [],
            validated: false
        };
    },
    computed: {
        ...mapState({
            user: 'user',
        })
    },
    methods: {
        replyPost: function() {
            this.$store.dispatch('replyPost', {
                comment: this.comment,
                prenom: this.user.prenom,
                UserId: this.user.userId,
                ArticleId: this.articleId
            })
            .then((res) => {
                console.log(res);
                this.replyGetAll();
                this.comment = "";
                this.validated = false;
            }).catch(error => console.error(error))
        },
        replyGetAll: function() {
            this.$store.dispatch('replyGetAll', this.articleId)
            .then((res) => {
                console.log(res)
                this.replies = res.data;
            })
            .catch(error => console.error(error))
        },
        replyDelete: function(id) {
            if(confirm('Voulez-vous supprimer ce commentaire ?')) {
                this.$store.dispatch('replyDelete', id)
                .then((res) => {
                    console.log(res)
                    this.replyGetAll();
                })
                .catch(error => console.error(error))
            }
        },
        replyValid: function() {
            if(this.commentaire.length > 2) {
                this.validated = true;
                return;
            }
            this.validated = false;
        },
        authorised: function(model) {
            if( this.user.userId == model.UserId || this.user.isAdmin ) {
                return true
            }
            return false
        }
    }
};
</script>