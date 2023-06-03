<template>
  <div class="admin-layout-wrap">
    <el-container :style="{ height: '100%' }">
      <!-- <el-aside width="250px"> -->
      <admin-menu />
      <!-- </el-aside> -->
      <el-main style="padding: 10px">
        <nuxt />
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import adminMenu from '@/components/admin/adminMenu';

export default {
  // components: { adminMenu },
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.admin-layout-wrap {
  // width: 100%;
  height: 100vh;
}
</style>
