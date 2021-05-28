<template>
  <button :class="['btn', `btn-${type}`]">
    <!-- Só vai colocar o ícone se tiver ícone -->
    <i v-show="icon" :class="['fas', icon]"></i>
    &nbsp;
    <!-- slot: componente do vue, faz com que a responsabilidade de colocar os dados dentro doc omponente seja de quem está utilizando o componente -->
    <slot></slot>
  </button>
</template>

<script>
export default {
  // este formato de props é melhor do que com array, pois dá para definir várias características da prop
  props: {
    icon: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'default',
    }
  },
}
</script>

<style>
  .btn-primary {
      background-color: #91ADC2;
      border-color: #91ADC2;
  }
  .btn-secondary {
      background-color: #7A8B99;
      border-color: #7A8B99;
  }
</style>
