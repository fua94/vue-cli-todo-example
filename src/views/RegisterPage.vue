<template>
    <div class="container p-4">
        <div class="row">
            <div class="mx-auto w-50 card">
              <div class="card-body">
                  <form
                      @submit.prevent="onSubmitRegister">
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input type="text" class="form-control" name="name" placeholder="Enter name"
                          v-model="credentials.name">
                    </div>
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input type="email" class="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email"
                          v-model="credentials.email">
                    </div>
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input type="password" class="form-control" name="password" placeholder="Password"
                          v-model="credentials.password">
                    </div>
                    <div class="form-group">
                      <label for="password">Confirm Password</label>
                      <input type="password" class="form-control" name="password" placeholder="Confirm"
                          v-model="confirm">
                    </div>
                    <div class="form-group">
                        <span class="text-danger"
                            v-for="error in errors">
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
                    name: '',
                    email: '',
                    password: ''
                },
                confirm: '',
                errors: []
            }
        },
		watch: {
		    confirm: function(){
				if(this.credentials.password != this.confirm)
		    		this.errors[0] = 'Passwords no match';
				else
		    		this.errors = [];
		    }
	  	},
        methods: {
            async onSubmitRegister() {
                await this.$store.dispatch('registerUser', this.credentials)
                .then(response => {
                    const user = {
                        email: this.credentials.email,
                        password: this.credentials.password
                    }
                    this.$store.dispatch('retrieveToken', this.credentials)
                    this.$router.push({ name: 'tasks' })
                })
            }
        }
    }
</script>
