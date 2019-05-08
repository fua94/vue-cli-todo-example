<template>
    <div class="container p-4">
        <div class="row">
            <task-component
                v-for="(task, index) in tasks"
                :key="task._id"
                :task="task"
                @delete="deleteTask(index, task)"
                @update="updateTask(index, ...arguments)">
            </task-component>
            <div class="col-md-4">
                <form-component
                    v-if="isAdd"
                    @add="addTask(...arguments)">
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

    export default {
        components: {
            TaskComponent,
            FormComponent
        },
        data() {
            return {
                tasks: [],
                isAdd: false,
                isEdit: false
            }
        },
        created() {
            this.getTasks()
        },
        methods: {
            async getTasks(){
                await this.axios.get(baseUrl).then(res => {
					this.tasks = res.data
				}).catch(error => {
					console.log(error)
				})
            },
            async addTask(newTask){
                await this.axios.post(baseUrl, newTask).then(res => {
					this.tasks.push(newTask)
                    this.isAdd = false
				}).catch(error => {
					console.log(error)
				})
            },
            async deleteTask(index, deletedTask){
                if(confirm('Are u sure?')){
                    await this.axios.delete(baseUrl + deletedTask._id).then(res => {
                        this.tasks.splice(index, 1)
                    }).catch(error => {
                        console.log(error)
                    })
                }
            },
            async updateTask(index, updatedTask){
                await this.axios.put(baseUrl + updatedTask._id, updatedTask).then(res => {
                    this.tasks[index] = updatedTask
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>
