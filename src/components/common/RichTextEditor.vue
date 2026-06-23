<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

const props = withDefaults(defineProps<{
  modelValue?: string
  isFullScreen?: boolean
}>(), {
  modelValue: '',
  isFullScreen: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// editor instance, use shallowRef
const editorRef = shallowRef<any>()

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
const handleCreated = (editor: any) => {
  editorRef.value = editor
  if (props.isFullScreen) {
    setTimeout(() => {
      editor.focus()
    }, 100)
  }
}

const handleChange = (editor: any) => {
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
