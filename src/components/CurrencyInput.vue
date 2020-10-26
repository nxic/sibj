<template>
  <b-form-input v-model="displayValue"
                @blur="blurred"
                @focus="isInputActive = true"
                :disabled="disabled"
                :state="state"
                :title="inputTitle"
                :class="inputClass"
                :placeholder="placeholder"
  />
</template>
<script>
  import _ from 'lodash';

  export default {
    props: ['value', 'title', 'disabled', 'state', 'inputTitle', 'inputClass', 'placeholder'],
    data() {
      return {
        isInputActive: false
      };
    },
    methods: {
      blurred() {
        this.$emit('blur');
        this.isInputActive = false;
      }
    },
    computed: {
      displayValue: {
        get() {
          if (this.isInputActive) {
            return this.value?.toString();
          }
          return this.value?.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
        },
        set(modifiedValue) {
          let newValue = parseFloat(modifiedValue.replace(/[^\d.]/g, ''));
          if (_.isNaN(newValue)) {
            newValue = 0;
          }
          this.$emit('input', newValue);
        }
      }
    }
  };
</script>
