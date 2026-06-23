<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  visible?: boolean
  selectedCategories?: string[]
  allCategories?: string[]
}>(), {
  visible: false,
  selectedCategories: () => [],
  allCategories: () => []
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm', categories: string[]): void
}>()

const localSelected = ref<string[]>([...props.selectedCategories])
const defaultCategories = ['情感', '日常', '办公', '娱乐', '科技', '美食', '旅行', '其他']

const allAvailableCategories = computed(() => {
  const categories = [...new Set([...defaultCategories, ...props.allCategories])]
  return categories.sort()
})

const selectCategory = (cat: string) => {
  const index = localSelected.value.indexOf(cat)
  if (index > -1) {
    localSelected.value.splice(index, 1)
  } else {
    localSelected.value.push(cat)
  }
}

const isSelected = (cat: string) => localSelected.value.includes(cat)

const selectAll = () => {
  localSelected.value = [...allAvailableCategories.value]
}

const clearAll = () => {
  localSelected.value = []
}

const handleConfirm = () => {
  emit('confirm', [...localSelected.value])
  emit('close')
}

const handleClose = () => {
  localSelected.value = [...props.selectedCategories]
  emit('close')
}
</script>

<template>
  <Transition name="modal">
    <div v-if="visible" class="category-modal-overlay" @click.self="handleClose">
      <div class="category-modal">
        <div class="modal-header">
          <h3 class="modal-title">🍉 选择分类</h3>
          <button class="close-btn" @click="handleClose">
            <svg viewBox="0 0 24 24" class="close-icon">
              <path 
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" 
                fill="#ff4f68"
              />
            </svg>
          </button>
        </div>
        
        <div class="modal-actions">
          <button class="action-btn" @click="selectAll">全选</button>
          <button class="action-btn" @click="clearAll">清除</button>
        </div>
        
        <div class="category-grid">
          <button 
            v-for="cat in allAvailableCategories" 
            :key="cat"
            class="category-item"
            :class="{ selected: isSelected(cat) }"
            @click="selectCategory(cat)"
          >
            <span class="category-name">{{ cat }}</span>
            <svg 
              v-if="isSelected(cat)" 
              viewBox="0 0 24 24" 
              class="check-icon"
            >
              <path 
                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" 
                fill="#fff"
              />
            </svg>
          </button>
        </div>
        
        <div class="modal-footer">
          <button class="confirm-btn" @click="handleConfirm">
            确定 ({{ localSelected.length }})
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../../css/components/mobile/CategoryModal.css"></style>
