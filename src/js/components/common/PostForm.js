import { ref, computed, defineComponent } from 'vue';
import RichTextEditor from '../../../components/common/RichTextEditor.vue';

export default defineComponent({
  name: 'PostForm',
  components: {
    RichTextEditor
  },
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  emits: ['submit', 'close'],
  setup(props, { emit }) {
    const content = ref('');
    const editorRef = ref(null);

    const textContentLength = computed(() => {
      return content.value.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').length;
    });

    const handleInput = (e) => {
      content.value = e.target.innerHTML;
    };

    const isFullScreen = ref(false);

    const toggleFullScreen = () => {
      isFullScreen.value = !isFullScreen.value;
    };

    const selectedCategories = ref([]);
    const customCategory = ref('');
    const isSubmitting = ref(false);
    const showCustomCategory = ref(false);
    const defaultCategories = ['情感', '日常', '办公', '娱乐', '科技', '美食', '旅行', '其他'];
    
    const allCategories = computed(() => {
      return [...defaultCategories, ...props.categories];
    });

    const selectedMelonIndex = ref(null);
    const selectMelon = (index) => {
      if (selectedMelonIndex.value === index) {
        selectedMelonIndex.value = null;
      } else {
        selectedMelonIndex.value = index;
      }
    };

    const melons = [
      `<svg viewBox="0 0 24 24" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#40c057"/><circle cx="12" cy="12" r="8.5" fill="#ffffff"/><circle cx="12" cy="12" r="7.5" fill="#ff4f68"/><circle cx="12" cy="8" r="0.8" fill="#2d211f"/><circle cx="9" cy="13" r="0.8" fill="#2d211f"/><circle cx="15" cy="13" r="0.8" fill="#2d211f"/><circle cx="10.5" cy="10" r="0.8" fill="#2d211f"/><circle cx="13.5" cy="10" r="0.8" fill="#2d211f"/><circle cx="12" cy="15" r="0.8" fill="#2d211f"/></svg>`,
      `<svg viewBox="0 0 24 24" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(-10 12 12)"><path d="M 2 12 A 10 10 0 0 0 22 12 Z" fill="#40c057"/><path d="M 3.5 12 A 8.5 8.5 0 0 0 20.5 12 Z" fill="#ffffff"/><path d="M 4.5 12 A 7.5 7.5 0 0 0 19.5 12 Z" fill="#ff4f68"/><circle cx="9" cy="15" r="0.8" fill="#2d211f"/><circle cx="15" cy="15" r="0.8" fill="#2d211f"/><circle cx="12" cy="17" r="0.8" fill="#2d211f"/></g></svg>`,
      `<svg viewBox="0 0 24 24" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(15 12 12)"><path d="M 12 12 L 3.34 17 A 10 10 0 0 0 20.66 17 Z" fill="#40c057"/><path d="M 12 12 L 4.64 16.25 A 8.5 8.5 0 0 0 19.36 16.25 Z" fill="#ffffff"/><path d="M 12 12 L 5.5 15.75 A 7.5 7.5 0 0 0 18.5 15.75 Z" fill="#ff4f68"/><circle cx="12" cy="16.5" r="0.8" fill="#2d211f"/><circle cx="9.5" cy="14.5" r="0.8" fill="#2d211f"/><circle cx="14.5" cy="14.5" r="0.8" fill="#2d211f"/></g></svg>`,
      `<svg viewBox="0 0 24 24" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(-20 12 12)"><path d="M 12 12 L 4.93 19.07 A 10 10 0 0 0 19.07 19.07 Z" fill="#40c057"/><path d="M 12 12 L 5.99 18.01 A 8.5 8.5 0 0 0 18.01 18.01 Z" fill="#ffffff"/><path d="M 12 12 L 6.7 17.3 A 7.5 7.5 0 0 0 17.3 17.3 Z" fill="#ff4f68"/><circle cx="12" cy="17.5" r="0.8" fill="#2d211f"/><circle cx="9.5" cy="16" r="0.8" fill="#2d211f"/><circle cx="14.5" cy="16" r="0.8" fill="#2d211f"/></g></svg>`
    ];

    const handleSubmit = () => {
      if (!textContentLength.value)
        return;
      
      const cats = [...selectedCategories.value];
      if (showCustomCategory.value && customCategory.value.trim()) {
        cats.push(customCategory.value.trim());
      }
      
      const category = cats.join('、');
      
      isSubmitting.value = true;
      setTimeout(() => {
        emit('submit', {
          content: content.value,
          category,
          melonStyle: selectedMelonIndex.value
        });
        content.value = '';
        selectedCategories.value = [];
        customCategory.value = '';
        showCustomCategory.value = false;
        selectedMelonIndex.value = null;
        isSubmitting.value = false;
      }, 500);
    };

    const selectCategory = (cat) => {
      if (cat === '自定义') {
        showCustomCategory.value = !showCustomCategory.value;
        if (!showCustomCategory.value) {
          customCategory.value = '';
        }
      } else {
        const idx = selectedCategories.value.indexOf(cat);
        if (idx > -1) {
          selectedCategories.value.splice(idx, 1);
        } else {
          selectedCategories.value.push(cat);
        }
      }
    };

    return {
      content,
      editorRef,
      textContentLength,
      handleInput,
      isFullScreen,
      toggleFullScreen,
      selectedCategories,
      customCategory,
      isSubmitting,
      showCustomCategory,
      allCategories,
      selectedMelonIndex,
      selectMelon,
      melons,
      handleSubmit,
      selectCategory,
      emit
    }
  }
})
