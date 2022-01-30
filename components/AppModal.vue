<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header"></slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body"></slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer"></slot>
          <div class="modal-footer-buttons">
            <button
              type="button"
              class="btn-green"
              @click="$emit('no')"
              aria-label="Close modal"
            >
              {{ $t("general.cancel") }}
            </button>
            <button
              type="button"
              class="btn-blue"
              @click="$emit('ok')"
              aria-label="Close modal"
            >
              {{ $t("general.approve") }}
            </button>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AppModal",
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20rem;
}

.modal {
  width: 40rem;
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  font-size: 3rem;
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #000;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}
.modal-footer-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
.modal-body {
  position: relative;
  font-size: 2rem;
  color: #000;
  padding: 20px 10px;
}

.btn-close {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #000;
  background: transparent;
}

.btn-green {
  font-size: 2rem;
  border-radius: 50%;
  padding: 1rem;
  cursor: pointer;
  color: #000;
  background: transparent;
  border: none;
  border-radius: 2px;
}

.btn-blue {
  font-size: 2rem;
  padding: 1rem;
  border-radius: 50%;
  cursor: pointer;
  color: white;
  background: $optionsBackground;
  border: 1px solid $optionsBackground;
  border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>