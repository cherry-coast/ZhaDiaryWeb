import { ref, watch, defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'login'],
  setup(props, { emit }) {
    const isLoginMode = ref(true)
    const transitionName = ref('slide-right')

    const identifier = ref('') // Username or Email for Login
    const password = ref('')
    const email = ref('')
    const code = ref('')
    const username = ref('')

    const isSubmitting = ref(false)
    const countdown = ref(0)
    let timer = null

    // Reset form when modal opens or mode changes
    const resetForm = () => {
      identifier.value = ''
      password.value = ''
      email.value = ''
      code.value = ''
      username.value = ''
      isSubmitting.value = false
      if (timer) {
        clearInterval(timer)
        countdown.value = 0
      }
    }

    watch(() => props.visible, (newVal) => {
      if (newVal) {
        isLoginMode.value = true
        transitionName.value = 'slide-right'
        resetForm()
      }
    })

    watch(isLoginMode, (newVal) => {
      transitionName.value = newVal ? 'slide-right' : 'slide-left'
      resetForm()
    })

    const handleSendCode = () => {
      if (!email.value || countdown.value > 0) return
      
      // Start countdown
      countdown.value = 60
      timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          clearInterval(timer)
        }
      }, 1000)
    }

    const handleSubmit = () => {
      if (isLoginMode.value) {
        if (!identifier.value.trim() || !password.value.trim()) return
      } else {
        if (!email.value.trim() || !code.value.trim() || !username.value.trim() || !password.value.trim()) return
      }
      
      isSubmitting.value = true
      
      // Mock API call
      setTimeout(() => {
        isSubmitting.value = false
        emit('login', {
          username: isLoginMode.value ? (identifier.value.includes('@') ? identifier.value.split('@')[0] : identifier.value) : username.value,
          avatar: '🍉', // Mock default avatar
          isLoggedIn: true
        })
        emit('close')
      }, 1000)
    }

    return {
      isLoginMode,
      transitionName,
      identifier,
      password,
      email,
      code,
      username,
      isSubmitting,
      countdown,
      handleSendCode,
      handleSubmit,
      emit
    }
  }
})
