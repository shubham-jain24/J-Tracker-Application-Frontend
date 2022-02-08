<template>
<div>
    <div class="container u--slideLeft">
            <div v-if="showErrorMessaage">
                <ErrorMessage :message="errorMessage"/>
            </div>
            <div v-if="showSuccessMessage">
                <SuccessMessage :message="successMessage"/>
            </div>
            <form class="form-text-style u--slideRight ticket-form-style">
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-4">
                        <div>
                            <label for="inputEmail4" class="form-label">Ticket Type</label><span class="required-style">*</span>
                            <select  class="form-select" v-model="ticketType" aria-label="Default select example">
                                <option v-for="type in ticketTypeList" :key="type" :value="type">{{type}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div>
                            <label for="inputEmail4" class="form-label">Ticket Owner</label><span class="required-style">*</span>
                            <input type="text" class="form-control" v-model="ticketOwner">
                        </div>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-8">
                        <div>
                            <label for="inputEmail4" class="form-label">Ticket Title</label><span class="required-style">*</span>
                            <textarea class="form-control" v-model="ticketTitle"></textarea>
                        </div>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-8">
                        <div>
                            <label for="inputEmail4" class="form-label">Ticket Description</label>
                            <textarea class="form-control" v-model="ticketDescription"></textarea>
                        </div>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-4">
                        <div>
                            <label for="inputEmail4" class="form-label">Ticket Creation date</label><span class="required-style">*</span>
                            <datepicker v-model="ticketCreationDate"  :bootstrap-styling="true"></datepicker>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div>
                            <label for="inputEmail4" class="form-label">Ticket Target Completion Date</label>
                            <datepicker v-model="ticketTargetCompletionDate"  :bootstrap-styling="true"></datepicker>
                        </div>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
                <div class="row">
                    <div class="col-sm-4"></div>
                    <div class="col-sm-4">
                        <div>
                            <label for="inputEmail4" class="form-label">Ticket Completion Date</label>
                            <datepicker v-model="ticketCompletionDate"  :bootstrap-styling="true"></datepicker>
                        </div>
                    </div>
                    <div class="col-sm-4"></div>
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
                <div v-for="comment in ticketComments" :key="comment.sourceId">
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
    name: "CreateTicketForm",
    mounted(){
        this.loadInitialvalue();
    },
    props:[
        'submitButtonName',
        'editMode',
        'initialData'
    ],
    components:{
        Datepicker,
        ErrorMessage,
        SuccessMessage,
        CommentForm,
        CreateCommentForm
    },
    data(){
        return{
            ticketId: '',
            ticketType: '',
            ticketTitle: '',
            ticketDescription: '',
            ticketOwner: '',
            ticketCreationDate: '',
            ticketTargetCompletionDate: '',
            ticketCompletionDate: '',
            ticketComments: [],
            ticketTypeList: ['Epic', 'Bug'],
            showErrorMessaage: false,
            errorMessage: "Error",
            successMessage: "Successfull",
            showSuccessMessage: false,
            deleteFlag: false,
        }
    },
    methods:{
        sendDeleteRequest(){
            if(confirm('Deleting A ticket means you will be delleting all the user story associated to it.')){
                this.deleteTicket(this.ticketId);
            }
        },
        createNewComment(description){
            this.$apollo.mutate({
                mutation: gql`mutation ($sourceId: String!, $commentDescription: String!, $commentCreationDate: String!, $commentEditDate: String!) {
                    addComment(sourceId: $sourceId commentDescription: $commentDescription commentCreationDate: $commentCreationDate commentEditDate: $commentEditDate)
                }`,
                variables: {
                    sourceId: this.ticketId,
                    commentDescription: description,
                    commentCreationDate: new Date(),
                    commentEditDate: new Date(),
                },
                }).then((result) => {
                    console.log(result)
                    this.showSuccess = true;
                    this.showFaliure = false;
                }).catch((error) => {
                console.error(error)
                })
            this.$router.go();
        },
        loadInitialvalue(){
            if (this.initialData != undefined){
                this.ticketId = this.initialData.ticketId;
                this.ticketType = this.initialData.ticketType;
                this.ticketTitle = this.initialData.ticketTitle;
                this.ticketDescription = this.initialData.ticketDescription;
                this.ticketOwner = this.initialData.ticketOwner;
                this.ticketCreationDate = this.initialData.ticketCreationDate;
                this.ticketTargetCompletionDate = this.initialData.ticketTargetCompletionDate;
                this.ticketCompletionDate = this.initialData.ticketCompletionDate;
                this.ticketComments = this.initialData.Comments;
            }

        },
        sendFormData(){
            if(this.ticketType != '' && this.ticketTitle != '' && this.ticketOwner != '' && this.ticketCreationDate != '')
            {
                this.showErrorMessaage = false;
                var formData = {}
                formData['ticketType'] = this.ticketType;
                formData['ticketTitle'] = this.ticketTitle;
                formData['ticketDescription'] = this.ticketDescription;
                formData['ticketOwner'] = this.ticketOwner;
                formData['ticketCreationDate'] = this.ticketCreationDate;
                formData['ticketTargetCompletionDate'] = this.ticketTargetCompletionDate;
                formData['ticketCompletionDate'] = this.ticketCompletionDate;

                this.$emit('ticket-form-data', formData);
                this.successMessage = "Ticket Raised Successfully!!";
                this.showSuccessMessage = true;
                this.clearFormData();
            }
            else{
                this.errorMessage = "Please Enter All The Required Details";
                this.showErrorMessaage = true;
            }
        },
        sendUpdateData(){
            if(this.ticketType != '' && this.ticketTitle != '' && this.ticketOwner != '' && this.ticketCreationDate != '')
            {
                this.showErrorMessaage = false;
                var formData = {}
                formData['ticketId'] = this.ticketId;
                formData['ticketType'] = this.ticketType;
                formData['ticketTitle'] = this.ticketTitle;
                formData['ticketDescription'] = this.ticketDescription;
                formData['ticketOwner'] = this.ticketOwner;
                formData['ticketCreationDate'] = this.ticketCreationDate;
                formData['ticketTargetCompletionDate'] = this.ticketTargetCompletionDate;
                formData['ticketCompletionDate'] = this.ticketCompletionDate;

                this.$emit('ticket-update-form-data', formData);
                this.successMessage = "Ticket Updated Successfully!!";
                this.showSuccessMessage = true;
            }
            else{
                this.errorMessage = "Please Enter All The Required Details";
                this.showErrorMessaage = true;
            }
        },
        deleteTicket(id){
            this.$emit('delete-ticket-request', id);
        },
        clearFormData(){
            this.ticketType = '',
            this.ticketTitle = '',
            this.ticketDescription = '',
            this.ticketOwner = '',
            this.ticketCreationDate = '',
            this.ticketTargetCompletionDate = '',
            this.ticketCompletionDate = ''
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
.required-style{
    color: red;
    margin-left: 2%;
}
.other-button-style{
    margin-top: 4%;
    margin-bottom: 4%;
}
</style>