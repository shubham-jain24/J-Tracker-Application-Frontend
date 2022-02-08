<template>
    <div class="container">
     <PageHeading headingName="Dashboard"/>
    <div v-for="ticket in tickets" :key="ticket.ticketId">
      <div class="row">
          <EpicCard :cardId="ticket.ticketId"
                    :cardTitle="ticket.ticketTitle"
                    :userStoryList="ticket.userStories"
                    @edit-ticket="editTicket"/>
      </div>
    </div>
    <!-- {{tickets}} -->
    </div>
</template>
<script>
import gql from "graphql-tag";
import EpicCard from "../components/EpicCard.vue";
import PageHeading from '../components/PageHeading.vue';
export default{
    name: "Dashboard",
    components: {
        EpicCard,
        PageHeading
    },
    data() {
    return {
      tickets: []
    };
  },
  methods:{
      editTicket(id){
          console.log(id)
      }
  },
  apollo: {
    tickets: gql`query{
  tickets{
    ticketId
    ticketType
    ticketTitle
    userStories{
    userStoryId
    userStoryTitle
    userStoryStatus
    }
  }
}`
  },
};
</script>