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
          <v-card-title class="text-center mb-3">Student Skills Assessment</v-card-title>
          <SubjectRadarChart
            :labels="subjectCategories"
            :data-points="studentScores"
            :icons="subjectIcons"
            dataset-label="Level"
          />
        </v-card>
      </v-col>
    </v-row>

    <!-- Q&A Section -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-center mb-4">
            {{ currentSubject }} Quiz
            <v-chip class="ml-2" color="primary" size="small">
              Question {{ currentQuestionIndex + 1 }}/{{ questions.length }}
            </v-chip>
          </v-card-title>

          <v-card-text>
            <v-progress-linear
              v-model="progress"
              color="primary"
              height="8"
              rounded
              class="mb-4"
            ></v-progress-linear>

            <h3 class="text-h6 mb-4">{{ currentQuestion.question }}</h3>

            <v-radio-group v-model="selectedAnswer" @change="checkAnswer" class="mb-4">
              <v-radio
                v-for="(option, index) in currentQuestion.options"
                :key="index"
                :label="option"
                :value="index"
                :disabled="answered"
                :color="getOptionColor(index)"
              ></v-radio>
            </v-radio-group>

            <v-expand-transition>
              <div v-if="feedback" :class="feedbackClass" class="pa-3 rounded">
                {{ feedback }}
              </div>
            </v-expand-transition>

            <v-row class="mt-4">
              <v-col cols="12" class="d-flex justify-space-between">
                <v-btn
                  :disabled="currentQuestionIndex === 0"
                  @click="previousQuestion"
                  variant="outlined"
                >
                  Previous
                </v-btn>
                <v-btn
                  color="primary"
                  :disabled="!answered"
                  @click="nextQuestion"
                >
                  {{ isLastQuestion ? 'Finish' : 'Next' }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="pa-5" align="center" justify="center">
      <v-col v-for="image in images" align="center" justify="center">
        <ProductTile :imageSrc="image" />
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col cols="12" align="center" justify="center">
        <StudentBenefits />
      </v-col>
    </v-row>

    <ParentBenefits />
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from 'axios';
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
});

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

// Q&A Related Data
const currentSubject = ref('Physics');
const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const answered = ref(false);
const feedback = ref('');
const feedbackClass = ref('');

const questions = ref([
  {
    question: 'What is the primary unit of force measurement in physics?',
    options: ['Newton', 'Joule', 'Watt', 'Pascal'],
    correctAnswer: 0,
    explanation: 'The Newton (N) is the SI unit of force, defined as the force needed to accelerate 1 kg of mass at 1 meter per second squared.'
  },
  {
    question: 'Which law of motion states that for every action, there is an equal and opposite reaction?',
    options: ['First Law', 'Second Law', 'Third Law', 'Law of Conservation'],
    correctAnswer: 2,
    explanation: 'Newton\'s Third Law of Motion states that for every action force, there is an equal and opposite reaction force.'
  },
  {
    question: 'What is the SI unit of electric current?',
    options: ['Volt', 'Watt', 'Ampere', 'Ohm'],
    correctAnswer: 2,
    explanation: 'The Ampere (A) is the SI unit of electric current, measuring the flow of electric charge.'
  }
]);

const progress = computed(() => {
  return ((currentQuestionIndex.value + 1) / questions.value.length) * 100;
});

const currentQuestion = computed(() => {
  return questions.value[currentQuestionIndex.value];
});

const isLastQuestion = computed(() => {
  return currentQuestionIndex.value === questions.value.length - 1;
});

function getOptionColor(index) {
  if (!answered.value) return 'primary';
  if (index === currentQuestion.value.correctAnswer) return 'success';
  if (index === selectedAnswer.value) return 'error';
  return 'primary';
}

// Add new imports

// Add new state for tracking quiz results
const quizResults = ref({
  subject: currentSubject,
  totalQuestions: questions.value.length,
  answers: [],
  startTime: new Date().toISOString(),
  endTime: null,
  score: 0
});

// Modify checkAnswer function to store answer data
function checkAnswer() {
  answered.value = true;
  const isCorrect = selectedAnswer.value === currentQuestion.value.correctAnswer;
  
  // Store answer data
  quizResults.value.answers.push({
    questionIndex: currentQuestionIndex.value,
    question: currentQuestion.value.question,
    selectedAnswer: selectedAnswer.value,
    correctAnswer: currentQuestion.value.correctAnswer,
    isCorrect: isCorrect,
    timeStamp: new Date().toISOString()
  });

  if (isCorrect) {
    feedback.value = `Correct! ${currentQuestion.value.explanation}`;
    feedbackClass.value = 'bg-success-lighten-4';
    quizResults.value.score += 1;
  } else {
    feedback.value = `Incorrect. ${currentQuestion.value.explanation}`;
    feedbackClass.value = 'bg-error-lighten-4';
  }
}

// Modify nextQuestion function to handle quiz completion
async function nextQuestion() {
  if (isLastQuestion.value) {
    // Set quiz end time
    quizResults.value.endTime = new Date().toISOString();
    
    try {
      // Send quiz results to backend
      const response = await axios.post('/api/quiz-results', quizResults.value);
      console.log('Quiz results submitted successfully:', response.data);
      
      // Show success message or handle response
      // You can add your own UI feedback here
      
    } catch (error) {
      console.error('Failed to submit quiz results:', error);
      // Handle error - show error message to user
    }
    return;
  }
  
  currentQuestionIndex.value++;
  selectedAnswer.value = null;
  answered.value = false;
  feedback.value = '';
}

function previousQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    selectedAnswer.value = null;
    answered.value = false;
    feedback.value = '';
  }
}
</script>

<style scoped>
.bg-success-lighten-4 {
  background-color: #C8E6C9;
}

.bg-error-lighten-4 {
  background-color: #FFCDD2;
}

/* Add any additional page-specific styling here */
.v-card-title {
  color: #333;
}
</style>
