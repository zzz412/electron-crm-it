<script setup lang="ts">
  defineProps({
    current: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 10
    }
  })

  const emit = defineEmits(['update:current', 'update:pageSize', 'pageChange', 'sizeChange'])

  const handleCurrentChange = (val: number) => {
    emit('update:current', val)
    emit('pageChange', val)
  }

  const handleSizeChange = (val: number) => {
    emit('update:pageSize', val)
    emit('sizeChange', val)
  }
</script>

<template>
  <div class="pagination">
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 50, 100]"
      :total="total"
      :current-page="current"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<style scoped lang="scss">
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
</style>
