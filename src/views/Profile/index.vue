<template>
  <div class="profile">
    <v-container class="my-5">
      <v-row align="center" class="mr-3">
        <v-col cols="12">
          <h1 class="my-5 display-1 font-weight-light">
            Profile
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="">
          <v-card>
            <v-row>
              <v-col cols="12" sm="2" class="py-0 my-0">
                <v-sheet
                  width="100%"
                  height="100%"
                  style="background: #398f14"
                ></v-sheet>
              </v-col>

              <v-col cols="12" sm="10" class="text-center pl-0">
                <v-row class="flex-column ma-0 fill-height" justify="center">
                  <v-col class="mx-1">
                    <h1 class="title text-left">
                      <span class="primary--text">Username:</span>
                      <br />
                      {{ user.username ? user.username : "N/A" }}
                    </h1>
                  </v-col>

                  <v-col class="mx-1">
                    <h1 class="title text-left">
                      <span class="primary--text">Email:</span>
                      <br />
                      {{ user.email }}
                    </h1>
                  </v-col>

                  <v-col class="mx-1">
                    <h1 class="title text-left">
                      <span class="primary--text">Joined on:</span>
                      <br />
                      {{
                        new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })
                      }}
                    </h1>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Profile",

  data() {
    return {
      user: this.$store.state.user,
      userModel: {
        username: "",
        email: "",
        info: {
          major: "",
          year: "",
          school: "",
          bio: ""
        }
      },
      error: "",
      userBuffer: {},
      editDialogue: false,
      updateLoading: false
    };
  },

  created() {
    this.resetUserBuffer();
  },

  methods: {
    resetUserBuffer() {
      this.userBuffer = {
        ...this.userModel,
        ...this.user
      };
    },

    closeEditUser() {
      this.editDialogue = false;
      this.resetUserBuffer();
    }
  }
};
</script>
