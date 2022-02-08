<template>
<div>
    <div class="alert alert-danger" role="alert">
    {{message}}
    </div>
</div>
</template>
<script>
export default{
    name: 'ErrorMessage',
    props:[
        'message'
    ]
}
</script>