<script src="../../js/components/web/CategorySidebar.js"></script>

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
