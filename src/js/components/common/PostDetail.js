import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'PostDetail',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'addComment'],
  setup(props, { emit }) {
    const newComment = ref('')

    const addComment = () => {
      if (!newComment.value.trim()) return
      
      emit('addComment', props.post.id, newComment.value.trim())
      newComment.value = ''
    }

    const handleKeyup = (e) => {
      if (e.key === 'Enter') {
        addComment()
      }
    }

    return {
      newComment,
      addComment,
      handleKeyup,
      emit
    }
  }
})
