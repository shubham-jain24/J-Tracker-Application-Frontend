
import CreateTicket from './pages/CreateTicket.vue';
import Dashboard from './pages/Dashboard.vue';
import CreateUserStory from './pages/CreateUserStory.vue';
import EditTicket from './pages/EditTicket.vue';
import EditUserStory from './pages/EditUserStory.vue';

export const routes = [
    {path: '/CreateTicket', component: CreateTicket},
    {path: '/Dashboard', component: Dashboard},
    {path: '/Create/UserStory', component: CreateUserStory},
    { path: '/edit/ticket/:id', component: EditTicket },
    {path: '/edit/story/:id', component: EditUserStory}

];