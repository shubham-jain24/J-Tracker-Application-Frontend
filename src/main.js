import Vue from 'vue'
import App from './App.vue'
import VueApollo from 'vue-apollo'
import VueRouter from 'vue-router'
import {routes} from './routes.js'
import { BootstrapVue } from 'bootstrap-vue'



import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/externalcss/animation-library-min.css'


Vue.use(VueApollo);
Vue.use(VueRouter);
Vue.use(BootstrapVue)

const router = new VueRouter({
  routes,
  mode:'history'
});


Vue.config.productionTip = false;

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:8081/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})



new Vue({
  el: '#app',
  // inject apolloProvider here like vue-router or vuex
  apolloProvider,
  router,
  render: h => h(App),
})
