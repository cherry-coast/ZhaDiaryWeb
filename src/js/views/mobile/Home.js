import { computed, defineComponent } from 'vue'
import PostList from '../../../components/common/PostList.vue'
import BottomNav from '../../../components/mobile/BottomNav.vue'

export default defineComponent({
  name: 'MobileHome',
  components: {
    PostList,
    BottomNav
  },
  props: {
    feedTitle: {
      type: String,
      required: true
    },
    mobileSearchQuery: {
      type: String,
      required: true
    },
    filteredPosts: {
      type: Array,
      required: true
    },
    selectedCategories: {
      type: Array,
      required: true
    },
    totalPosts: {
      type: Number,
      required: true
    },
    hasActiveFilters: {
      type: Boolean,
      required: true
    },
    currentUser: {
      type: Object,
      default: null
    }
  },
  emits: [
    'update:mobileSearchQuery',
    'submitMobileSearch',
    'toggleLike',
    'viewDetail',
    'resetHome',
    'openCategory',
    'openPostForm',
    'openLogin',
    'openProfile'
  ],
  setup(props, { emit }) {
    const localSearchQuery = computed({
      get: () => props.mobileSearchQuery,
      set: (val) => emit('update:mobileSearchQuery', val)
    })

    return {
      localSearchQuery,
      emit
    }
  }
})
