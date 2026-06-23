<script setup lang="ts">
import { ref } from 'vue'
import type { Post } from '@/types'

defineProps<{
  posts: Post[]
}>()

defineEmits<{
  (e: 'toggleLike', post: Post): void
  (e: 'viewDetail', post: Post): void
}>()

const expandedPosts = ref<Set<number>>(new Set())
const MAX_LENGTH = 120

const melons = [
  `<svg viewBox="0 0 24 24" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#40c057"/><circle cx="12" cy="12" r="8.5" fill="#ffffff"/><circle cx="12" cy="12" r="7.5" fill="#ff4f68"/><circle cx="12" cy="8" r="0.8" fill="#2d211f"/><circle cx="9" cy="13" r="0.8" fill="#2d211f"/><circle cx="15" cy="13" r="0.8" fill="#2d211f"/><circle cx="10.5" cy="10" r="0.8" fill="#2d211f"/><circle cx="13.5" cy="10" r="0.8" fill="#2d211f"/><circle cx="12" cy="15" r="0.8" fill="#2d211f"/></svg>`,
  `<svg viewBox="0 0 24 24" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(-10 12 12)"><path d="M 2 12 A 10 10 0 0 0 22 12 Z" fill="#40c057"/><path d="M 3.5 12 A 8.5 8.5 0 0 0 20.5 12 Z" fill="#ffffff"/><path d="M 4.5 12 A 7.5 7.5 0 0 0 19.5 12 Z" fill="#ff4f68"/><circle cx="9" cy="15" r="0.8" fill="#2d211f"/><circle cx="15" cy="15" r="0.8" fill="#2d211f"/><circle cx="12" cy="17" r="0.8" fill="#2d211f"/></g></svg>`,
  `<svg viewBox="0 0 24 24" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(15 12 12)"><path d="M 12 12 L 3.34 17 A 10 10 0 0 0 20.66 17 Z" fill="#40c057"/><path d="M 12 12 L 4.64 16.25 A 8.5 8.5 0 0 0 19.36 16.25 Z" fill="#ffffff"/><path d="M 12 12 L 5.5 15.75 A 7.5 7.5 0 0 0 18.5 15.75 Z" fill="#ff4f68"/><circle cx="12" cy="16.5" r="0.8" fill="#2d211f"/><circle cx="9.5" cy="14.5" r="0.8" fill="#2d211f"/><circle cx="14.5" cy="14.5" r="0.8" fill="#2d211f"/></g></svg>`,
  `<svg viewBox="0 0 24 24" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(-20 12 12)"><path d="M 12 12 L 4.93 19.07 A 10 10 0 0 0 19.07 19.07 Z" fill="#40c057"/><path d="M 12 12 L 5.99 18.01 A 8.5 8.5 0 0 0 18.01 18.01 Z" fill="#ffffff"/><path d="M 12 12 L 6.7 17.3 A 7.5 7.5 0 0 0 17.3 17.3 Z" fill="#ff4f68"/><circle cx="12" cy="17.5" r="0.8" fill="#2d211f"/><circle cx="9.5" cy="16" r="0.8" fill="#2d211f"/><circle cx="14.5" cy="16" r="0.8" fill="#2d211f"/></g></svg>`
]

const getMelonIcon = (postOrId: Post | number) => {
  if (typeof postOrId === 'object') {
    if (postOrId.melonStyle !== undefined && postOrId.melonStyle !== null) {
      return melons[postOrId.melonStyle]
    }
    const index = postOrId.id % melons.length
    return melons[index]
  }
  const index = postOrId % melons.length
  return melons[index]
}

const toggleExpand = (postId: number) => {
  if (expandedPosts.value.has(postId)) {
    expandedPosts.value.delete(postId)
  } else {
    expandedPosts.value.add(postId)
  }
}

const getStrippedContent = (content: string) => {
  if (!content) return ''
  return content.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ')
}

const getDisplayContent = (content: string) => {
  if (!content) return ''
  const stripped = getStrippedContent(content)
  return stripped.length > MAX_LENGTH ? stripped.slice(0, MAX_LENGTH) : stripped
}

const isExpanded = (postId: number) => expandedPosts.value.has(postId)

const shouldTruncate = (content: string) => {
  if (!content) return false
  return getStrippedContent(content).length > MAX_LENGTH
}
</script>

<template>
  <div class="post-list">
    <div 
      v-for="(post, index) in posts" 
      :key="post.id" 
      class="post-card animate-slide-up"
      :style="{ animationDelay: `${index * 0.1}s` }"
    >
      <div class="post-header">
        <div class="avatar-wrapper">
          <span class="avatar melon-avatar" v-html="getMelonIcon(post)"></span>
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
        <div v-if="shouldTruncate(post.content) && !isExpanded(post.id)" class="post-text-content">
          {{ getDisplayContent(post.content) }}
          <span class="ellipsis">...</span>
        </div>
        <div v-else class="post-text-content" v-html="post.content"></div>
        
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
            <img :src="(img as any).base64" :alt="(img as any).fileName" class="post-image" />
          </div>
        </div>
      </div>
      
      <div class="post-actions">
        <button 
          class="action-btn like-btn" 
          @click="$emit('toggleLike', post)"
          :class="{ liked: post.isLiked }"
        >
          <svg 
            v-if="!post.isLiked" 
            viewBox="0 0 24 24" 
            class="action-icon"
          >
            <path 
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
              fill="#999"
            />
          </svg>
          <svg 
            v-else 
            viewBox="0 0 24 24" 
            class="action-icon liked-icon"
          >
            <path 
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
              fill="#ff6b6b"
            />
          </svg>
          <span class="action-count">{{ post.likes }}</span>
        </button>
        
        <button class="action-btn detail-btn" @click="$emit('viewDetail', post)">
          <svg viewBox="0 0 24 24" class="action-icon">
            <path 
              d="M12 4C6.48 4 2 8.48 2 14s4.48 10 10 10 10-4.48 10-10S17.52 4 12 4zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z" 
              fill="#999"
            />
          </svg>
          <span class="action-count">详情 · {{ post.comments.length }} 评论</span>
        </button>
      </div>
      
      <div class="watermelon-decor">
        <span class="watermelon-slice" v-html="getMelonIcon(post.id)"></span>
      </div>
    </div>
    
    <div v-if="posts.length === 0" class="empty-state">
      <div class="empty-watermelon animate-bounce" v-html="melons[3]"></div>
      <p class="empty-text">还没有瓜...</p>
      <p class="empty-hint">快来发布第一个瓜吧！</p>
    </div>
  </div>
</template>

<style scoped src="../../css/components/common/PostList.css"></style>
