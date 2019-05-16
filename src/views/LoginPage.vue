<template>
    <div class="container p-4">
        <div class="row">
            <div class="mx-auto w-50 card">
              <div class="card-body">
                  <form
                      @submit.prevent="onSubmitLogin">
                    <div class="form-group">
                      <label for="email">Email address</label>
                      <input type="email" class="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email"
                          v-model="credentials.email">
                      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input type="password" class="form-control" name="password" placeholder="Password"
                          v-model="credentials.password">
                    </div>
                    <div class="form-group form-check">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1">
                      <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <div class="form-group">
                        <span class="text-danger">
                            {{error}}
                        </span>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
              </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                credentials: {
                    email: '',
                    password: ''
                },
                error: ''
            }
        },
        methods: {
            async onSubmitLogin() {
                await this.$store.dispatch('retrieveToken', this.credentials)
                .then(response => {
                    this.$router.push({ name: 'tasks' })
                    this.error = ''
                })
                .catch(error => {
                    this.error = 'User/Passwords not found';
                })
            }
        }
    }
</script>
