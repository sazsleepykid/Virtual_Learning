<!-- <template>
  <v-card
    :max-width="maxWidth"
    :width="width"
    :class="containerClass"
  >
    <v-app-bar
      color="white"
      class="elevation-2 rounded-pill ma-4"
      height="50"
      style="border: 3px solid #18C2C0; padding-left: 24px; padding-right: 24px;"
    >
      <v-toolbar-title 
        class="font-weight-bold text-h5" 
        style="color: #18c2c0; cursor: pointer;"
        @click="goToHome"
      >
        AliTeach
      </v-toolbar-title>
  
      <v-spacer></v-spacer>
  
      <div class="d-none d-sm-flex">
        <v-btn text class="text-capitalize mx-1 nav-link" color="grey-darken-2">Learning</v-btn>
        <v-btn text class="text-capitalize mx-1 nav-link" color="grey-darken-2">About</v-btn>
        <v-btn text class="text-capitalize mx-1 nav-link" color="grey-darken-2">Community</v-btn>
      </div>
  
      <v-spacer></v-spacer>
  
      <v-btn
        variant="outlined"
        color="#18C2C0"
        class="text-capitalize rounded-pill mx-1 sign-in-btn"
        width="100"
      >
        Sign In
      </v-btn>
      <v-btn
        color="#18C2C0"
        class="text-capitalize rounded-pill mx-2 sign-up-btn"
        width="100"
        flat
      >
        Sign Up
      </v-btn>
      
      <v-app-bar-nav-icon class="d-sm-none" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
  </v-card>

  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="right"
  >
    <v-list nav dense>
      <v-list-item prepend-icon="mdi-school" title="Learning" value="learning"></v-list-item>
      <v-list-item prepend-icon="mdi-information-outline" title="About" value="about"></v-list-item>
      <v-list-item prepend-icon="mdi-account-group-outline" title="Community" value="community"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationBar",
  props: {
    width: {
      type: [String, Number],
      default: '100%'
    },
    maxWidth: {
      type: [String, Number],
      default: null
    },
    fluid: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    drawer: false, // For the mobile navigation drawer
  }),
  computed: {
    containerClass() {
      return {
        'mx-auto': !this.fluid,
        'w-100': this.fluid
      };
    }
  },
  methods: {
    goToHome() {
      // Implement navigation to home page, e.g., using Vue Router
      // if (this.$router) this.$router.push('/');
      console.log('Navigate to home');
    }
  }
};
</script>

<style scoped>
/* Scoped styles for NavigationBar.vue */
.v-toolbar-title {
  margin-left: 16px; /* Adjust as needed for logo padding */
}

/* Ensure buttons maintain consistent height and style */
.v-btn {
  font-weight: 500; /* Medium font weight for buttons */
}
</style> -->

<template>
  <nav class="custom-navbar">
    <div class="navbar-content">
      <div class="navbar-logo">
        AliTeach
      </div>
      <div class="navbar-links">
        <a href="#" class="nav-link">Learning</a>
        <a href="#" class="nav-link">About</a>
        <a href="#" class="nav-link">Community</a>
      </div>
      <div class="navbar-actions">
        <!-- Show profile picture if logged in -->
        <div v-if="isLoggedIn" class="profile-container">
          <img 
            :src="userProfile.profilePicture || defaultProfilePicture" 
            alt="Profile" 
            class="profile-picture"
            @click="toggleProfileMenu"
          />
          <!-- Profile dropdown menu -->
          <div v-if="showProfileMenu" class="profile-menu">
            <div class="profile-menu-item">{{ userProfile.name || 'User' }}</div>
            <div class="profile-menu-item">My Account</div>
            <div class="profile-menu-item">Settings</div>
            <div class="profile-menu-item logout" @click="logout">Logout</div>
          </div>
        </div>
        <!-- Show auth buttons if not logged in -->
        <template v-else>
          <button class="btn btn-signin" @click="login">Sign In</button>
          <button class="btn btn-signup" @click="signup">Sign Up</button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'CustomNavbar',
  props: {
    // Prop to determine if user is logged in
    isLoggedIn: {
      type: Boolean,
      default: false
    },
    // User profile data
    userProfile: {
      type: Object,
      default: () => ({
        name: '',
        profilePicture: ''
      })
    }
  },
  data() {
    return {
      showProfileMenu: false,
      defaultProfilePicture: 'https://ui-avatars.com/api/?name=User&background=18C2C0&color=fff'
    };
  },
  methods: {
    toggleProfileMenu() {
      this.showProfileMenu = !this.showProfileMenu;
    },
    login() {
      this.$emit('login');
    },
    signup() {
      this.$emit('signup');
    },
    logout() {
      this.showProfileMenu = false;
      this.$emit('logout');
    }
  },
  // Close profile menu when clicking outside
  mounted() {
    document.addEventListener('click', (e) => {
      const profileContainer = this.$el.querySelector('.profile-container');
      if (profileContainer && !profileContainer.contains(e.target)) {
        this.showProfileMenu = false;
      }
    });
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeProfileMenu);
  }
}
</script>

<style scoped>
.custom-navbar {
  background-color: #ffffff; /* White background for the bar itself */
  border: 2px solid #4db6ac; /* Teal border */
  border-radius: 50px; /* Large border-radius for pill shape */
  padding: 10px 25px; /* Adjust padding as needed */
  margin: 20px; /* Example margin, adjust as needed */
  box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Optional subtle shadow */
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.navbar-logo {
  font-size: 28px; /* Adjust size as needed */
  font-weight: bold;
  color: #00897b; /* Teal color for the logo text */
  margin-right: auto; /* Pushes other items to the right */
}

.navbar-links {
  display: flex;
  gap: 30px; /* Space between links */
  margin: 0 auto; /* Centers the links if space allows */
}

.nav-link {
  text-decoration: none;
  color: #555555; /* Dark grey for links */
  font-size: 16px; /* Adjust size as needed */
  padding: 5px 10px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #00897b; /* Teal on hover */
}

.navbar-actions {
  display: flex;
  gap: 15px; /* Space between buttons */
  margin-left: auto; /* Pushes buttons to the right */
}

.btn {
  padding: 10px 25px; /* Adjust padding for button size */
  border: none;
  border-radius: 25px; /* Rounded buttons */
  font-size: 16px; /* Adjust size as needed */
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.btn-signin {
  background-color: #ffffff; /* White background */
  color: #4db6ac; /* Teal text */
  border: 2px solid #4db6ac; /* Teal border */
}

.btn-signin:hover {
  background-color: #f0f0f0; /* Lighter grey on hover */
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.btn-signup {
  background-color: #4db6ac; /* Teal background */
  color: #ffffff; /* White text */
  border: 2px solid #4db6ac; /* Teal border, though background makes it less visible */
}

.btn-signup:hover {
  background-color: #26a69a; /* Darker teal on hover */
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* Profile picture styles */
.profile-container {
  position: relative;
}

.profile-picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #4db6ac;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.profile-picture:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

/* Profile dropdown menu */
.profile-menu {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  width: 180px;
  z-index: 100;
  overflow: hidden;
}

.profile-menu-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: #333;
}

.profile-menu-item:first-child {
  font-weight: bold;
  border-bottom: 1px solid #eee;
  color: #00897b;
}

.profile-menu-item:hover {
  background-color: #f5f5f5;
}

.profile-menu-item.logout {
  color: #f44336;
  border-top: 1px solid #eee;
}

.profile-menu-item.logout:hover {
  background-color: #ffebee;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .navbar-content {
    flex-direction: column;
    align-items: flex-start;
  }
  .navbar-logo {
    margin-bottom: 15px;
    margin-right: 0; /* Reset margin */
  }
  .navbar-links {
    margin: 0 0 15px 0; /* Reset margin and add bottom margin */
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  .navbar-actions {
    margin-left: 0; /* Reset margin */
    width: 100%;
    justify-content: flex-start; /* Align buttons to the start */
  }
  .btn {
    width: auto; /* Or width: 100% if you want them full-width on mobile */
    padding: 8px 15px;
  }
  .custom-navbar {
    border-radius: 20px; /* Less pronounced rounding on smaller screens */
  }
  .profile-menu {
    width: 100%;
    position: relative;
    top: 10px;
    margin-top: 5px;
  }
}
</style>
