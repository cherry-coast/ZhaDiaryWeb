<script setup>
import { ref } from 'vue'

defineProps({
  post: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['addComment', 'close'])

const commentContent = ref('')
const isSubmitting = ref(false)

const handleSubmit = () => {
  if (!commentContent.value.trim()) return
  
  isSubmitting.value = true
  
  setTimeout(() => {
    emit('addComment', post.id, commentContent.value.trim())
    commentContent.value = ''
    isSubmitting.value = false
  }, 300)
}
</script>

<template>
  <div class="comment-overlay" @click.self="emit('close')">
    <div class="comment-section animate-slide-up">
      <div class="comment-header">
        <button class="back-btn" @click="emit('close')">
          <svg viewBox="0 0 24 24" class="back-icon">
            <path 
              d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" 
              fill="#333"
            />
          </svg>
        </button>
        <span class="comment-title">评论</span>
        <span class="comment-count">{{ post.comments.length }}</span>
      </div>
      
      <div class="original-post">
        <div class="post-avatar">
          <span>{{ post.avatar }}</span>
        </div>
        <div class="post-info">
          <span class="post-author">{{ post.author }}</span>
          <p class="post-text">{{ post.content }}</p>
        </div>
      </div>
      
      <div class="comment-list">
        <div 
          v-for="(comment, index) in post.comments" 
          :key="comment.id" 
          class="comment-item animate-slide-up"
          :style="{ animationDelay: `${index * 0.05}s` }"
        >
          <div class="comment-avatar">
            <span>💬</span>
          </div>
          <div class="comment-body">
            <div class="comment-body-header">
              <span class="comment-author">{{ comment.author }}</span>
              <button class="comment-like-btn">
                <svg viewBox="0 0 24 24" class="like-icon">
                  <path 
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                    fill="#ccc"
                  />
                </svg>
                <span class="like-count">{{ comment.likes }}</span>
              </button>
            </div>
            <p class="comment-text">{{ comment.content }}</p>
          </div>
        </div>
        
        <div v-if="post.comments.length === 0" class="no-comments">
          <span class="no-comment-icon">🍉</span>
          <p>还没有评论，快来抢沙发！</p>
        </div>
      </div>
      
      <div class="comment-input-wrapper">
        <input 
          v-model="commentContent"
          type="text" 
          class="comment-input"
          placeholder="发表你的看法..."
          maxlength="200"
          @keyup.enter="handleSubmit"
        />
        <button 
          class="send-btn" 
          :disabled="!commentContent.trim() || isSubmitting"
          @click="handleSubmit"
        >
          <svg viewBox="0 0 24 24" class="send-icon">
            <path 
              d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" 
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      
      <div class="mole-decoration">
        <span class="mole">🐹</span>
      </div>
    </div>
  </div>
</template>

<style scoped src="./CommentSection.css"></style>
