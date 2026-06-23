import { ref, computed, defineComponent } from 'vue'
import WebHome from '../views/web/Home.vue'
import MobileHome from '../views/mobile/Home.vue'
import PostForm from '../components/common/PostForm.vue'
import PostDetail from '../components/common/PostDetail.vue'
import CategoryModal from '../components/mobile/CategoryModal.vue'
import LoginModal from '../components/common/LoginModal.vue'
import UserProfileModal from '../components/common/UserProfileModal.vue'
import { initialPosts } from '../mock/posts.js'

export default defineComponent({
  name: 'App',
  components: {
    WebHome,
    MobileHome,
    PostForm,
    PostDetail,
    CategoryModal,
    LoginModal,
    UserProfileModal
  },
  setup() {
    const posts = ref(initialPosts)
    const showPostForm = ref(false)
    const viewPostDetail = ref(null)
    const showCategoryModal = ref(false)
    const searchQuery = ref('')
    const mobileSearchQuery = ref('')
    const selectedCategories = ref([])
    const customCategories = ref([])
    const showLoginModal = ref(false)
    const showUserProfile = ref(false)
    const currentUser = ref(null)

    const totalPosts = computed(() => posts.value.length)
    const totalComments = computed(() => 
      posts.value.reduce((sum, post) => sum + post.comments.length, 0)
    )

    const allCategories = computed(() => {
      const postCategories = [...new Set(posts.value.map(p => p.category).filter(Boolean))]
      return [...customCategories.value, ...postCategories]
    })

    const postCounts = computed(() => {
      const counts = {}
      posts.value.forEach(post => {
        if (post.category) {
          counts[post.category] = (counts[post.category] || 0) + 1
        }
      })
      return counts
    })

    const filteredPosts = computed(() => {
      return posts.value.filter(post => {
        const matchSearch = !searchQuery.value || 
          post.content.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          post.author.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          (post.category && post.category.toLowerCase().includes(searchQuery.value.toLowerCase()))
        
        const postCats = post.category ? post.category.split('、') : []
        const matchCategory = selectedCategories.value.length === 0 || 
          postCats.some(cat => selectedCategories.value.includes(cat))
        
        return matchSearch && matchCategory
      })
    })

    const hasActiveFilters = computed(() => searchQuery.value || selectedCategories.value.length > 0)

    const feedTitle = computed(() => {
      if (searchQuery.value) return `搜索：${searchQuery.value}`
      if (selectedCategories.value.length > 0) return selectedCategories.value.join('、')
      return '全部热瓜'
    })

    const addPost = (postData) => {
      const newPost = {
        id: Date.now(),
        author: '匿名吃瓜者',
        avatar: '🎭',
        content: postData.content,
        category: postData.category,
        images: postData.images || [],
        melonStyle: postData.melonStyle,
        likes: 0,
        comments: [],
        createdAt: '刚刚',
        isLiked: false
      }
      posts.value.unshift(newPost)
      
      if (postData.category) {
        const cats = postData.category.split('、')
        cats.forEach(cat => {
          if (cat && !allCategories.value.includes(cat)) {
            customCategories.value.push(cat)
          }
        })
      }
      
      showPostForm.value = false
    }

    const toggleLike = (post) => {
      post.isLiked = !post.isLiked
      post.likes += post.isLiked ? 1 : -1
    }

    const addComment = (postId, content) => {
      const post = posts.value.find(p => p.id === postId)
      if (post) {
        post.comments.push({
          id: Date.now(),
          author: '匿名吃瓜者',
          content,
          likes: 0
        })
      }
    }

    const handleSearch = (query) => {
      searchQuery.value = query.trim()
      mobileSearchQuery.value = searchQuery.value
    }

    const handleCategoryConfirm = (categories) => {
      selectedCategories.value = categories
    }

    const handleDesktopCategoryToggle = (categories) => {
      selectedCategories.value = categories
    }

    const viewDetail = (post) => {
      viewPostDetail.value = post
    }

    const closeDetail = () => {
      viewPostDetail.value = null
    }

    const openPostForm = () => {
      showPostForm.value = true
    }

    const clearSearch = () => {
      searchQuery.value = ''
      mobileSearchQuery.value = ''
    }

    const clearCategories = () => {
      selectedCategories.value = []
    }

    const resetHome = () => {
      clearSearch()
      clearCategories()
    }

    const submitMobileSearch = () => {
      searchQuery.value = mobileSearchQuery.value.trim()
    }

    return {
      posts,
      showPostForm,
      viewPostDetail,
      showCategoryModal,
      searchQuery,
      mobileSearchQuery,
      selectedCategories,
      customCategories,
      showLoginModal,
      showUserProfile,
      currentUser,
      totalPosts,
      totalComments,
      allCategories,
      postCounts,
      filteredPosts,
      hasActiveFilters,
      feedTitle,
      addPost,
      toggleLike,
      addComment,
      handleSearch,
      handleCategoryConfirm,
      handleDesktopCategoryToggle,
      viewDetail,
      closeDetail,
      openPostForm,
      clearSearch,
      clearCategories,
      resetHome,
      submitMobileSearch
    }
  }
})
