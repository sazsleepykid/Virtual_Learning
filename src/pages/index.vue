<template>
  <NavigationBar />

  <HeroSection />

  <v-row class="pa-5" align="center" justify="center">
    <v-col v-for="image in images" :key="image" align="center" justify="center">
      <ProductTile :imageSrc="image" />
    </v-col>
  </v-row>

  <v-row align="center" justify="center">
    <v-col cols="8" align="center" justify="center">
      <StudentBenefits />
    </v-col>
  </v-row>
  

  <ParentBenefits />
</template>

<script setup>
import { ref } from 'vue';
import HeroSection from "@/components/HeroSection.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import ParentBenefits from "@/components/ParentBenefits.vue";
import ProductTile from "@/components/ProductTile.vue";
import StudentBenefits from "@/components/StudentBenefits.vue";
import ChatbotPage from "@/components/ChatbotPage.vue";

const images = [
  "@/assets/product1.png",
  "@/assets/product2.png",
  "@/assets/product3.png",
];

const showChat = ref(false);
</script>

<style scoped>
.chat-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.chat-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 161, 154, 0.4) !important;
}

/* Add a subtle pulse animation to draw attention */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 161, 154, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(0, 161, 154, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 161, 154, 0);
  }
}

.chat-button {
  animation: pulse 2s infinite;
}
</style>