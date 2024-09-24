<script setup>

defineProps({modalId: String})


</script>


<template>
<div class="modal fade" :id="modalId">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-body">
        <slot>
          This can be filled in with whatever you want
        </slot>
        <!-- <AlbumForm/> -->
      </div>
    </div>
  </div>
</div>
</template>


<style lang="scss" scoped>

</style>
