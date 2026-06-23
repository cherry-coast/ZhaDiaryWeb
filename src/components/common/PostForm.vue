<script src="../../js/components/common/PostForm.js"></script>

<template>
  <div class="post-form-overlay" @click.self="emit('close')">
    <div class="post-form animate-slide-up">
      <div class="form-header">
        <h2 class="form-title">🍉 发个瓜</h2>
        <button class="close-btn" @click="emit('close')">
          <svg viewBox="0 0 24 24" class="close-icon">
            <path 
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" 
              fill="#ff4f68"
            />
          </svg>
        </button>
      </div>
      
      <div class="form-body-scroll">
      
      <div class="category-section">
        <p class="category-label">选择分类</p>
        <div class="category-picker">
          <button 
            v-for="cat in [...new Set(allCategories), '自定义']" 
            :key="cat"
            class="category-item"
            :class="{ active: selectedCategories.includes(cat) || (cat === '自定义' && showCustomCategory) }"
            @click="selectCategory(cat)"
          >
            {{ cat }}
          </button>
        </div>
        <input 
          v-if="showCustomCategory"
          v-model="customCategory"
          type="text"
          class="custom-category-input"
          placeholder="输入自定义分类"
          maxlength="10"
          @keyup.enter="content && handleSubmit()"
        />
      </div>
      
      <div class="editor-wrapper" :class="{ 'fullscreen-wrapper': isFullScreen }">
        <div class="editor-header-controls">
          <button class="fullscreen-btn" @click="toggleFullScreen" title="全屏富文本编辑">
            <svg v-if="!isFullScreen" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
            <svg v-else viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
            </svg>
            <span v-if="isFullScreen" class="fullscreen-text">退出全屏</span>
          </button>
        </div>
        <RichTextEditor 
          v-model="content"
          :isFullScreen="isFullScreen"
        />
        <span v-if="!isFullScreen" class="char-count-overlay">{{ textContentLength }}/500</span>
        
        <!-- Action buttons in fullscreen mode -->
        <div v-if="isFullScreen" class="fullscreen-actions">
          <span class="char-count">{{ textContentLength }}/500</span>
          <button class="cancel-btn" @click="toggleFullScreen">缩小</button>
          <button 
          class="submit-btn" 
          @click="handleSubmit"
        >
          <span>{{ isSubmitting ? '发布中...' : '发布瓜' }}</span>
          <svg v-if="!isSubmitting" viewBox="0 0 24 24" class="send-icon">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor"/>
          </svg>
        </button>
      </div>
      </div>
      
      <!-- image upload section removed -->
      
      <div class="form-footer">
        <div class="emoji-picker">
          <button 
            v-for="(svg, index) in melons" 
            :key="index"
            class="emoji-item melon-style-btn"
            :class="{ active: selectedMelonIndex === index }"
            @click="selectMelon(index)"
            v-html="svg"
          >
          </button>
        </div>
        
        <button 
          class="submit-btn" 
          :disabled="!textContentLength || isSubmitting"
          @click="handleSubmit"
        >
          <span>{{ isSubmitting ? '发布中...' : '发布瓜' }}</span>
          <svg v-if="!isSubmitting" viewBox="0 0 24 24" class="send-icon">
            <path 
              d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" 
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="../../css/components/common/PostForm.css"></style>
