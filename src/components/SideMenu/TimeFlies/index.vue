<template>
  <!-- 时间显示器 -->
  <div class="kn-timeflies">
    <p>{{date}} {{time}}</p>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'TimeFlies',
  data() {
    return {
      date: dayjs().format('YYYY-MM-DD'),
      time: dayjs().format('HH:mm:ss'),
    };
  },
  created() {
    this.timer = setInterval(() => {
      this.time = dayjs().format('HH:mm:ss');
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
.kn-timeflies {
  width: inherit;
  height: 50px;
  max-height: 50px;
  line-height: 50px;
  font-size: 32px;
  background-color: rgba(115, 119, 124, 0.5);
}
</style>
