import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'Header',
  props: {
    totalPosts: {
      type: Number,
      default: 0
    },
    totalComments: {
      type: Number,
      default: 0
    },
    categories: {
      type: Array,
      default: () => []
    },
    selectedCategories: {
      type: Array,
      default: () => []
    },
    filteredCount: {
      type: Number,
      default: 0
    },
    currentUser: {
      type: Object,
      default: null
    }
  },
  emits: ['openPostForm', 'search', 'filterCategory', 'openLogin', 'logout', 'openProfile'],
  setup(props, { emit }) {
    const searchQuery = ref('')

    const handleSearch = () => {
      emit('search', searchQuery.value.trim())
    }

    const handleKeyup = (e) => {
      if (e.key === 'Enter') {
        handleSearch()
      }
    }

    return {
      searchQuery,
      handleSearch,
      handleKeyup,
      emit
    }
  }
})
