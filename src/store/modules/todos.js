import axios from 'axios'

const state = {
    token: '',
    tasks: []
}

const getters = {
    tasks: state => state.tasks
}

const baseUrl = './api/tasks/'

const actions = {
    async fetchTasks({ commit }) {
        let userUri = './users/authenticate/'
        var token = ''
        let user = {
            email: "fulloa@email.com",
        	password: "123456"
        }
        await axios.post(userUri, user).then(res => {
            commit('setToken', res.data.token)
        }).catch(error => {
            console.log(error)
        })

        const response = await axios.get(baseUrl,
            { headers: {'token-access': state.token} }
        )
        commit('setTasks', response.data)
    },
    async addTask({ commit }, task) {
        await axios.post(baseUrl, task,
            { headers: {'token-access': state.token} })
        .then(res => commit('newTask', task))
        .catch(error => console.log(error))
    },
    async deleteTask({ commit }, task, index) {
        await axios.delete(baseUrl + task._id,
            { headers: {'token-access': state.token} })
        .then(res => commit('removeTask', index))
        .catch(error => console.log(error))
    },
    async updateTask({ commit }, task, index) {
        await axios.put(baseUrl + task._id, task,
            { headers: {'token-access': state.token} })
        .then(res => commit('refreshTask', index, task))
        .catch(error => console.log(error))
    }
}

const mutations = {
    setToken: (state, token) => (state.token = token),
    setTasks: (state, tasks) => (state.tasks = tasks),
    newTask: (state, task) => state.tasks.push(task),
    removeTask: (state, index) => state.tasks.splice(index, 1),
    refreshTask: (state, index, task) => (state.tasks[index] = task)
}

export default {
    state,
    getters,
    actions,
    mutations
}
