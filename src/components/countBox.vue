<template>
    <div class="count-box">
      <button @click="handleCount(-1)" :disabled="value<=1" class="minus">-</button>
      <input :value="value" @change="handleChange" class="inp" type="text">
      <button @click="handleCount(1)" class="add">+</button>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      default: ''
    }
  },
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleCount (count) {
      this.$emit('input', this.value + count)
    },
    handleChange () {
      // 1. 获取输入值并移除所有非数字字符（包括小数点）
      let rawValue = event.target.value.replace(/[^\d]/g, '')

      // 2. 处理 "0.x" 情况：如果原始输入是 "0.5" → 变成 "5"
      //    直接删除所有非数字字符后，"0.5" → "05" → 替换前导0 → "5"
      rawValue = rawValue.replace(/^0+/, '') // 移除前导零

      // 3. 如果值为空，设置为 "0"（可选）
      if (rawValue === '') {
        rawValue = '1'
      }

      // 4. 更新输入框的值（确保显示的是纯数字）
      event.target.value = rawValue

      // 5. 保存到数据（如果需要）
      this.positiveNumber = rawValue
      this.$emit('input', rawValue)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box {
  width: 110px;
  display: flex;
  .add, .minus {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
