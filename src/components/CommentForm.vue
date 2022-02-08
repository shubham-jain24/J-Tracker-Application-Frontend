<template>
    <div>
        <div class="card border-dark card-style">
        <div class="card-body">
            <h5 class="card-title">{{commentDescription}}</h5>
            <hr>
            <div class="foot-style">
                <p>Creation date: {{new Date(commentCreationDate)}}</p>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: "CommentForm",
        props:[
            'CreateMode',
            'EditMode',
            'commentDescription',
            'commentCreationDate'
        ]
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