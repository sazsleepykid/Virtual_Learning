<template>
  <v-card
    class="student-benefits-container rounded-xl pa-6"
    color="#00c48c"
    flat
    style="position: relative; overflow: hidden"
  >
    <v-row align="center">
      <v-col cols="12" md="7" style="z-index: 1">
        <h2 class="text-h4 font-weight-bold mb-6 text-white">
          For <span class="highlight">Students</span>
        </h2>

        <v-list color="transparent" class="mb-8">
          <v-list-item
            v-for="(benefit, index) in benefits"
            :key="index"
            class="px-0 mb-2"
            density="compact"
          >
            <template v-slot:prepend>
              <v-icon color="white" class="mr-3">mdi-check-circle</v-icon>
            </template>
            <v-list-item-title class="text-body-1 text-white">{{ benefit }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-btn
          color="white"
          class="text-capitalize rounded-pill font-weight-bold px-6 py-3"
          size="large"
          @click="exploreClicked"
        >
          {{ exploreText }}
          <v-icon right dark class="ml-2" color="#00c48c">mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>

      <v-col
        cols="12"
        md="5"
        class="d-none d-md-flex justify-center align-center"
        style="z-index: 1; position: relative"
      >
        <v-img
          :src="studentImage"
          alt="Students learning"
          max-height="350"
          contain
        ></v-img>
      </v-col>
    </v-row>

    <v-sheet
      color="rgba(255, 255, 255, 0.9)"
      class="baseline-features-bar rounded-pill pa-3 mt-8 d-flex align-center justify-space-around flex-wrap"
      style="z-index: 1; position: relative"
    >
      <span class="font-weight-medium mr-2" style="color: #333">Baseline:</span>
      <div
        v-for="(step, index) in progressSteps"
        :key="index"
        class="d-flex align-center mx-1 my-1"
      >
        <span class="text-body-2 font-weight-medium" style="color: #333">{{ step }}</span>
        <v-icon
          v-if="index < progressSteps.length - 1"
          small
          color="#BDBDBD"
          class="mx-1"
        >mdi-chevron-right</v-icon>
      </div>
    </v-sheet>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import studentsImage from '@/assets/students.png';

const studentImage = studentsImage;

const benefits = ref([
  'Learn at your own pace and get the content you need.',
  'Make learning fun and engaging with tuitions, quizzes, test & quick notes.',
  'See how you\'re doing and identify areas to improve.',
  'Earn rewards for your hard work.'
]);

const progressSteps = ref([
  'Personalized Learning',
  'Interactive Content',
  'Trackable Progress',
  'Rewards'
]);

const exploreText = ref('Explore Pandai for Students');

const exploreClicked = () => {
  console.log('Explore button clicked');
  // Add your navigation or action logic here
};

// Component name definition using defineOptions (Vue 3.3+)
defineOptions({
  name: 'StudentBenefits'
});
</script>

<style scoped>
.student-benefits-container {
  font-family: Arial, sans-serif;
}

.highlight {
  font-weight: bold;
}

/* Responsive adjustments for baseline features bar */
@media (max-width: 600px) {
  .baseline-features-bar {
    flex-direction: column;
    align-items: flex-start;
  }
  .baseline-features-bar > div {
    margin-bottom: 4px;
  }
}
</style>
export default {
  name: 'StudentBenefits'
}