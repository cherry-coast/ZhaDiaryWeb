<script setup>
import '@wangeditor/editor/dist/css/style.css' // import css

import { onBeforeUnmount, ref, shallowRef, watch, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  isFullScreen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

// editor instance, use shallowRef
const editorRef = shallowRef()

// mode
const mode = 'default' // or 'simple'

// HTML content
const valueHtml = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  if (valueHtml.value !== newVal) {
    valueHtml.value = newVal
  }
})

watch(valueHtml, (newVal) => {
  emit('update:modelValue', newVal)
})

const toolbarConfig = {
  excludeKeys: [
    'uploadImage',
    'uploadVideo',
    'fullScreen' // We will manage full screen ourselves
  ]
}

const editorConfig = { 
  placeholder: '分享你的瓜... (支持富文本输入)',
  autoFocus: false
}

// create editor callback
const handleCreated = (editor) => {
  editorRef.value = editor
  if (props.isFullScreen) {
    setTimeout(() => {
      editor.focus()
    }, 100)
  }
}

const handleChange = (editor) => {
  valueHtml.value = editor.getHtml()
}

// before unmount, destroy editor
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<template>
  <div class="rich-text-container" :class="{ 'is-fullscreen': isFullScreen }">
    <!-- Only show toolbar in full screen mode to keep the normal mode clean -->
    <Toolbar
      v-show="isFullScreen"
      style="border-bottom: 1px solid #e8e0de"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
      class="editor-toolbar"
    />
    <Editor
      class="editor-content"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<style scoped src="../../css/components/common/RichTextEditor.css"></style>
