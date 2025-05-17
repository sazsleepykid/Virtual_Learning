<template>
  <NavigationBar 
    :isLoggedIn="userIsLoggedIn" 
    :userProfile="currentUser.profilePicture"
    @login="handleLogin"
    @signup="handleSignup"
    @logout="handleLogout"
  />

  <v-container>
    <v-row>
      <v-col cols="12" md="4" class="pa-3">
        <CapoeiraViewer
          :animation="currentAnimation"
          :stopAnimation="shouldStop"
          :autoPlay="true"
          @animationStarted="handleAnimationStarted"
          @animationStopped="handleAnimationStopped"
          @modelLoaded="modelReady = true"
          @error="handleError"
          ref="viewerRef"
        />
      </v-col>

      <v-col cols="12" md="8">
        <v-card class="pa-3 ma-5" elevation="2">
          <v-card-title class="text-center mb-3"
            >Student Skills Assessment</v-card-title
          >
          <SubjectRadarChart
            :labels="subjectCategories"
            :data-points="studentScores"
            :icons="subjectIcons"
            dataset-label="Level"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-row class="pa-5" align="center" justify="center">
    <v-col v-for="image in images" align="center" justify="center">
      <ProductTile :imageSrc="image" />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="8" align="center" justify="center">
      <StudentBenefits />
    </v-col>
  </v-row>

  <ParentBenefits />
</template>

<script setup>
import { ref } from "vue";
import SubjectRadarChart from "@/components/SubjectRadarChart.vue";
import CapoeiraViewer from "@/components/CapoeiraViewer.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import ParentBenefits from "@/components/ParentBenefits.vue";
import ProductTile from "@/components/ProductTile.vue";
import StudentBenefits from "@/components/StudentBenefits.vue";

const images = [
  "@/assets/product1.png",
  "@/assets/product2.png",
  "@/assets/product3.png",
];

// Animation control variables
const viewerRef = ref(null);
const currentAnimation = ref("");
const shouldStop = ref(false);
const modelReady = ref(false);

const userIsLoggedIn = ref(true);

const currentUser = ref({
  name: "Su Hyeon",
  profilePicture: "@/assets/user.png",
})

currentAnimation.value = "Waving";

// Animation control methods
const playAnimation = (animName) => {
  shouldStop.value = false;
  currentAnimation.value = animName;
};

const stopAnimation = () => {
  shouldStop.value = true;
  // Reset after stopping
  setTimeout(() => {
    shouldStop.value = false;
  }, 500);
};

const handleAnimationStarted = (animName) => {
  console.log(`Animation started: ${animName}`);
};

const handleAnimationStopped = (animName) => {
  console.log(`Animation stopped: ${animName}`);
};

const handleError = (error) => {
  console.error("CapoeiraViewer error:", error);
};

const handleLogin = () => {
  console.error("Login");
};

const handleSignup = () => {
  console.error("SignUp");
};

const handleLogout = () => {
  console.error("Log Out");
};

// Subject data for radar chart
const subjectCategories = [
  "Physics",
  "Biology",
  "Math",
  "Chemistry",
  "English",
  "Sports",
];

const studentScores = [10, 30, 0, 0, 30, 50]; // Example scores

const subjectIcons = [
  // Example for using Vuetify MDI icons or images
  { mdi: "mdi-radioactive", color: "#2196F3" }, // Physics
  { mdi: "mdi-dna", color: "#4CAF50" }, // Biology
  { mdi: "mdi-calculator-variant", color: "#FFC107" }, // Math
  { mdi: "mdi-beaker-outline", color: "#E91E63" }, // Chemistry
  { mdi: "mdi-book-open-page-variant", color: "#9C27B0" }, // English
  { mdi: "mdi-basketball", color: "#FF9800" }, // Sports
];
</script>

<style scoped>
/* Add any additional page-specific styling here */
.v-card-title {
  color: #333;
}
</style>
