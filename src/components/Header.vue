<template>
    <nav class="navbar navbar-light bg-light fixed-top">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">JTicket Tracker</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">JTicket</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                    <a :class="home" aria-current="page" href="/Dashboard">Dashboard</a>
                </li>
                
                <li class="nav-item">
                    <a :class="createTicket" href="/CreateTicket" >Create Ticket</a>
                </li>
                <li class="nav-item">
                    <a :class="createUserStory" href="/Create/UserStory" >Create User Story</a>
                </li>
                </ul>
            </div>
            </div>
        </div>
        </nav>
</template>
<script>
export default{
    name: "Header",
    mounted(){
        this.updateNameLinks()
    },
    data(){
        return{
            home: "nav-link active",
            createTicket: "nav-link",
            createUserStory: "nav-link",
            dashBoard: "nav-link",
        }
    },
    methods:{
        updateNameLinks(){
            var currentPath = window.location.pathname
            if (currentPath == '/CreateTicket'){
                this.home = "nav-link";
                this.createTicket = "nav-link active";
                this.createUserStory="nav-link";
                this.dashBoard="nav-link"
            }
            else if (currentPath == '/Create/UserStory'){
                this.home = "nav-link";
                this.createTicket = "nav-link";
                this.createUserStory="nav-link active";
                this.dashBoard="nav-link"
            }
            else if(currentPath == "/Dashboard"){
                this.home = "nav-link";
                this.createTicket = "nav-link";
                this.createUserStory="nav-link";
                this.dashBoard="nav-link active"
            }
            else{
                this.home = "nav-link active";
                this.createTicket = "nav-link";
                this.createUserStory="nav-link";
            }

        }
    }
}
</script>
<style>
</style>