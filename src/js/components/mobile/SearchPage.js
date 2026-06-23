import { ref, computed, watch, defineComponent } from 'vue'

export default defineComponent({
  name: 'SearchPage',
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  },
  emits: ['close', 'viewDetail'],
  setup(props, { emit }) {
    const searchQuery = ref('')
    const expandedPosts = ref(new Set())
    const MAX_LENGTH = 120

    const searchResults = computed(() => {
      if (!searchQuery.value.trim()) {
        return []
      }
      const query = searchQuery.value.toLowerCase()
      return props.posts.filter(post => 
        post.content.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        (post.category && post.category.toLowerCase().includes(query))
      )
    })

    const toggleExpand = (postId) => {
      if (expandedPosts.value.has(postId)) {
        expandedPosts.value.delete(postId)
      } else {
        expandedPosts.value.add(postId)
      }
    }

    const getDisplayContent = (content) => {
      if (!content) return ''
      return content.length > MAX_LENGTH ? content.slice(0, MAX_LENGTH) : content
    }

    const isExpanded = (postId) => expandedPosts.value.has(postId)

    const shouldTruncate = (content) => content && content.length > MAX_LENGTH

    const handleKeyup = (e) => {
      if (e.key === 'Escape') {
        emit('close')
      }
    }

    watch(() => props.posts, () => {
      searchQuery.value = ''
    })

    return {
      searchQuery,
      expandedPosts,
      searchResults,
      toggleExpand,
      getDisplayContent,
      isExpanded,
      shouldTruncate,
      handleKeyup,
      emit
    }
  }
})
