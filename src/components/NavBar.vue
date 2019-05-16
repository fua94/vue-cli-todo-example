<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="/">VUE Tasks</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item"
                    v-if="!loggedIn">
                    <router-link :to="{ name: 'login' }" class="nav-link">
                        Login
                    </router-link>
                </li>
                <li class="nav-item"
                    v-if="!loggedIn">
                    <router-link :to="{ name: 'register' }" class="nav-link">
                        Register
                    </router-link>
                </li>
                <li class="nav-item"
                    v-if="loggedIn">
                    <router-link :to="{ name: 'tasks' }" class="nav-link">
                        Tasks
                    </router-link>
                </li>
                <li class="nav-item"
                    v-if="loggedIn">
                    <a class="nav-link" href="#"
                        @click="onClickLogout">Logout
                    </a>
                </li>
            </ul>
            <span class="navbar-text"
                v-if="loggedIn">
                Wellcome, {{loggeduser}}
            </span>
        </div>
    </nav>
</template>

<script>
    export default {
        computed: {
            loggedIn() {
                return this.$store.getters.loggedIn
            },
            loggeduser() {
                return this.$store.getters.loggedUser
            },
        },
        methods: {
            onClickLogout(){
                this.$store.dispatch('destroyToken')
                this.$router.push({ name: 'login' })
            }
        }
    }
</script>
