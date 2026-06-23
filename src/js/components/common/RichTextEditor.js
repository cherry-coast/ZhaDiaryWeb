import '@wangeditor/editor/dist/css/style.css' // import css

import { onBeforeUnmount, ref, shallowRef, watch, defineComponent } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default defineComponent({
  name: 'RichTextEditor',
  components: {
    Editor,
    Toolbar
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    isFullScreen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
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

    return {
      editorRef,
      mode,
      valueHtml,
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange
    }
  }
})
