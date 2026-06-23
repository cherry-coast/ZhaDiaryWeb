<script src="../../js/components/mobile/BottomNav.js"></script>

<template>
  <nav class="bottom-nav" aria-label="移动端主导航">
    <button class="nav-item" :class="{ active: !hasActiveFilters }" @click="emit('home')">
      <span class="nav-symbol">⌂</span>
      <span class="nav-label">首页</span>
    </button>
    
    <button class="nav-item post-nav" aria-label="发布新瓜" @click="emit('post')">
      <span class="post-hit-area">
        <svg viewBox="0 0 32 32" class="nav-icon">
          <!-- Watermelon Slice (Perfectly Semicircular) -->
          <!-- Green Rind -->
          <path d="M2 12h28A14 14 0 0 1 2 12z" fill="#2f9e44" />
          <!-- White Rind -->
          <path d="M3.5 12h25A12.5 12.5 0 0 1 3.5 12z" fill="#fff" />
          <!-- Red Flesh -->
          <path d="M5 12h22A11 11 0 0 1 5 12z" fill="#ff4f68" />
          
          <!-- Seeds -->
          <circle cx="10" cy="15.5" r="0.8" fill="#2d211f" />
          <circle cx="22" cy="15.5" r="0.8" fill="#2d211f" />
          <circle cx="12.5" cy="18.5" r="0.8" fill="#2d211f" />
          <circle cx="19.5" cy="18.5" r="0.8" fill="#2d211f" />
          
          <!-- Bite Hole -->
          <circle class="bite-hole" cx="14" cy="12.5" r="3.5" fill="#fff" />
          
          <!-- Spoon Group -->
          <g class="spoon-group">
            <line x1="22.5" y1="9.5" x2="30" y2="2" stroke="#8a736b" stroke-width="1.6" stroke-linecap="round" />
            <ellipse cx="21" cy="11" rx="3.5" ry="2.2" transform="rotate(-45 21 11)" fill="#ffffff" stroke="#8a736b" stroke-width="1.2" />
            <!-- Scooped flesh and seed inside spoon -->
            <circle class="scooped-flesh" cx="21" cy="11" r="2.2" fill="#ff4f68" />
            <circle class="scooped-seed" cx="21.5" cy="11.5" r="0.4" fill="#2d211f" />
          </g>
        </svg>
        <span class="nav-label">发布</span>
      </span>
    </button>
    
    <button 
      class="nav-item category-nav" 
      :class="{ active: selectedCategories.length > 0 }" 
      @click="emit('category')"
    >
      <img src="/种类.svg" class="nav-icon" alt="" />
      <span class="nav-label">分类</span>
      <span v-if="selectedCategories.length > 0" class="category-badge">{{ selectedCategories.length }}</span>
    </button>
    
    <button class="nav-item profile-nav" @click="currentUser ? emit('openProfile') : emit('openLogin')">
      <div v-if="currentUser" class="profile-avatar">{{ currentUser.avatar }}</div>
      <svg v-else viewBox="0 0 24 24" class="nav-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
      <span class="nav-label">我的</span>
    </button>
  </nav>
</template>

<style scoped src="../../css/components/mobile/BottomNav.css"></style>
