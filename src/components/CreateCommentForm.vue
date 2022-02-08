<template>
    <div>
        <div class="card border-dark card-style">
        <div class="card-header">Add New Comment</div>
        <div class="card-body">
            <div class="u--slideRight">
                <textarea class="form-control" v-model="commentDescription"></textarea>
            </div>
            <div class="u--slideRight card-style">
                <button  class="btn form-control btn-primary other-button-style" @click="sendCommentData()">Save</button>
            </div>

        </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: "CreateCommentForm",
        data(){
            return{
                commentDescription: '',
            }
        },
        methods:{
            sendCommentData(){
                this.$emit('add-comment-data', this.commentDescription);
                this.commentDescription = '';
            }
        }
    }
</script>
<style scoped>
.card-style{
    margin: 2%;
    padding: 2%;
}
.foot-style{
    color: grey;
}
</style>