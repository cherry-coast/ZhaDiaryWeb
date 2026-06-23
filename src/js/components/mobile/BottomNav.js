import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BottomNav',
  props: {
    selectedCategories: {
      type: Array,
      default: () => []
    },
    totalPosts: {
      type: Number,
      default: 0
    },
    hasActiveFilters: {
      type: Boolean,
      default: false
    },
    currentUser: {
      type: Object,
      default: null
    }
  },
  emits: ['home', 'category', 'post', 'openLogin', 'openProfile'],
  setup(props, { emit }) {
    return {
      emit
    }
  }
})
