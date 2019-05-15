<template>
    <div class="container p-4">
        <div class="row">
            <task-component
                v-for="(task, index) in tasks"
                :key="task._id"
                :task="task"
                @delete="onPressDelete(index, task)"
                @update="onPressUpdate(index, ...arguments)">
            </task-component>
            <div class="col-md-4">
                <form-component
                    v-if="isAdd"
                    @add="onSubmitAdd(...arguments)"
                    @cancel="onPressCancel">
                </form-component>
                <button @click="isAdd=true" class="btn btn-primary"
                    v-else>
                    New task
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import TaskComponent from './components/TaskComponent.vue'
    import FormComponent from './components/FormComponent.vue'

    const baseUrl = './api/tasks/'

    import { mapGetters, mapActions } from 'vuex'

    export default {
        components: {
            TaskComponent,
            FormComponent
        },
        data() {
            return {
                isAdd: false,
                isEdit: false
            }
        },
        created() {
            this.fetchTasks()
        },
        computed: mapGetters(['tasks']),
        methods: {
            ...mapActions(['fetchTasks', 'addTask', 'deleteTask', 'updateTask']),
            onSubmitAdd(newTask){
                this.addTask(newTask)
                this.isAdd = false
            },
            onPressDelete(index, taskToDelete){
                if(confirm('Are u sure?')){
                    this.deleteTask(taskToDelete, index)
                }
            },
            onPressUpdate(index, taskToUpdate){
                this.updateTask(taskToUpdate, index)
            },
            onPressCancel(){
                this.isAdd = false
            },
        }
    }
</script>
