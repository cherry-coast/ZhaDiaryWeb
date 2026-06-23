import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'CategorySidebar',
  props: {
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
  },
  emits: ['toggleCategory'],
  setup(props, { emit }) {
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

    return {
      allAvailableCategories,
      isSelected,
      getPostCount,
      toggleCategory,
      emit
    }
  }
})
