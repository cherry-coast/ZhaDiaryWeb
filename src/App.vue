<script setup>
import { ref, computed } from 'vue'
import WebHome from './views/web/Home.vue'
import MobileHome from './views/mobile/Home.vue'
import PostForm from './components/common/PostForm.vue'
import PostDetail from './components/common/PostDetail.vue'
import CategoryModal from './components/mobile/CategoryModal.vue'
import LoginModal from './components/common/LoginModal.vue'
import UserProfileModal from './components/common/UserProfileModal.vue'

const posts = ref([
  {
    id: 1,
    author: '吃瓜小王子',
    avatar: '🍉',
    content: '今天娱乐圈又爆大瓜了！听说某顶流要官宣了？大家怎么看？我觉得这次的瓜有点大啊，不知道是真是假。希望是真的吧，这样又有新瓜可以吃了！',
    category: '娱乐',
    images: [],
    likes: 128,
    comments: [
      { id: 1, author: '猹猹一号', content: '真的假的？我不信！', likes: 23 },
      { id: 2, author: '瓜田里的猹', content: '坐等实锤！', likes: 15 }
    ],
    createdAt: '2分钟前',
    isLiked: false
  },
  {
    id: 2,
    author: '猹中之王',
    avatar: '🐹',
    content: '刚吃完一个大瓜，现在还意犹未尽...有没有新瓜可以吃？最近的瓜都不太甜，希望能有个甜一点的瓜让我好好尝尝！',
    category: '日常',
    images: [],
    likes: 89,
    comments: [
      { id: 3, author: '吃瓜群众', content: '同求同求！', likes: 8 },
      { id: 4, author: '资深瓜农', content: '明天有大瓜，记得来看！', likes: 45 }
    ],
    createdAt: '15分钟前',
    isLiked: true
  },
  {
    id: 3,
    author: '瓜农小李',
    avatar: '🥒',
    content: '分享一个冷知识：猹其实是一种动物，不是吃瓜专用词哦！猹是獾的一种，鲁迅先生的《故乡》里有提到过。没想到吧，原来我们都是在学闰土吃瓜！',
    category: '日常',
    images: [],
    likes: 256,
    comments: [
      { id: 5, author: '涨知识了', content: '原来如此！', likes: 12 },
      { id: 6, author: '好奇宝宝', content: '那猹到底是什么动物？', likes: 3 }
    ],
    createdAt: '1小时前',
    isLiked: false
  },
  {
    id: 4,
    author: '情感大师',
    avatar: '💔',
    content: '今天心情不太好，感觉有点emo。工作压力好大，感情也不太顺利。有没有人来安慰一下我？或者给我讲个笑话也行啊！',
    category: '情感',
    images: [],
    likes: 45,
    comments: [
      { id: 7, author: '暖心小天使', content: '抱抱你！一切都会好起来的！', likes: 28 },
      { id: 8, author: '乐观主义者', content: '明天会更好！', likes: 19 }
    ],
    createdAt: '2小时前',
    isLiked: false
  },
  {
    id: 5,
    author: '打工人小张',
    avatar: '💼',
    content: '今天又加班到很晚，好累啊！什么时候才能不加班？感觉身体被掏空了。但是为了生活，还是得继续努力啊！加油，打工人！',
    category: '办公',
    images: [],
    likes: 167,
    comments: [
      { id: 9, author: '同是打工人', content: '加油！我们都是打工人！', likes: 56 },
      { id: 10, author: '过来人', content: '注意身体！', likes: 34 }
    ],
    createdAt: '3小时前',
    isLiked: true
  },
  {
    id: 6,
    author: '美食家小王',
    avatar: '🍜',
    content: '今天做了一道红烧肉，超级好吃！肥而不腻，入口即化。有没有想学的？我可以分享教程！今天做了一道红烧肉，超级好吃！肥而不腻，入口即化。有没有想学的？我可以分享教程！今天做了一道红烧肉，超级好吃！肥而不腻，入口即化。有没有想学的？我可以分享教程！今天做了一道红烧肉，超级好吃！肥而不腻，入口即化。有没有想学的？我可以分享教程！今天做了一道红烧肉，超级好吃！肥而不腻，入口即化。有没有想学的？我可以分享教程！今天做了一道红烧肉，超级好吃！肥而不腻，入口即化。有没有想学的？我可以分享教程！今天做了一道红烧肉，超级好吃！肥而不腻，入口即化。有没有想学的？我可以分享教程！今天做了一道红烧肉，超级好吃！肥而不腻，入口即化。有没有想学的？我可以分享教程！今天做了一道红烧肉，超级好吃！肥而不腻，入口即化。有没有想学的？我可以分享教程！今天做了一道红烧肉，超级好吃！肥而不腻，入口即化。有没有想学的？我可以分享教程！今天做了一道红烧肉，超级好吃！肥而不腻，入口即化。有没有想学的？我可以分享教程！今天做了一道红烧肉，超级好吃！肥而不腻，入口即化。有没有想学的？我可以分享教程！',
    category: '美食',
    images: [],
    likes: 312,
    comments: [
      { id: 11, author: '吃货一枚', content: '看起来好好吃！求教程！', likes: 89 },
      { id: 12, author: '厨房小白', content: '想学想学！', likes: 45 }
    ],
    createdAt: '4小时前',
    isLiked: false
  },
  {
    id: 7,
    author: '旅行达人',
    avatar: '✈️',
    content: '刚刚从云南回来，那里的风景真的太美了！洱海的水清澈见底，苍山的雪皑皑生辉。推荐大家一定要去一次！',
    category: '旅行',
    images: [],
    likes: 423,
    comments: [
      { id: 13, author: '向往旅行', content: '好想去！', likes: 67 },
      { id: 14, author: '去过的人', content: '确实很美！', likes: 32 }
    ],
    createdAt: '5小时前',
    isLiked: false
  },
  {
    id: 8,
    author: '科技爱好者',
    avatar: '🤖',
    content: '最新发布的iPhone 16 Pro真的太酷了！A18芯片性能超强，钛合金边框手感一流。就是价格有点贵啊...',
    category: '科技',
    images: [],
    likes: 567,
    comments: [
      { id: 15, author: '果粉', content: '已经预定了！', likes: 128 },
      { id: 16, author: '理性消费', content: '等等党永不为奴！', likes: 89 }
    ],
    createdAt: '6小时前',
    isLiked: true
  }
])

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
</script>

<template>
  <div class="app-container">
    <div class="main-view">
      <WebHome
        :totalPosts="totalPosts"
        :totalComments="totalComments"
        :allCategories="allCategories"
        :selectedCategories="selectedCategories"
        :filteredPosts="filteredPosts"
        :currentUser="currentUser"
        :postCounts="postCounts"
        @openPostForm="openPostForm"
        @search="handleSearch"
        @openLogin="showLoginModal = true"
        @openProfile="showUserProfile = true"
        @logout="currentUser = null"
        @toggleCategory="handleDesktopCategoryToggle"
        @toggleLike="toggleLike"
        @viewDetail="viewDetail"
      />
      
      <MobileHome
        :feedTitle="feedTitle"
        v-model:mobileSearchQuery="mobileSearchQuery"
        :filteredPosts="filteredPosts"
        :selectedCategories="selectedCategories"
        :totalPosts="totalPosts"
        :hasActiveFilters="hasActiveFilters"
        :currentUser="currentUser"
        @submitMobileSearch="submitMobileSearch"
        @toggleLike="toggleLike"
        @viewDetail="viewDetail"
        @resetHome="resetHome"
        @openCategory="showCategoryModal = true"
        @openPostForm="openPostForm"
        @openLogin="showLoginModal = true"
        @openProfile="showUserProfile = true"
      />
    </div>

    <PostForm 
      v-if="showPostForm"
      :categories="allCategories"
      @submit="addPost"
      @close="showPostForm = false"
    />

    <PostDetail
      v-if="viewPostDetail"
      :post="viewPostDetail"
      @addComment="addComment"
      @close="closeDetail"
    />

    <CategoryModal
      :visible="showCategoryModal"
      :selectedCategories="selectedCategories"
      :allCategories="allCategories"
      @close="showCategoryModal = false"
      @confirm="handleCategoryConfirm"
    />

    <LoginModal
      :visible="showLoginModal"
      @close="showLoginModal = false"
      @login="user => currentUser = user"
    />

    <UserProfileModal
      :visible="showUserProfile"
      :user="currentUser || {}"
      @close="showUserProfile = false"
      @updateUser="user => currentUser = user"
    />
  </div>
</template>

<style src="./App.css"></style>
