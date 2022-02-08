<template>
<div>
    <PageHeading headingName="Create User Story"/>
    <CreateUserStoryForm
    submitButtonName="Create"
    :editMode="false"
    @user-story-form-data="saveUserStory"/>
</div>
</template>
<script>
import CreateUserStoryForm from '../components/CreateUserStoryForm.vue';
import PageHeading from '../components/PageHeading.vue';
import gql from "graphql-tag";

export default{
    name: "CreateUserStory",
    components:{
        CreateUserStoryForm,
        PageHeading
    },
    data(){
        return{
            showSuccess: false,
        }
    },
    methods:{
        saveUserStory(data){
             this.$apollo.mutate({
                mutation: gql`mutation ($epicId: String!
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
                        addUserStory(
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
    }
}
</script>
<style scoped>
</style>