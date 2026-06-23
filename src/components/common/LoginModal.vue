<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'login'])

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
</script>

<template>
  <div v-if="visible" class="modal-overlay" @click.self="emit('close')">
    <div class="login-modal animate-slide-up">
      <div class="modal-top-fixed">
        <button class="close-btn" @click="emit('close')">×</button>
        
        <div class="modal-header">
          <div class="logo-circle">
            <img src="/吃瓜.svg" class="login-logo" alt="吃瓜日记" />
          </div>
          <h2 class="title">{{ isLoginMode ? '欢迎回到吃瓜日记' : '加入吃瓜大军' }}</h2>
          <p class="subtitle">{{ isLoginMode ? '登录你的账号，一起愉快吃瓜' : '注册新账号，发现更多热瓜' }}</p>
        </div>

        <div class="mode-toggle">
          <button 
            class="toggle-btn" 
            :class="{ active: isLoginMode }" 
            @click="isLoginMode = true"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tab-icon"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
            登录
          </button>
          <button 
            class="toggle-btn" 
            :class="{ active: !isLoginMode }" 
            @click="isLoginMode = false"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tab-icon"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
            注册
          </button>
          <div class="toggle-slider" :class="{ 'right-side': !isLoginMode }"></div>
        </div>
      </div>
      
      <div class="modal-body-scroll">
        <form class="login-form" @submit.prevent="handleSubmit">
          <transition :name="transitionName" mode="out-in">
            <div v-if="isLoginMode" class="form-content" key="login">
              <div class="input-group">
                <label for="identifier">用户名 / 邮箱</label>
                <div class="input-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="input-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <input 
                    id="identifier"
                    v-model="identifier" 
                    type="text" 
                    placeholder="请输入用户名或邮箱号"
                    required
                    class="premium-input with-icon"
                  />
                </div>
              </div>
              
              <div class="input-group">
                <label for="login-password">密码</label>
                <div class="input-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="input-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <input 
                    id="login-password"
                    v-model="password" 
                    type="password" 
                    placeholder="请输入密码"
                    required
                    class="premium-input with-icon"
                  />
                </div>
              </div>
            </div>

            <div v-else class="form-content" key="register">
              <div class="input-group">
                <label for="email">邮箱号</label>
                <div class="input-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="input-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <input 
                    id="email"
                    v-model="email" 
                    type="email" 
                    placeholder="请输入邮箱号"
                    required
                    class="premium-input with-icon"
                  />
                </div>
              </div>

              <div class="input-group">
                <label for="code">邮箱验证码</label>
                <div class="code-input-wrapper">
                  <div class="input-wrapper" style="flex: 1;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="input-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    <input 
                      id="code"
                      v-model="code" 
                      type="text" 
                      placeholder="请输入验证码"
                      required
                      class="premium-input with-icon code-input"
                    />
                  </div>
                  <button 
                    type="button" 
                    class="send-code-btn" 
                    :disabled="!email || countdown > 0"
                    @click="handleSendCode"
                  >
                    {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
                  </button>
                </div>
              </div>

              <div class="input-group">
                <label for="username">用户名</label>
                <div class="input-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="input-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <input 
                    id="username"
                    v-model="username" 
                    type="text" 
                    placeholder="请输入用户名"
                    required
                    class="premium-input with-icon"
                  />
                </div>
              </div>
              
              <div class="input-group">
                <label for="register-password">密码</label>
                <div class="input-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="input-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <input 
                    id="register-password"
                    v-model="password" 
                    type="password" 
                    placeholder="请输入密码"
                    required
                    class="premium-input with-icon"
                  />
                </div>
              </div>
            </div>
          </transition>

          <button 
            type="submit" 
            class="submit-btn" 
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="loading-spinner"></span>
            <template v-else>
              <svg v-if="isLoginMode" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
              {{ isLoginMode ? '登录' : '注册并登录' }}
            </template>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped src="./LoginModal.css"></style>
