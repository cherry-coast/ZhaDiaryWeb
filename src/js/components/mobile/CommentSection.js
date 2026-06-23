import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'CommentSection',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  emits: ['addComment', 'close'],
  setup(props, { emit }) {
    const commentContent = ref('')
    const isSubmitting = ref(false)

    const handleSubmit = () => {
      if (!commentContent.value.trim()) return
      
      isSubmitting.value = true
      
      setTimeout(() => {
        emit('addComment', props.post.id, commentContent.value.trim())
        commentContent.value = ''
        isSubmitting.value = false
      }, 300)
    }

    return {
      commentContent,
      isSubmitting,
      handleSubmit,
      emit
    }
  }
})
