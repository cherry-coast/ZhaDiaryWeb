<script setup>
import { ref } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'addComment'])

const newComment = ref('')

const addComment = () => {
  if (!newComment.value.trim()) return
  
  emit('addComment', props.post.id, newComment.value.trim())
  newComment.value = ''
}

const handleKeyup = (e) => {
  if (e.key === 'Enter') {
    addComment()
  }
}
</script>

<template>
  <div class="detail-overlay" @click.self="emit('close')">
    <div class="detail-modal animate-slide-up">
      <div class="detail-header">
        <h2 class="detail-title">帖子详情</h2>
        <button class="close-btn" @click="emit('close')">
          <svg viewBox="0 0 24 24" class="close-icon">
            <path 
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" 
              fill="#ff4f68"
            />
          </svg>
        </button>
      </div>
      
      <div class="detail-content">
        <div class="post-header">
          <div class="avatar-wrapper">
            <span class="avatar">{{ post.avatar }}</span>
          </div>
          <div class="author-info">
            <span class="author-name">{{ post.author }}</span>
            <span class="post-time">{{ post.createdAt }}</span>
          </div>
          <div v-if="post.category" class="post-category">
            <span class="category-tag">{{ post.category }}</span>
          </div>
        </div>
        
        <div class="post-content">
          <p>{{ post.content }}</p>
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
        
        <div class="post-stats">
          <div class="stat-row">
            <span class="stat-icon">❤️</span>
            <span class="stat-text">{{ post.likes }} 点赞</span>
          </div>
          <div class="stat-row">
            <span class="stat-icon">💬</span>
            <span class="stat-text">{{ post.comments.length }} 评论</span>
          </div>
        </div>
        
        <div class="comments-section">
          <h3 class="comments-title">评论 ({{ post.comments.length }})</h3>
          
          <div v-if="post.comments.length === 0" class="empty-comments">
            <p>还没有评论，快来抢沙发！</p>
          </div>
          
          <div v-else class="comments-list">
            <div 
              v-for="comment in post.comments" 
              :key="comment.id" 
              class="comment-item"
            >
              <div class="comment-avatar">💬</div>
              <div class="comment-content">
                <div class="comment-author">{{ comment.author }}</div>
                <div class="comment-text">{{ comment.content }}</div>
                <div class="comment-likes">❤️ {{ comment.likes }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="comment-input-area">
        <input 
          v-model="newComment"
          type="text" 
          class="comment-input"
          placeholder="写下你的评论..."
          @keyup="handleKeyup"
        />
        <button 
          class="comment-submit-btn" 
          :disabled="!newComment.trim()"
          @click="addComment"
        >
          <svg viewBox="0 0 24 24" class="send-icon">
            <path 
              d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" 
              fill="#fff"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped src="./PostDetail.css"></style>
