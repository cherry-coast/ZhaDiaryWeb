<script setup lang="ts">
import { computed } from 'vue'
import PostList from '@/components/common/PostList.vue'
import BottomNav from '@/components/mobile/BottomNav.vue'
import type { Post, User } from '@/types'

const props = withDefaults(defineProps<{
  feedTitle: string
  mobileSearchQuery: string
  filteredPosts: Post[]
  selectedCategories: string[]
  totalPosts: number
  hasActiveFilters: boolean
  currentUser?: User | null
}>(), {
  currentUser: null
})

const emit = defineEmits<{
  (e: 'update:mobileSearchQuery', val: string): void
  (e: 'submitMobileSearch'): void
  (e: 'toggleLike', post: Post): void
  (e: 'viewDetail', post: Post): void
  (e: 'resetHome'): void
  (e: 'openCategory'): void
  (e: 'openPostForm'): void
  (e: 'openLogin'): void
  (e: 'openProfile'): void
}>()

const localSearchQuery = computed({
  get: () => props.mobileSearchQuery,
  set: (val) => emit('update:mobileSearchQuery', val)
})
</script>

<template>
  <div class="mobile-layout">
    <header class="mobile-topbar">
      <div class="mobile-brand">
        <img src="/吃瓜.svg" class="mobile-logo" alt="吃瓜日记" />
        <div>
          <h1>吃瓜日记</h1>
          <p>{{ feedTitle }}</p>
        </div>
      </div>
      <form class="mobile-search" @submit.prevent="$emit('submitMobileSearch')">
        <input
          v-model="localSearchQuery"
          type="search"
          placeholder="搜索瓜、作者或分类"
        />
        <button type="submit">搜索</button>
      </form>
    </header>

    <main class="main-content">
      <PostList 
        :posts="filteredPosts"
        @toggleLike="post => $emit('toggleLike', post)"
        @viewDetail="post => $emit('viewDetail', post)"
      />
    </main>
    
    <BottomNav 
      :selectedCategories="selectedCategories"
      :totalPosts="totalPosts"
      :hasActiveFilters="hasActiveFilters"
      :currentUser="currentUser"
      @home="$emit('resetHome')"
      @category="$emit('openCategory')"
      @post="$emit('openPostForm')"
      @openLogin="$emit('openLogin')"
      @openProfile="$emit('openProfile')"
    />
  </div>
</template>
