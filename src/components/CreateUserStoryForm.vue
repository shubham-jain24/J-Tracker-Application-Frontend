<template>
<div>
    <div class="container u--slideLeft">
            <div v-if="showErrorMessaage">
                <ErrorMessage :message="errorMessage"/>
            </div>
            <div v-if="showSuccessMessage">
                <SuccessMessage :message="successMessage"/>
            </div>
            <!-- v-if="tickets.length>0" -->
            <form class="form-text-style u--slideRight ticket-form-style" >
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-4">
                        <div>
                            <label for="inputEmail4" class="form-label">
                            Ticket Name 
                            </label><span class="required-style">*</span>
                            <!-- <b-form-input class="form-select" list="my-list-id" v-model="epicId"></b-form-input>
                            <datalist id="my-list-id">
                                <option class="form-select" v-for="ticket in tickets" :key="ticket.ticketId" :value="ticket.ticketId">{{ticket.ticketId + " - " + ticket.ticketTitle}}</option>
                            </datalist> -->
                            <select  class="form-select selectpicker" v-model="epicId" aria-label="Default select example">
                                <option v-for="ticket in tickets" :key="ticket.ticketId" :value="ticket.ticketId">{{ticket.ticketId + " - " + ticket.ticketTitle}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div>
                            <label for="inputEmail4" class="form-label">User Story Owner</label><span class="required-style">*</span>
                            <input type="text" class="form-control" v-model="userStoryOwner">
                        </div>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-8">
                        <div>
                            <label for="inputEmail4" class="form-label">User Story Title</label><span class="required-style">*</span>
                            <textarea class="form-control" v-model="userStoryTitle"></textarea>
                        </div>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-8">
                        <div>
                            <label for="inputEmail4" class="form-label">User Story Description</label>
                            <textarea class="form-control" v-model="userStoryDescription"></textarea>
                        </div>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-8">
                        <div>
                            <label for="inputEmail4" class="form-label">User Story Acceptance Criteria</label>
                            <textarea class="form-control" v-model="userStoryAcceptanceCriteria"></textarea>
                        </div>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-4">
                        <div>
                            <label for="inputEmail4" class="form-label">User Story Assigned To</label><span class="required-style">*</span>
                            <input type="text" class="form-control" v-model="userStoryAssigned">
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div>
                            <label for="inputEmail4" class="form-label">User Story Status</label><span class="required-style">*</span>
                            <select  class="form-select" v-model="userStoryStatus" aria-label="Default select example">
                                <option v-for="status in storyStateList" :key="status" :value="status">{{status}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-2"></div>
                </div>

                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-4">
                        <div>
                            <label for="inputEmail4" class="form-label">User Story Effort</label>
                            <input type="number" class="form-control" v-model="userStoryEffort">
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div>
                            <label for="inputEmail4" class="form-label">User Story Remaining Effort</label>
                            <input type="number" class="form-control" v-model="userStoryRemainingEffort">
                        </div>
                    </div>
                    <div class="col-sm-2"></div>
                </div>

                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-4">
                        <div>
                            <label for="inputEmail4" class="form-label">User Story Completed Effort</label>
                            <input type="number" class="form-control" v-model="userStoryCompletedEffort">
                        </div>
                    </div>
                    <div class="col-sm-4">
                         <div>
                            <label for="inputEmail4" class="form-label">User Story Start Date</label>
                            <datepicker v-model="userStoryStartDate"  :bootstrap-styling="true"></datepicker>
                        </div>
                    </div>
                    <div class="col-sm-2"></div>
                </div>

                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-4">
                        <div>
                            <label for="inputEmail4" class="form-label">User Story Expected Completion Day</label>
                            <datepicker v-model="userStoryExpectedCompletionDate"  :bootstrap-styling="true"></datepicker>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div>
                            <label for="inputEmail4" class="form-label">User Story Completion Date</label>
                            <datepicker v-model="userStoryCompletionDate"  :bootstrap-styling="true"></datepicker>
                        </div>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
            </form>

            <div class="row" v-if="!editMode">
                
                <div class="u--slideRight">
                            <button  class="btn form-control create-ticket-style" @click="sendFormData()">{{submitButtonName}}</button>
                </div>
            </div>
            <div class="row" v-if="editMode">
                <div class="col-sm-2"></div>
                <div class="col-sm-4 u--slideRight">
                            <button  class="btn form-control btn-primary other-button-style" @click="sendUpdateData()">Update</button>
                </div>
                <div class="col-sm-4 u--slideRight">
                            <button  class="btn form-control btn-danger other-button-style" @click="sendDeleteRequest()">Delete</button>
                </div>
                <div class="col-sm-2"></div>
            </div>
            <div  v-if="editMode">
                    <div class="row">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-8">
                            <CreateCommentForm
                            @add-comment-data="createNewComment"
                            />
                        </div>
                        <div class="col-sm-2"></div>
                    </div>
                <div v-for="comment in storyComments" :key="comment.sourceId">
                    <div class="row">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-8">
                            <CommentForm
                            :commentDescription="comment.commentDescription"
                            :commentCreationDate="comment.commentCreationDate"
                            />
                        </div>
                        <div class="col-sm-2"></div>
                    </div>
                </div>
            </div>
    </div>
</div>
</template>
<script>
import Datepicker from 'vuejs-datepicker';
import ErrorMessage from './ErrorMessage.vue';
import SuccessMessage from './SuccessMessage.vue';
import CommentForm from './CommentForm.vue';
import CreateCommentForm from './CreateCommentForm.vue';
import gql from "graphql-tag";
export default{
    name: "CreateUserStoryForm",
    props:[
        'submitButtonName',
        'editMode',
        'initialData'
    ],
    mounted(){
        this.loadInitialvalue();
    },
    components:{
        Datepicker,
        ErrorMessage,
        SuccessMessage,
        CommentForm,
        CreateCommentForm
    },
    data(){
        return{
            epicId: '',
            userStoryTitle: '',
            userStoryDescription: '',
            userStoryOwner: '',
            userStoryAssigned: '',
            userStoryAcceptanceCriteria: '',
            userStoryStatus: '',
            userStoryStartDate: '',
            userStoryCompletionDate: '',
            userStoryExpectedCompletionDate: '',
            userStoryEffort: 0,
            userStoryCompletedEffort: 0,
            userStoryRemainingEffort: 0,
            storyComments: [],
            storyId: '',
            tickets: [],
            storyStateList: ['Backlog', 'Ready', 'In Progress', 'Validate', 'Blocked', 'Done'],
            showErrorMessaage: false,
            errorMessage: "Error",
            successMessage: "Successfull",
            showSuccessMessage: false,
            deleteFlag: false,
        }
    },
    apollo: {
    tickets: gql`query{
    tickets{
        ticketId
        ticketTitle
    },
    }`
    },
    methods:{
        sendDeleteRequest(){
            if(confirm('Deleting A ticket means you will be delleting all the user story associated to it.')){
                this.deleteUserStory(this.storyId);
            }
        },
        deleteUserStory(id){
            this.$emit('delete-user-story-request', id);
        },
        loadInitialvalue(){
            if (this.initialData != undefined){
                this.storyId = this.initialData.userStoryId;
                this.epicId = this.initialData.epicId;
                this.userStoryTitle = this.initialData.userStoryTitle;
                this.userStoryDescription = this.initialData.userStoryDescription;
                this.userStoryOwner = this.initialData.userStoryOwner;
                this.userStoryAssigned = this.initialData.userStoryAssigned;
                this.userStoryAcceptanceCriteria = this.initialData.userStoryAcceptanceCriteria;
                this.userStoryStatus = this.initialData.userStoryStatus;
                this.userStoryStartDate = this.initialData.userStoryStartDate;
                this.userStoryCompletionDate = this.initialData.userStoryCompletionDate;
                this.userStoryExpectedCompletionDate = this.initialData.userStoryExpectedCompletionDate;
                this.userStoryEffort = this.initialData.userStoryEffort;
                this.userStoryCompletedEffort = this.initialData.userStoryCompletedEffort;
                this.userStoryRemainingEffort = this.initialData.userStoryRemainingEffort;
                this.storyComments = this.initialData.Comments;
            }

        },
        createNewComment(description){
            this.$apollo.mutate({
                mutation: gql`mutation ($sourceId: String!, $commentDescription: String!, $commentCreationDate: String!, $commentEditDate: String!) {
                    addComment(sourceId: $sourceId commentDescription: $commentDescription commentCreationDate: $commentCreationDate commentEditDate: $commentEditDate)
                }`,
                variables: {
                    sourceId: this.storyId,
                    commentDescription: description,
                    commentCreationDate: new Date(),
                    commentEditDate: new Date(),
                },
                }).then((result) => {
                    console.log(result)
                    this.showSuccess = true;
                    this.showFaliure = false;
                }).catch((error) => {
                // Error
                console.error(error)
                })
            this.$router.go();
        },
        sendFormData(){
            if (this.epicId != '' && this.userStoryTitle!='' && this.userStoryOwner!='' && this.userStoryAssigned!='' && this.userStoryStatus!=''){
                var formData = {}
                this.showErrorMessaage = false;
                formData['epicId'] = this.epicId;
                formData['userStoryTitle'] = this.userStoryTitle;
                formData['userStoryDescription'] = this.userStoryDescription;
                formData['userStoryOwner'] = this.userStoryOwner;
                formData['userStoryAssigned'] = this.userStoryAssigned;
                formData['userStoryAcceptanceCriteria'] = this.userStoryAcceptanceCriteria;
                formData['userStoryStatus'] = this.userStoryStatus;
                formData['userStoryStartDate'] = this.userStoryStartDate;
                formData['userStoryCompletionDate'] = this.userStoryCompletionDate;
                formData['userStoryAssigned'] = this.userStoryAssigned;
                formData['userStoryExpectedCompletionDate'] = this.userStoryExpectedCompletionDate;
                formData['userStoryEffort'] = this.userStoryEffort;
                formData['userStoryCompletedEffort'] = this.userStoryCompletedEffort;
                formData['userStoryRemainingEffort'] = this.userStoryRemainingEffort;



                this.$emit('user-story-form-data', formData);
                this.successMessage = "User Story Created Successfully!!";
                this.showSuccessMessage = true;
            }
            else{
                this.errorMessage = "Please Enter All The Required Details";
                this.showErrorMessaage = true;
            }
            this.clearFormData();
        },
        sendUpdateData(){
            if(this.ticketType != '' && this.ticketTitle != '' && this.ticketOwner != '' && this.ticketCreationDate != '')
            {
                this.showErrorMessaage = false;
                var formData = {}
                formData['userStoryId'] = this.storyId;
                formData['epicId'] = this.epicId;
                formData['userStoryTitle'] = this.userStoryTitle;
                formData['userStoryDescription'] = this.userStoryDescription;
                formData['userStoryOwner'] = this.userStoryOwner;
                formData['userStoryAssigned'] = this.userStoryAssigned;
                formData['userStoryAcceptanceCriteria'] = this.userStoryAcceptanceCriteria;
                formData['userStoryStatus'] = this.userStoryStatus;
                formData['userStoryStartDate'] = this.userStoryStartDate;
                formData['userStoryCompletionDate'] = this.userStoryCompletionDate;
                formData['userStoryAssigned'] = this.userStoryAssigned;
                formData['userStoryExpectedCompletionDate'] = this.userStoryExpectedCompletionDate;
                formData['userStoryEffort'] = this.userStoryEffort;
                formData['userStoryCompletedEffort'] = this.userStoryCompletedEffort;
                formData['userStoryRemainingEffort'] = this.userStoryRemainingEffort;


                this.$emit('user-story-update-form-data', formData);
                this.successMessage = "User Story Updated Successfully!!";
                this.showSuccessMessage = true;
            }
            else{
                this.errorMessage = "Please Enter All The Required Details";
                this.showErrorMessaage = true;
            }
        },
        clearFormData(){
            this.epicId = '';
            this.userStoryTitle = '';
            this.userStoryDescription = '';
            this.userStoryOwner = '';
            this.userStoryAssigned = '';
            this.userStoryAcceptanceCriteria = '';
            this.userStoryStatus = '';
            this.userStoryStartDate = '';
            this.userStoryCompletionDate = '';
            this.userStoryExpectedCompletionDate = '';
            this.userStoryEffort = 0;
            this.userStoryCompletedEffort = 0;
            this.userStoryRemainingEffort = 0;
        }
    }
}
</script>
<style scoped>
.form-text-style{
    text-align: left;
    padding: 1%;
}
label{
    margin-top: 2%
}
.ticket-form-style{
    background-color: #B0C4DE;
    padding: 2%;
}
.create-ticket-style{
    margin-top: 4%;
    margin-bottom: 4%;
    background-color: #072227;
    color: #B0C4DE;
}
.other-button-style{
    margin-top: 4%;
    margin-bottom: 4%;
}
.required-style{
    color: red;
    margin-left: 2%;
}

</style>