<template>
    <div>
        Edit Ticket
        <div v-if="ticketById!=null">
            <CreateTicketForm
            :editMode="true"
            :initialData="ticketById"
            @ticket-update-form-data="updateTicket"
            @delete-ticket-request="deleteSelectedTicket"
            />
        </div>
    </div>
</template>
<script>
    import gql from "graphql-tag";
    import CreateTicketForm from '../components/CreateTicketForm.vue';
    export default{
        name: "EditTicket",
        mounted(){
            this.getPathParameters();
        },
        components:{
            CreateTicketForm
        },
        data(){
            return{
                ticketId: '',
                ticket: null,
                ticketById: null,
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
            deleteSelectedTicket(id){
                this.$apollo.mutate({
                mutation: gql`mutation ($ticketId: String!) {
                    deleteTicketById(ticketId:$ticketId){
                            statusCode
                        }
                }`,
                variables: {
                    ticketId: id
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
                this.ticketId = pathList.pop();
                var variables= {
                    id: this.ticketId
                    };
                this.$apollo.queries.ticketById.refetch(variables);
            },
            updateTicket(data){
                this.$apollo.mutate({
                mutation: gql`mutation ($ticketId: String!, $ticketType: String!, $ticketDescription: String!, $ticketOwner: String!, $ticketTitle: String!, $ticketCreationDate: String!,
	                    $ticketTargetCompletionDate: String!, $ticketCompletionDate: String!) {
                    updateTicket(ticketId:$ticketId ticketType: $ticketType ticketDescription: $ticketDescription ticketOwner: $ticketOwner ticketTitle: $ticketTitle ticketCreationDate: $ticketCreationDate
	                    ticketTargetCompletionDate: $ticketTargetCompletionDate ticketCompletionDate: $ticketCompletionDate){
                            statusCode
                        }
                }`,
                variables: {
                    ticketId: data.ticketId,
                    ticketType: data.ticketType,
                    ticketDescription: data.ticketDescription,
                    ticketOwner: data.ticketOwner,
                    ticketTitle: data.ticketTitle,
                    ticketCreationDate: data.ticketCreationDate,
                    ticketTargetCompletionDate: data.ticketTargetCompletionDate,
                    ticketCompletionDate: data.ticketCompletionDate,
                },
                }).then((result) => {
                    console.error(result)
                    this.showSuccess = true;
                    this.showFaliure = false;
                }).catch((error) => {
                // Error
                console.error(error)
                })
            }
        },
        computed:{
            getTicketData(){
                return this.ticketById;
            }
        },
        apollo:{
            ticketById: {
                query: gql`query ($id: String!) {
                ticketById(id: $id){
                    ticketId
                    ticketType
                    ticketTitle
                    ticketDescription
                    ticketOwner
                    ticketCreationDate
                    ticketTargetCompletionDate
                    ticketCompletionDate
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