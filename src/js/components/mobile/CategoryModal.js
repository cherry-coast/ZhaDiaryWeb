import { ref, computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'CategoryModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    selectedCategories: {
      type: Array,
      default: () => []
    },
    allCategories: {
      type: Array,
      default: () => []
    }
  },
  emits: ['close', 'confirm'],
  setup(props, { emit }) {
    const localSelected = ref([...props.selectedCategories])
    const defaultCategories = ['情感', '日常', '办公', '娱乐', '科技', '美食', '旅行', '其他']

    const allAvailableCategories = computed(() => {
      const categories = [...new Set([...defaultCategories, ...props.allCategories])]
      return categories.sort()
    })

    const selectCategory = (cat) => {
      const index = localSelected.value.indexOf(cat)
      if (index > -1) {
        localSelected.value.splice(index, 1)
      } else {
        localSelected.value.push(cat)
      }
    }

    const isSelected = (cat) => localSelected.value.includes(cat)

    const selectAll = () => {
      localSelected.value = [...allAvailableCategories.value]
    }

    const clearAll = () => {
      localSelected.value = []
    }

    const handleConfirm = () => {
      emit('confirm', [...localSelected.value])
      emit('close')
    }

    const handleClose = () => {
      localSelected.value = [...props.selectedCategories]
      emit('close')
    }

    return {
      localSelected,
      allAvailableCategories,
      selectCategory,
      isSelected,
      selectAll,
      clearAll,
      handleConfirm,
      handleClose,
      emit
    }
  }
})
