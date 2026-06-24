<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import type { User } from '@/types'
import { message } from '@/utils/message'
import { sendCode as apiSendCode, uploadAvatar as apiUploadAvatar, updateUserInfo as apiUpdateUserInfo } from '@/api/auth'

const props = withDefaults(defineProps<{
  visible?: boolean
  user?: User
}>(), {
  visible: false,
  user: () => ({} as User)
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'updateUser', user: User): void
}>()

const avatars = ['🍉', '🐹', '🎭', '🦄', '🐶', '🐱', '🐼', '🦊', '🐰', '🦁', '🐸']
const selectedAvatar = ref('')
const uploadedUrl = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

const newUsername = ref('')
const email = ref('')
const code = ref('')
const newPassword = ref('')

const isSubmitting = ref(false)
const countdown = ref(0)
let timer: any = null

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const validateEmail = (val: string): boolean => {
  return EMAIL_REGEX.test(val)
}

const updateCountdown = () => {
  if (!email.value) {
    countdown.value = 0
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    return
  }

  const key = `send_code_timer_${email.value}_profile`
  const expireTimeStr = localStorage.getItem(key)
  if (expireTimeStr) {
    const expireTime = parseInt(expireTimeStr, 10)
    const remaining = Math.ceil((expireTime - Date.now()) / 1000)
    if (remaining > 0) {
      countdown.value = remaining
      if (!timer) {
        timer = setInterval(() => {
          const rem = Math.ceil((expireTime - Date.now()) / 1000)
          if (rem <= 0) {
            countdown.value = 0
            clearInterval(timer)
            timer = null
          } else {
            countdown.value = rem
          }
        }, 1000)
      }
      return
    }
  }

  countdown.value = 0
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

watch(() => props.visible, (newVal) => {
  if (newVal && props.user) {
    selectedAvatar.value = props.user.avatar || '🍉'
    
    // Check if the current user avatar is a custom image (not one of the emojis)
    if (props.user.avatar && !avatars.includes(props.user.avatar)) {
      uploadedUrl.value = props.user.avatar
    } else {
      uploadedUrl.value = ''
    }
    
    newUsername.value = props.user.username || ''
    email.value = ''
    code.value = ''
    newPassword.value = ''
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    countdown.value = 0
  }
})

watch(email, () => {
  updateCountdown()
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})

const handleSendCode = async () => {
  if (!email.value || countdown.value > 0) return

  const trimmedEmail = email.value.trim()
  if (!validateEmail(trimmedEmail)) {
    message.warning('请输入有效的邮箱地址')
    return
  }

  isSubmitting.value = true
  try {
    await apiSendCode({ email: trimmedEmail, type: 3 })
    message.success('验证码发送成功，请查收邮件')

    const expireTime = Date.now() + 120000
    localStorage.setItem(`send_code_timer_${trimmedEmail}_profile`, expireTime.toString())
    updateCountdown()
  } catch (error: any) {
    message.error(error.message || '发送验证码失败')
  } finally {
    isSubmitting.value = false
  }
}

const triggerUpload = () => {
  if (uploadedUrl.value) {
    selectedAvatar.value = uploadedUrl.value
  }
  fileInput.value?.click()
}

const handleFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (file.size > 5 * 1024 * 1024) {
    message.warning('上传图片大小不能超过 5MB')
    return
  }

  isSubmitting.value = true
  try {
    const response = await apiUploadAvatar(file)
    const url = response.data
    uploadedUrl.value = url
    selectedAvatar.value = url
    message.success('头像上传成功')
  } catch (error: any) {
    message.error(error.message || '上传头像失败')
  } finally {
    isSubmitting.value = false
    if (target) target.value = ''
  }
}

const handleSave = async () => {
  const trimmedUsername = newUsername.value.trim()
  if (!trimmedUsername) {
    message.warning('用户名不能为空')
    return
  }
  if (trimmedUsername.length > 20) {
    message.warning('用户名长度不能超过20个字符')
    return
  }

  const hasPasswordInput = !!newPassword.value || !!email.value || !!code.value
  const e = email.value.trim()
  const c = code.value.trim()
  const p = newPassword.value

  if (hasPasswordInput) {
    if (!e) {
      message.warning('请输入邮箱号')
      return
    }
    if (!validateEmail(e)) {
      message.warning('请输入有效的邮箱地址')
      return
    }
    if (!c) {
      message.warning('请输入验证码')
      return
    }
    if (!p) {
      message.warning('请输入新密码')
      return
    }
    if (p.length > 20) {
      message.warning('新密码长度不能超过20个字符')
      return
    }
  }

  isSubmitting.value = true
  
  try {
    const param = {
      username: trimmedUsername,
      avatar: selectedAvatar.value,
      password: hasPasswordInput ? p : undefined,
      email: hasPasswordInput ? e : undefined,
      code: hasPasswordInput ? c : undefined
    }

    await apiUpdateUserInfo(param)
    
    message.success('保存成功')
    
    const updatedUser = {
      ...props.user,
      username: trimmedUsername,
      avatar: selectedAvatar.value
    }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    emit('updateUser', updatedUser)
    emit('close')
  } catch (error: any) {
    message.error(error.message || '更新个人信息失败')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div v-if="visible" class="modal-overlay">
    <div class="profile-modal animate-slide-up">
      <div class="modal-top-fixed">
        <button class="close-btn" @click="$emit('close')">×</button>
        
        <div class="modal-header">
          <h2 class="title">个人信息设置</h2>
          <p class="subtitle">修改你的专属吃瓜头像和密码</p>
        </div>
      </div>
 
      <div class="modal-body-scroll">
        <div class="settings-content">
          <!-- Avatar Selection -->
          <div class="setting-section">
            <h3 class="section-title">选择头像</h3>
            <div class="avatar-grid">
              <div 
                v-for="avatar in avatars" 
                :key="avatar"
                class="avatar-item"
                :class="{ active: selectedAvatar === avatar }"
                @click="selectedAvatar = avatar"
              >
                {{ avatar }}
              </div>
              
              <!-- Upload Custom Avatar Cell -->
              <div 
                class="avatar-item upload-cell"
                :class="{ active: selectedAvatar === uploadedUrl && uploadedUrl }"
                @click="triggerUpload"
              >
                <img v-if="uploadedUrl" :src="uploadedUrl" class="uploaded-img" alt="Avatar" />
                <span v-else class="upload-plus">+</span>
                <input 
                  type="file" 
                  ref="fileInput" 
                  style="display: none;" 
                  accept="image/*"
                  @change="handleFileChange"
                />
              </div>
            </div>
          </div>
 
          <!-- Username Change -->
          <div class="setting-section">
            <h3 class="section-title">修改用户名</h3>
            <div class="password-form">
              <div class="input-group">
                <label for="profile-username">新用户名</label>
                <input 
                  id="profile-username"
                  v-model="newUsername" 
                  type="text" 
                  placeholder="请输入新用户名"
                  maxlength="20"
                  class="premium-input"
                />
              </div>
            </div>
          </div>

          <!-- Password Change -->
          <div class="setting-section">
            <h3 class="section-title">修改密码 (选填)</h3>
            <div class="password-form">
              <div class="input-group">
                <label for="profile-email">邮箱号</label>
                <input 
                  id="profile-email"
                  v-model="email" 
                  type="email" 
                  placeholder="请输入邮箱号"
                  class="premium-input"
                />
              </div>
              
              <div class="input-group">
                <label for="profile-code">邮箱验证码</label>
                <div class="code-input-wrapper">
                  <input 
                    id="profile-code"
                    v-model="code" 
                    type="text" 
                    placeholder="请输入验证码"
                    class="premium-input"
                    style="flex: 1;"
                  />
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
                <label for="new-pwd">新密码</label>
                <input 
                  id="new-pwd"
                  v-model="newPassword" 
                  type="password" 
                  placeholder="请输入新密码"
                  maxlength="20"
                  class="premium-input"
                />
              </div>
            </div>
          </div>
        </div>
 
        <button 
          class="save-btn" 
          :disabled="isSubmitting"
          @click="handleSave"
        >
          <span v-if="isSubmitting" class="loading-spinner"></span>
          <span v-else>保存修改</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped src="../../css/components/common/UserProfileModal.css"></style>
