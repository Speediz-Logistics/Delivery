<script setup>
import {Offcanvas} from "bootstrap";
import {onMounted, onUnmounted, ref, reactive} from 'vue';

const offcanvasRef = ref();
let bsOffcanvas = null;

const data = reactive({
  title: '',
  content: '',
});

const props = defineProps({
  id: {type: String, default: 'offcanvas'}, // Default id as 'offcanvas'
});

const show = () => {
  console.log('show');
  Offcanvas.getOrCreateInstance(document.querySelector('#' + props.id)).show();
};

const hide = () => {
  Offcanvas.getOrCreateInstance(document.querySelector('#' + props.id)).hide();
};

const toggle = () => {
  Offcanvas.getOrCreateInstance(document.querySelector('#' + props.id)).toggle();
};

const updateContent = (updatedData) => {
  Object.keys(data).forEach((key) => {
    data[key] = updatedData[key];
  });
};

const isShow = () => {
  if (!document.querySelector('#' + props.id)) {
    return false;
  }
  return Offcanvas.getInstance(document.querySelector('#' + props.id))._isShown;
};

onMounted(() => {
  bsOffcanvas = new Offcanvas(offcanvasRef.value, {
    backdrop: false,
    scroll: true,
  });
});

onUnmounted(() => {
  bsOffcanvas = null;
});

defineExpose({
  show,
  hide,
  toggle,
  updateContent,
});
</script>

<template>
  <div ref="offcanvasRef" class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvas"
       aria-labelledby="offcanvasLabel">
    <div class="offcanvas-header d-flex justify-content-between">
      <h5 class="offcanvas-title" id="offcanvasLabel">{{ data.title }}</h5>
      <el-button @click="hide" type="primary">X</el-button>
    </div>
    <div class="offcanvas-body">
      <p>{{ data.content }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Optional custom styles for bottom-offcanvas */
.offcanvas-bottom {
  top: auto;
  bottom: 0;
}
</style>
