<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  posts: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'viewDetail'])

const searchQuery = ref('')
const expandedPosts = ref(new Set())
const MAX_LENGTH = 120

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) {
    return []
  }
  const query = searchQuery.value.toLowerCase()
  return props.posts.filter(post => 
    post.content.toLowerCase().includes(query) ||
    post.author.toLowerCase().includes(query) ||
    (post.category && post.category.toLowerCase().includes(query))
  )
})

const toggleExpand = (postId) => {
  if (expandedPosts.value.has(postId)) {
    expandedPosts.value.delete(postId)
  } else {
    expandedPosts.value.add(postId)
  }
}

const getDisplayContent = (content) => {
  if (!content) return ''
  return content.length > MAX_LENGTH ? content.slice(0, MAX_LENGTH) : content
}

const isExpanded = (postId) => expandedPosts.value.has(postId)

const shouldTruncate = (content) => content && content.length > MAX_LENGTH

const handleKeyup = (e) => {
  if (e.key === 'Escape') {
    emit('close')
  }
}

watch(() => props.posts, () => {
  searchQuery.value = ''
})
</script>

<template>
  <div class="search-page" @keyup="handleKeyup">
    <div class="search-header">
      <button class="back-btn" @click="emit('close')">
        <svg viewBox="0 0 24 24" class="back-icon">
          <path 
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" 
            fill="#fff"
          />
        </svg>
      </button>
      <div class="search-input-wrapper">
        <input 
          v-model="searchQuery"
          type="text" 
          class="search-input"
          placeholder="搜索瓜..."
          autofocus
        />
        <svg v-if="searchQuery" viewBox="0 0 24 24" class="clear-icon" @click="searchQuery = ''">
          <path 
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" 
            fill="#999"
          />
        </svg>
      </div>
    </div>
    
    <div class="search-content">
      <div v-if="!searchQuery" class="search-hints">
        <h3 class="hints-title">🍉 热门搜索</h3>
        <div class="hints-list">
          <button 
            v-for="hint in ['娱乐圈大瓜', '情感故事', '职场吐槽', '美食分享', '旅行日记']" 
            :key="hint"
            class="hint-item"
            @click="searchQuery = hint"
          >
            {{ hint }}
          </button>
        </div>
      </div>
      
      <div v-else-if="searchResults.length === 0" class="empty-results">
        <div class="empty-icon">🔍</div>
        <p class="empty-text">没有找到相关的瓜</p>
        <p class="empty-hint">换个关键词试试？</p>
      </div>
      
      <div v-else class="search-results">
        <div class="results-count">找到 {{ searchResults.length }} 个瓜</div>
        <div class="post-list">
          <div 
            v-for="(post, index) in searchResults" 
            :key="post.id" 
            class="post-card animate-slide-up"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="post-header">
              <div class="avatar-wrapper">
                <span class="avatar">{{ post.avatar }}</span>
              </div>
              <div class="author-info">
                <span class="author-name">{{ post.author }}</span>
                <span class="post-time">{{ post.createdAt }}</span>
              </div>
            </div>
            
            <div v-if="post.category" class="post-category">
              <span class="category-tag">{{ post.category }}</span>
            </div>
            
            <div class="post-content">
              <p v-if="shouldTruncate(post.content) && !isExpanded(post.id)">
                {{ getDisplayContent(post.content) }}
                <span class="ellipsis">...</span>
              </p>
              <p v-else>{{ post.content }}</p>
              
              <button 
                v-if="shouldTruncate(post.content)" 
                class="expand-btn"
                @click="toggleExpand(post.id)"
              >
                <span class="expand-text">{{ isExpanded(post.id) ? '收起' : '展开' }}</span>
                <svg 
                  viewBox="0 0 24 24" 
                  class="expand-icon"
                  :class="{ expanded: isExpanded(post.id) }"
                >
                  <path 
                    d="M7.5 8.5L12 13l4.5-4.5" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            
            <div v-if="post.images && post.images.length > 0" class="post-images">
              <div class="image-grid">
                <div 
                  v-for="(img, idx) in post.images" 
                  :key="idx" 
                  class="image-item"
                  :class="{ 'single': post.images.length === 1 }"
                >
                  <img :src="img.base64" :alt="img.fileName" class="post-image" />
                </div>
              </div>
            </div>
            
            <div class="post-actions">
              <div class="action-item">
                <span class="action-icon">❤️</span>
                <span class="action-count">{{ post.likes }}</span>
              </div>
              <div class="action-item">
                <span class="action-icon">💬</span>
                <span class="action-count">{{ post.comments.length }}</span>
              </div>
              <button class="detail-btn" @click="emit('viewDetail', post)">
                <svg viewBox="0 0 24 24" class="detail-icon">
                  <path 
                    d="M12 4C6.48 4 2 8.48 2 14s4.48 10 10 10 10-4.48 10-10S17.52 4 12 4zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z" 
                    fill="#999"
                  />
                </svg>
                <span class="action-count">详情</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./SearchPage.css"></style>
