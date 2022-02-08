<template>
<div>
    <PageHeading headingName="Create Ticket"/>
    <CreateTicketForm 
    submitButtonName="Create"
    :editMode="false"
    @ticket-form-data="saveTicket"/>
</div>
</template>
<script>
import CreateTicketForm from '../components/CreateTicketForm.vue';
import PageHeading from '../components/PageHeading.vue';
import gql from "graphql-tag";
export default{
    name: 'CreateTicket',
    components:{
        CreateTicketForm,
        PageHeading
    },
    data(){
        return{
            showSuccess: false,
            showFaliure: false,
        }
    },
    methods:{
        saveTicket(data){
            console.log(data);
            this.$apollo.mutate({
                mutation: gql`mutation ($ticketType: String!, $ticketDescription: String!, $ticketOwner: String!, $ticketTitle: String!, $ticketCreationDate: String!,
	                    $ticketTargetCompletionDate: String!, $ticketCompletionDate: String!) {
                    addTicket(ticketType: $ticketType ticketDescription: $ticketDescription ticketOwner: $ticketOwner ticketTitle: $ticketTitle ticketCreationDate: $ticketCreationDate
	                    ticketTargetCompletionDate: $ticketTargetCompletionDate ticketCompletionDate: $ticketCompletionDate){
                            statusCode
                        }
                }`,
                variables: {
                    ticketType: data.ticketType,
                    ticketDescription: data.ticketDescription,
                    ticketOwner: data.ticketOwner,
                    ticketTitle: data.ticketTitle,
                    ticketCreationDate: data.ticketCreationDate,
                    ticketTargetCompletionDate: data.ticketTargetCompletionDate,
                    ticketCompletionDate: data.ticketCompletionDate,
                },
                }).then((result) => {
                    this.showSuccess = true;
                    this.showFaliure = false;
                // Result
                console.log(result)
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