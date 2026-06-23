<script setup>
import { ref } from 'vue'

defineProps({
  totalPosts: {
    type: Number,
    default: 0
  },
  totalComments: {
    type: Number,
    default: 0
  },
  categories: {
    type: Array,
    default: () => []
  },
  selectedCategories: {
    type: Array,
    default: () => []
  },
  filteredCount: {
    type: Number,
    default: 0
  },
  currentUser: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['openPostForm', 'search', 'filterCategory', 'openLogin', 'logout', 'openProfile'])

const searchQuery = ref('')

const handleSearch = () => {
  emit('search', searchQuery.value.trim())
}

const handleKeyup = (e) => {
  if (e.key === 'Enter') {
    handleSearch()
  }
}
</script>

<template>
  <header class="header">
    <div class="header-content">
      <div class="logo-section header-left">
        <div class="watermelon-logo animate-bounce">
          <img src="/吃瓜.svg" class="watermelon-svg" alt="吃瓜日记" />
        </div>
        <div class="title-section">
          <h1 class="title">吃瓜日记</h1>
          <p class="subtitle">猹的快乐老家</p>
        </div>
      </div>
      
      <div class="desktop-search header-center">
        <input 
          v-model="searchQuery"
          type="text" 
          class="search-input"
          placeholder="搜索瓜..."
          @keyup="handleKeyup"
        />
        <button class="search-submit-btn" @click="handleSearch" title="吃瓜搜索">
          <svg viewBox="0 0 24 24" class="search-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 5.5 8.5 A 5 5 0 0 1 8.5 5.5" stroke="#ff4f68" stroke-width="1.5" stroke-linecap="round" opacity="0.4" />
            <circle cx="10" cy="10" r="7" stroke="#ff4f68" stroke-width="2" />
            <line x1="15" y1="15" x2="21" y2="21" stroke="#40c057" stroke-width="2.5" stroke-linecap="round" />
            <path d="M 6.5 9 A 3.5 3.5 0 0 0 13.5 9 Z" fill="#ff4f68" />
            <path d="M 6.5 9 A 3.5 3.5 0 0 0 13.5 9" stroke="#40c057" stroke-width="1.5" stroke-linecap="round" />
            <circle cx="8.5" cy="10.5" r="0.6" fill="#ffffff" />
            <circle cx="11.5" cy="10.5" r="0.6" fill="#ffffff" />
          </svg>
        </button>
      </div>

      <div class="user-section header-right">
        <div v-if="currentUser" class="user-profile">
          <div class="user-avatar clickable" @click="emit('openProfile')" title="修改个人信息">{{ currentUser.avatar }}</div>
          <span class="user-name clickable" @click="emit('openProfile')" title="修改个人信息">{{ currentUser.username }}</span>
          <button class="logout-btn" @click="emit('logout')" title="退出登录">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
        <button v-else class="login-trigger-btn" @click="emit('openLogin')">登录 / 注册</button>
      </div>
    </div>
  </header>
</template>

<style scoped src="../../css/components/web/Header.css"></style>
