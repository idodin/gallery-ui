<template>
  <v-card
    hover
    tile
    router
    :to="'/users/' + data.username"
    class="py-3 px-5 mx-2"
  >
    <v-row>
      <v-col cols="12" class="title">{{ data.username }}</v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="subtext grey--text text-truncate">{{
        data.email
      }}</v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        Created:
        {{
          new Date(data.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })
        }}
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "UsersUser",

  props: ["data"]
};
</script>
