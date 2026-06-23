<script setup>import { ref, computed } from 'vue';
import RichTextEditor from './RichTextEditor.vue';
const props = defineProps({
 categories: {
 type: Array,
 default: () => []
 }
});
const emit = defineEmits(['submit', 'close']);
const content = ref('');
const editorRef = ref(null);

const textContentLength = computed(() => {
  return content.value.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').length;
});

const handleInput = (e) => {
  content.value = e.target.innerHTML;
};

const isFullScreen = ref(false);

const toggleFullScreen = () => {
  isFullScreen.value = !isFullScreen.value;
};

const selectedCategories = ref([]);
const customCategory = ref('');
const isSubmitting = ref(false);
const showCustomCategory = ref(false);
const defaultCategories = ['情感', '日常', '办公', '娱乐', '科技', '美食', '旅行', '其他'];
const allCategories = [...defaultCategories, ...props.categories];

const selectedMelonIndex = ref(null);
const selectMelon = (index) => {
  if (selectedMelonIndex.value === index) {
    selectedMelonIndex.value = null;
  } else {
    selectedMelonIndex.value = index;
  }
};

const melons = [
  `<svg viewBox="0 0 24 24" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#40c057"/><circle cx="12" cy="12" r="8.5" fill="#ffffff"/><circle cx="12" cy="12" r="7.5" fill="#ff4f68"/><circle cx="12" cy="8" r="0.8" fill="#2d211f"/><circle cx="9" cy="13" r="0.8" fill="#2d211f"/><circle cx="15" cy="13" r="0.8" fill="#2d211f"/><circle cx="10.5" cy="10" r="0.8" fill="#2d211f"/><circle cx="13.5" cy="10" r="0.8" fill="#2d211f"/><circle cx="12" cy="15" r="0.8" fill="#2d211f"/></svg>`,
  `<svg viewBox="0 0 24 24" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(-10 12 12)"><path d="M 2 12 A 10 10 0 0 0 22 12 Z" fill="#40c057"/><path d="M 3.5 12 A 8.5 8.5 0 0 0 20.5 12 Z" fill="#ffffff"/><path d="M 4.5 12 A 7.5 7.5 0 0 0 19.5 12 Z" fill="#ff4f68"/><circle cx="9" cy="15" r="0.8" fill="#2d211f"/><circle cx="15" cy="15" r="0.8" fill="#2d211f"/><circle cx="12" cy="17" r="0.8" fill="#2d211f"/></g></svg>`,
  `<svg viewBox="0 0 24 24" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(15 12 12)"><path d="M 12 12 L 3.34 17 A 10 10 0 0 0 20.66 17 Z" fill="#40c057"/><path d="M 12 12 L 4.64 16.25 A 8.5 8.5 0 0 0 19.36 16.25 Z" fill="#ffffff"/><path d="M 12 12 L 5.5 15.75 A 7.5 7.5 0 0 0 18.5 15.75 Z" fill="#ff4f68"/><circle cx="12" cy="16.5" r="0.8" fill="#2d211f"/><circle cx="9.5" cy="14.5" r="0.8" fill="#2d211f"/><circle cx="14.5" cy="14.5" r="0.8" fill="#2d211f"/></g></svg>`,
  `<svg viewBox="0 0 24 24" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(-20 12 12)"><path d="M 12 12 L 4.93 19.07 A 10 10 0 0 0 19.07 19.07 Z" fill="#40c057"/><path d="M 12 12 L 5.99 18.01 A 8.5 8.5 0 0 0 18.01 18.01 Z" fill="#ffffff"/><path d="M 12 12 L 6.7 17.3 A 7.5 7.5 0 0 0 17.3 17.3 Z" fill="#ff4f68"/><circle cx="12" cy="17.5" r="0.8" fill="#2d211f"/><circle cx="9.5" cy="16" r="0.8" fill="#2d211f"/><circle cx="14.5" cy="16" r="0.8" fill="#2d211f"/></g></svg>`
];
const handleSubmit = () => {
  if (!textContentLength.value)
    return;
  
  const cats = [...selectedCategories.value];
  if (showCustomCategory.value && customCategory.value.trim()) {
    cats.push(customCategory.value.trim());
  }
  
  const category = cats.join('、');
  
  isSubmitting.value = true;
  setTimeout(() => {
    emit('submit', {
      content: content.value,
      category,
      melonStyle: selectedMelonIndex.value
    });
    content.value = '';
    selectedCategories.value = [];
    customCategory.value = '';
    showCustomCategory.value = false;
    selectedMelonIndex.value = null;
    isSubmitting.value = false;
  }, 500);
};
const selectCategory = (cat) => {
  if (cat === '自定义') {
    showCustomCategory.value = !showCustomCategory.value;
    if (!showCustomCategory.value) {
      customCategory.value = '';
    }
  } else {
    const idx = selectedCategories.value.indexOf(cat);
    if (idx > -1) {
      selectedCategories.value.splice(idx, 1);
    } else {
      selectedCategories.value.push(cat);
    }
  }
};
</script>

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
