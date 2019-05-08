<template>
    <div class="col-md-4">
        <div class="card mb-2">
            <div class="card-body">
                <div class="card-title">
                    <h2
                        v-if="!isEdit">{{task.title}}</h2>
                    <div class="form-group"
                        v-else>
                        <input type="text" placeholder="Task" class="form-control"
                        v-model="task.title">
                    </div>
                </div>
                <div class="card-text">
                    <p
                        v-if="!isEdit">
                        {{task.description}}
                    </p>
                    <div class="form-group"
                        v-else>
                        <textarea type="text" placeholder="Description" class="form-control"
                        v-model="task.description"></textarea>
                    </div>
                    <div class="d-flex justify-content-between">
                        <button type="button" class="btn btn-info"
                            @click="onClickEdit"
                            v-if="!isEdit">Update</button>
                        <button type="button" class="btn btn-info"
                            @click="onClickUpdate"
                            v-else>Save</button>
                        <button type="button" class="btn btn-danger "
                            @click="onClickDelete">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['task'],
        data(){
            return {
                isEdit: false,
                mine: true
            }
        },
        mounted() {

        },
        methods:{
            onClickDelete(){
                this.$emit('delete')
            },
            onClickEdit(){
                this.isEdit = true
            },
            onClickUpdate(){
                this.$emit('update', this.task)
                this.isEdit = false
            }
        }
    }
</script>
