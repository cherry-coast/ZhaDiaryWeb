<script setup>
import { computed } from 'vue'

const props = defineProps({
  selectedCategories: {
    type: Array,
    default: () => []
  },
  allCategories: {
    type: Array,
    default: () => []
  },
  postCounts: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['toggleCategory'])

const defaultCategories = ['全部', '情感', '日常', '办公', '娱乐', '科技', '美食', '旅行', '其他']

const allAvailableCategories = computed(() => {
  const categories = [...new Set([...defaultCategories, ...props.allCategories])]
  return categories.sort((a, b) => {
    if (a === '全部') return -1
    if (b === '全部') return 1
    return a.localeCompare(b)
  })
})

const isSelected = (cat) => {
  if (cat === '全部') {
    return props.selectedCategories.length === 0
  }
  return props.selectedCategories.includes(cat)
}

const getPostCount = (cat) => {
  if (cat === '全部') {
    return Object.values(props.postCounts).reduce((sum, count) => sum + count, 0)
  }
  return props.postCounts[cat] || 0
}

const toggleCategory = (cat) => {
  if (cat === '全部') {
    emit('toggleCategory', [])
    return
  }
  
  const newSelection = isSelected(cat)
    ? props.selectedCategories.filter(c => c !== cat)
    : [...props.selectedCategories, cat]
    
  emit('toggleCategory', newSelection)
}
</script>

<template>
  <aside class="category-sidebar">
    <div class="sidebar-header">
      <h3 class="sidebar-title">
        <img src="/种类.svg" class="category-icon" alt="分类" />
        分类
      </h3>
    </div>
    
    <div class="category-tags">
      <button 
        v-for="cat in allAvailableCategories" 
        :key="cat"
        class="category-tag"
        :class="{ active: isSelected(cat) }"
        @click="toggleCategory(cat)"
      >
        <span class="tag-icon" v-if="cat === '全部'">📋</span>
        <span class="tag-icon" v-else-if="cat === '情感'">💔</span>
        <span class="tag-icon" v-else-if="cat === '日常'">📅</span>
        <span class="tag-icon" v-else-if="cat === '办公'">💼</span>
        <span class="tag-icon" v-else-if="cat === '娱乐'">🎬</span>
        <span class="tag-icon" v-else-if="cat === '科技'">🤖</span>
        <span class="tag-icon" v-else-if="cat === '美食'">🍜</span>
        <span class="tag-icon" v-else-if="cat === '旅行'">✈️</span>
        <span class="tag-text">{{ cat }}</span>
        <span class="tag-count">{{ getPostCount(cat) }}</span>
      </button>
    </div>
    
    <div class="sidebar-footer">
      <span v-if="selectedCategories.length > 0" class="selected-info">
        已选 {{ selectedCategories.length }} 个分类
      </span>
      <span v-else class="selected-info">
        全部 {{ getPostCount('全部') }} 个瓜
      </span>
    </div>
  </aside>
</template>

<style scoped src="../../css/components/web/CategorySidebar.css"></style>
