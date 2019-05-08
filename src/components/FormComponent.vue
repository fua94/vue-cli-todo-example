<template>
    <form @submit.prevent="onClickAdd">
        <div class="card mb-2">
            <div class="card-body">
                <div class="card-title">
                    <div class="form-group">
                        <input type="text" placeholder="Task" class="form-control"
                        v-model="task.title">
                    </div>
                </div>
                <p class="card-text">
                    <div class="form-group">
                        <textarea type="text" placeholder="Description" class="form-control"
                        v-model="task.description"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Add</button>
                </p>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                task: {
                    title: '',
                    description: ''
                }
            }
        },
        created() {

        },
        methods: {
            onClickAdd(){
                this.$emit('add', this.task)
            }
        }
    }
</script>
