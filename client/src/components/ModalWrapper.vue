<script setup>
// NOTE we take in the id of the modal as a prop
defineProps({modalId: String})

// NOTE other things like modal size, color, static could all be passed as props too.
// defineProps({modalId: String, size: String, static: Boolean})

</script>


<template>
  <!-- NOTE we then assign that id to the modal so each instance of <ModalWrapper> can be unique -->
<div class="modal fade" :id="modalId">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-body">
        <!-- NOTE slot allows you to open the Custom element <ModalWrapper> </ModalWrapper> -->
         <!-- and insert your own content from other components -->
        <slot>
          This can be filled in with whatever you want
          <!-- The content here in the slot works as a default if the slot isn't used -->
        </slot>
        <!-- <AlbumForm/> -->
      </div>
    </div>
  </div>
</div>
</template>


<style lang="scss" scoped>

</style>
