<template>
<div class="container u--zoomIn">
    <div class="row heading-style">
        <h1>
            {{headingName}}
        </h1>
    </div>
</div>
</template> 
<script>
export default{
    name: "PageHeading",
    props:[
        'headingName'
    ]
}
</script>
<style scoped>
.heading-style{
    background-color:#072227;
    color: #B0C4DE;
    padding: 2%;
    margin-top: 4%;
    margin-bottom: 4%;
}
</style>