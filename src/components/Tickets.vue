<template>
    <div>
    <h1>Tickets</h1>
    <div v-for="ticket in tickets" :key="ticket.ticketId">
      <div class="row">
        <div class="col-sm-4 d-flex justify-content-center">
          <EpicCard :cardType="ticket.ticketType"
                    :cardTitle="ticket.ticketTitle"
                    :cardDescription="ticket.ticketDescription"
                    :cardCreationDate="ticket.ticketCreationDate"/>
        </div>
      </div>
    </div>
    <!-- {{tickets}} -->
    </div>
</template>
<script>
import gql from "graphql-tag";
import EpicCard from "./EpicCard.vue"

export default {
  name: "Tickets",
  components:{
    EpicCard,
  },
  data() {
    return {
      tickets: []
    };
  },
  apollo: {
    tickets: gql`query{
  tickets{
    ticketId
    ticketType
    ticketTitle
    ticketOwner
    ticketCreationDate
    userStories{
    userStoryId
    userStoryTitle
    userStoryAssigned
    userStoryStatus
    userStoryEffort
    }
  }
}`
  }
};

</script>