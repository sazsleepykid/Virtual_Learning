<template>
  <v-app-bar
    app
    color="white"
    elevate-on-scroll
    class="elevation-2 rounded-pill ma-4"
    height="80"
  >
    <v-container class="py-0 fill-height d-flex align-center">
      <v-toolbar-title
        class="teal--text text--darken-2 font-weight-bold text-h5 mr-6"
      >
        AliTeach
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text class="mx-1" color="grey darken-1"> Learning </v-btn>
      <v-btn text class="mx-1" color="grey darken-1"> About </v-btn>
      <v-btn text class="mx-1" color="grey darken-1"> Community </v-btn>

      <v-spacer></v-spacer>

      <v-btn outlined color="teal darken-1" class="mx-2 rounded-lg" large>
        Sign In
      </v-btn>
      <v-btn
        color="teal darken-1"
        dark
        class="mx-2 rounded-lg"
        large
        elevation="0"
      >
        Sign Up
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavigationBar",
  // You can add data, methods, computed properties, etc. here if needed.
  data: () => ({
    //
  }),
};
</script>

<style scoped>
/* Scoped styles for this component */
.v-toolbar__content,
.v-toolbar__extension {
  padding: 0; /* Remove default app-bar padding if container is used */
}
.v-btn {
  text-transform: none; /* Prevent uppercase button text if not desired */
  font-weight: 500;
}
.rounded-lg {
  border-radius: 8px !important; /* Custom rounded corners for buttons */
}
/* Optional: Add a border similar to the image */
.v-app-bar {
  border-bottom: 3px solid #00897b !important; /* Teal darken-1 color */
}
</style>
