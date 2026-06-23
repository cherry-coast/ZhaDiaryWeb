import { ref, watch, defineComponent } from 'vue'

export default defineComponent({
  name: 'UserProfileModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['close', 'updateUser'],
  setup(props, { emit }) {
    const avatars = ['🍉', '🐹', '🥒', '🎭', '🦄', '🐶', '🐱', '🐼', '🦊', '🐰', '🦁', '🐸']
    const selectedAvatar = ref('')

    const oldPassword = ref('')
    const newPassword = ref('')
    const confirmPassword = ref('')

    const isSubmitting = ref(false)

    watch(() => props.visible, (newVal) => {
      if (newVal && props.user) {
        selectedAvatar.value = props.user.avatar || '🍉'
        oldPassword.value = ''
        newPassword.value = ''
        confirmPassword.value = ''
      }
    })

    const handleSave = () => {
      // Basic validation if trying to change password
      if (newPassword.value || confirmPassword.value) {
        if (!oldPassword.value) {
          alert('请输入原密码')
          return
        }
        if (newPassword.value !== confirmPassword.value) {
          alert('两次输入的新密码不一致')
          return
        }
      }

      isSubmitting.value = true
      
      // Mock API call to update user
      setTimeout(() => {
        isSubmitting.value = false
        emit('updateUser', {
          ...props.user,
          avatar: selectedAvatar.value
          // Note: In a real app, password changes are handled securely on backend
        })
        emit('close')
      }, 800)
    }

    return {
      avatars,
      selectedAvatar,
      oldPassword,
      newPassword,
      confirmPassword,
      isSubmitting,
      handleSave,
      emit
    }
  }
})
