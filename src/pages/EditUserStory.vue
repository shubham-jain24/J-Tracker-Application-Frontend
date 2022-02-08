<template>
    <div>
        Edit User Story
        <div v-if="userStoryByID!=null">
            <CreateUserStoryForm
            :editMode="true"
            :initialData="userStoryByID"
            @user-story-update-form-data="updateUserStory"
            @delete-user-story-request="deleteSelectedStory"
            />
        </div>
    </div>
</template>
<script>
    import gql from "graphql-tag";
    import CreateUserStoryForm from '../components/CreateUserStoryForm.vue';
    export default{
        name: "EditUserStory",
        mounted(){
            this.getPathParameters();
        },
        components:{
            CreateUserStoryForm
        },
        data(){
            return{
                storyId: '',
                ticket: null,
                userStoryByID: null,
                ticketType: '',
                ticketTitle: '',
                ticketDescription: '',
                ticketOwner: '',
                ticketCreationDate: '',
                ticketTargetCompletionDate: '',
                ticketCompletionDate: '',
                ticketTypeList: ['Epic', 'Bug']
                
            }
        },
        methods:{
            deleteSelectedStory(id){
                this.$apollo.mutate({
                mutation: gql`mutation ($userStoryId: String!) {
                    deleteUserStory(userStoryId:$userStoryId){
                            statusCode
                        }
                }`,
                variables: {
                    userStoryId: id
                },
                }).then((result) => {
                    console.log(result)
                this.$router.push('/Dashboard');
                }).catch((error) => {
                // Error
                console.error(error)
                })
            },
            getPathParameters(){
                var pathName = window.location.pathname;
                var pathList = pathName.split('/');
                this.storyId = pathList.pop();
                var variables= {
                    id: this.storyId
                    };
                this.$apollo.queries.userStoryByID.refetch(variables);
            },
            updateUserStory(data){
                this.$apollo.mutate({
                mutation: gql`mutation ($userStoryId: String!
                        $epicId: String!
                        $userStoryTitle: String!
                        $userStoryDescription: String!
                        $userStoryAcceptanceCriteria: String!
                        $userStoryOwner: String!
                        $userStoryAssigned: String!
                        $userStoryStatus: String!
                        $userStoryEffort: Int!
                        $userStoryStartDate:String!
                        $userStoryCompletionDate: String!
                        $userStoryExpectedCompletionDate: String!
                        $userStoryCompletedEffort: Int
                        $userStoryRemainingEffort: Int){
                        updateUserStory(
                        userStoryId: $userStoryId
                        epicId: $epicId
                        userStoryTitle: $userStoryTitle
                        userStoryDescription: $userStoryDescription
                        userStoryAcceptanceCriteria: $userStoryAcceptanceCriteria
                        userStoryOwner: $userStoryOwner
                        userStoryAssigned: $userStoryAssigned
                        userStoryStatus: $userStoryStatus
                        userStoryEffort: $userStoryEffort
                        userStoryStartDate: $userStoryStartDate
                        userStoryCompletionDate: $userStoryCompletionDate
                        userStoryExpectedCompletionDate: $userStoryExpectedCompletionDate
                        userStoryCompletedEffort: $userStoryCompletedEffort
                        userStoryRemainingEffort: $userStoryRemainingEffort){
                            statusCode
                        }
                                    }`,
                variables: {
                    userStoryId: data.userStoryId,
                    epicId: data.epicId,
                    userStoryTitle: data.userStoryTitle,
                    userStoryDescription: data.userStoryDescription,
                    userStoryAcceptanceCriteria: data.userStoryAcceptanceCriteria,
                    userStoryOwner: data.userStoryOwner,
                    userStoryAssigned: data.userStoryAssigned,
                    userStoryStatus: data.userStoryStatus,
                    userStoryStartDate: data.userStoryStartDate,
                    userStoryCompletionDate: data.userStoryCompletionDate,
                    userStoryExpectedCompletionDate: data.userStoryExpectedCompletionDate,
                    userStoryEffort: data.userStoryEffort,
                    userStoryCompletedEffort: data.userStoryCompletedEffort,
                    userStoryRemainingEffort: data.userStoryRemainingEffort,
                },
                }).then((result) => {
                    console.log(result)
                    this.showSuccess = true;
                    this.showFaliure = false;
                }).catch((error) => {
                // Error
                console.error(error)
                })
            }
        },
        computed:{
        },
        apollo:{
            userStoryByID: {
                query: gql`query ($id: String!) {
                userStoryByID(id: $id){
                    userStoryId
                    epicId
                    userStoryTitle
                    userStoryDescription
                    userStoryAcceptanceCriteria
                    userStoryOwner
                    userStoryAssigned
                    userStoryStatus
                    userStoryStartDate
                    userStoryCompletionDate
                    userStoryExpectedCompletionDate
                    userStoryEffort
                    userStoryCompletedEffort
                    userStoryRemainingEffort
                    Comments{
                        sourceId
                        commentDescription
                        commentCreationDate
                        commentEditDate
                    }
                }
                }`,
                variables: {
                id: ''
                },
            },
        }
    }
</script>