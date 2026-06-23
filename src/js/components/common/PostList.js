import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'PostList',
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  emits: ['toggleLike', 'viewDetail'],
  setup(props, { emit }) {
    const expandedPosts = ref(new Set())
    const MAX_LENGTH = 120

    const melons = [
      `<svg viewBox="0 0 24 24" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#40c057"/><circle cx="12" cy="12" r="8.5" fill="#ffffff"/><circle cx="12" cy="12" r="7.5" fill="#ff4f68"/><circle cx="12" cy="8" r="0.8" fill="#2d211f"/><circle cx="9" cy="13" r="0.8" fill="#2d211f"/><circle cx="15" cy="13" r="0.8" fill="#2d211f"/><circle cx="10.5" cy="10" r="0.8" fill="#2d211f"/><circle cx="13.5" cy="10" r="0.8" fill="#2d211f"/><circle cx="12" cy="15" r="0.8" fill="#2d211f"/></svg>`,
      `<svg viewBox="0 0 24 24" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(-10 12 12)"><path d="M 2 12 A 10 10 0 0 0 22 12 Z" fill="#40c057"/><path d="M 3.5 12 A 8.5 8.5 0 0 0 20.5 12 Z" fill="#ffffff"/><path d="M 4.5 12 A 7.5 7.5 0 0 0 19.5 12 Z" fill="#ff4f68"/><circle cx="9" cy="15" r="0.8" fill="#2d211f"/><circle cx="15" cy="15" r="0.8" fill="#2d211f"/><circle cx="12" cy="17" r="0.8" fill="#2d211f"/></g></svg>`,
      `<svg viewBox="0 0 24 24" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(15 12 12)"><path d="M 12 12 L 3.34 17 A 10 10 0 0 0 20.66 17 Z" fill="#40c057"/><path d="M 12 12 L 4.64 16.25 A 8.5 8.5 0 0 0 19.36 16.25 Z" fill="#ffffff"/><path d="M 12 12 L 5.5 15.75 A 7.5 7.5 0 0 0 18.5 15.75 Z" fill="#ff4f68"/><circle cx="12" cy="16.5" r="0.8" fill="#2d211f"/><circle cx="9.5" cy="14.5" r="0.8" fill="#2d211f"/><circle cx="14.5" cy="14.5" r="0.8" fill="#2d211f"/></g></svg>`,
      `<svg viewBox="0 0 24 24" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(-20 12 12)"><path d="M 12 12 L 4.93 19.07 A 10 10 0 0 0 19.07 19.07 Z" fill="#40c057"/><path d="M 12 12 L 5.99 18.01 A 8.5 8.5 0 0 0 18.01 18.01 Z" fill="#ffffff"/><path d="M 12 12 L 6.7 17.3 A 7.5 7.5 0 0 0 17.3 17.3 Z" fill="#ff4f68"/><circle cx="12" cy="17.5" r="0.8" fill="#2d211f"/><circle cx="9.5" cy="16" r="0.8" fill="#2d211f"/><circle cx="14.5" cy="16" r="0.8" fill="#2d211f"/></g></svg>`
    ]

    const getMelonIcon = (postOrId) => {
      // Handles both post objects and simple IDs
      const post = typeof postOrId === 'object' ? postOrId : { id: postOrId };
      if (post.melonStyle !== undefined && post.melonStyle !== null) {
        return melons[post.melonStyle]
      }
      const index = post.id % melons.length
      return melons[index]
    }

    const toggleExpand = (postId) => {
      if (expandedPosts.value.has(postId)) {
        expandedPosts.value.delete(postId)
      } else {
        expandedPosts.value.add(postId)
      }
    }

    const getStrippedContent = (content) => {
      if (!content) return ''
      return content.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ')
    }

    const getDisplayContent = (content) => {
      if (!content) return ''
      const stripped = getStrippedContent(content)
      return stripped.length > MAX_LENGTH ? stripped.slice(0, MAX_LENGTH) : stripped
    }

    const isExpanded = (postId) => expandedPosts.value.has(postId)

    const shouldTruncate = (content) => {
      if (!content) return false
      return getStrippedContent(content).length > MAX_LENGTH
    }

    return {
      expandedPosts,
      melons,
      getMelonIcon,
      toggleExpand,
      getStrippedContent,
      getDisplayContent,
      isExpanded,
      shouldTruncate,
      emit
    }
  }
})
