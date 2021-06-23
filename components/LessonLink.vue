<template>
  <div class="lesson-link">
    <img
      src="~/assets/images/camera.png"
      class="lesson-link__icon"
      alt="Start"
    />
    <label>
      <span class="lesson-link__label" v-if="label">{{ label }}</span>
      <a class="lesson-link__href" :href="link" target="_blank">
        {{ link }}
      </a>
    </label>
  </div>
</template>
<style lang="scss" scoped>
.lesson-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &__icon {
    height: 1.5rem;
  }

  &__label {
    padding-right: 0.5rem;
  }

  &__href {
    background-color: $white;
    border-radius: $appRadius;
    color: $mainBackground;
    padding: 0 2rem 0 2rem;
    text-decoration: none;
    &:hover {
      background-color: #fffe;
    }
  }
}
</style>
<script>
export default {
  props: {
    label: {
      type: String,
      required: false
    },
    link: {
      type: String,
      required: true
    }
  }
};
</script>
