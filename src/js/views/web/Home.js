import { defineComponent } from 'vue'
import Header from '../../../components/web/Header.vue'
import CategorySidebar from '../../../components/web/CategorySidebar.vue'
import PostList from '../../../components/common/PostList.vue'

export default defineComponent({
  name: 'WebHome',
  components: {
    Header,
    CategorySidebar,
    PostList
  },
  props: {
    totalPosts: {
      type: Number,
      required: true
    },
    totalComments: {
      type: Number,
      required: true
    },
    allCategories: {
      type: Array,
      required: true
    },
    selectedCategories: {
      type: Array,
      required: true
    },
    filteredPosts: {
      type: Array,
      required: true
    },
    currentUser: {
      type: Object,
      default: null
    },
    postCounts: {
      type: Object,
      required: true
    }
  },
  emits: [
    'openPostForm',
    'search',
    'openLogin',
    'openProfile',
    'logout',
    'toggleCategory',
    'toggleLike',
    'viewDetail'
  ],
  setup(props, { emit }) {
    return {
      emit
    }
  }
})
