<script src="../../js/components/common/RichTextEditor.js"></script>

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
