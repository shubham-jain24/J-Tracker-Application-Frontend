<template>
<div class="container">
    <div class="mb-3 u--slideRight">
        <div :class="cardStyle">
            <div class="row">
                <div class="col-sm-8 u--slideLeft">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-app-indicator" viewBox="0 0 16 16">
                            <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z"/>
                            <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        </svg>
                    </span>
                    <span>
                        {{cardId}} - {{cardTitle}}
                    </span>
                </div>
                <div class="col-sm-4 u--slideLeft">
                    <span>
                        <button class="btn edit-btn" @click="sendTicketId(cardId)">Edit Ticket</button>
                        <button class="btn story-btn" @click="showUserStory()">{{buttonName}}</button>
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div v-if="showFlag">
        <div v-for="story in userStoryList" :key="story.userStoryId">
            <StoryCard
            :cardTitle="story.userStoryTitle"
            :cardId="story.userStoryId"
            :cardStatus="story.userStoryStatus"
            />
        </div>
        
    </div>
</div>
</template>
<script>
import StoryCard from './StoryCard.vue';
export default{
    name: "EpicCard",
    props:[
        'cardOwner',
        'cardTitle',
        'cardId',
        'cardCreationDate',
        'userStoryList'
    ],
    components:{
        StoryCard
    },
    computed:{
        creationDate(){
            return new Date(this.cardCreationDate);
        }
    },
    data(){
        return{
            buttonName: "Show User Stories",
            showFlag: false,
            cardStyle: "card-header epic-background"
        }
    },
    mounted(){
        this.title = this.cardTitle
    },
    methods:{
        sendTicketId(id){
            this.$emit('edit-ticket', id);
            var pathString = "/edit/ticket/" + id
            this.$router.push(pathString)
        },
        showUserStory(){
            if (this.showFlag == false){
                this.showFlag = true;
                this.buttonName = "Hide User Stories";
            }
            else{
                this.showFlag = false;
                this.buttonName = "Show User Stories";
            }

        }
    }
    
}
</script>
<style scoped>
.edit-btn{
    background-color: #072227;
    color: #B0C4DE;
    margin: 2%;
}
.story-btn{
    background-color: rgb(101, 188, 146);
    color: #072227;
    margin: 2%;
}
.epic-background{
    background-color: #B0C4DE;
    color: #072227;
}
</style>