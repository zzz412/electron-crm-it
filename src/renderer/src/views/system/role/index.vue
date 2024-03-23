<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue'
  import { roleDelete, rolePage } from '@/api/role'
  import { Role } from '@/api/interface/role'
  import tool from '@/utils/tool'
  import Pagination from '@/components/Pagination.vue'
  import AddRoleDialog from './components/addRoleDialog.vue'
  import useDicts from '@/hooks/useDicts'
  import { ElMessage, ElMessageBox } from 'element-plus'

  // * 字典数据
  const { dicts } = useDicts(['system_global_status'])

  // * 表格数据
  const loading = ref(false)
  const tableData = ref<Role[]>([])
  const totals = ref(0)
  const roleForm = ref({
    current: 1,
    size: 10,
    roleName: '',
    rolePerm: '',
    enabled: ''
  })

  const getTableData = async () => {
    loading.value = true
    const res = await rolePage(roleForm.value)
    const { records, total } = res.data
    totals.value = total
    tableData.value = records
    loading.value = false
  }

  const resetData = () => {
    roleForm.value = {
      current: 1,
      size: 10,
      roleName: '',
      rolePerm: '',
      enabled: ''
    }
    getTableData()
  }

  const handleDelete = async (id: string) => {
    try {
      await ElMessageBox.confirm('是否确认删除该角色？', { type: 'error', confirmButtonText: '删除' })
      const res = await roleDelete(id)
      if (res.code !== '200') return
      ElMessage.success('删除成功')
      getTableData()
    } catch (e) {
      return
    }
  }

  // * 添加角色弹窗
  const roleDialogRef = ref<InstanceType<typeof AddRoleDialog>>()

  onBeforeMount(() => {
    getTableData()
  })
</script>

<template>
  <div class="role-view">
    <el-container>
      <el-main>
        <el-tabs type="border-card">
          <el-tab-pane label="角色列表">
            <!-- 搜索区域 -->
            <el-card class="card-container">
              <el-form>
                <el-row :gutter="15">
                  <el-col :span="8">
                    <el-form-item label="角色名称">
                      <el-input placeholder="请输入角色名称" v-model="roleForm.roleName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="角色编码">
                      <el-input placeholder="请输入角色编码" v-model="roleForm.rolePerm"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="状态">
                      <el-select placeholder="请选择启用状态" v-model="roleForm.enabled">
                        <el-option v-for="item in dicts.system_global_status" :key="item" :label="item.k" :value="item.v" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item>
                      <el-button icon="search" type="primary" @click="getTableData">搜索</el-button>
                      <el-button icon="refreshLeft" @click="resetData">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>
            <!-- 数据区域 -->
            <el-card>
              <!-- 操作栏 -->
              <div class="toolbar">
                <el-button icon="plus" type="primary" @click="roleDialogRef?.open">新增</el-button>
              </div>
              <!-- 表格栏 -->
              <el-table v-loading="loading" :data="tableData" border>
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="角色名称" align="center" prop="roleName"></el-table-column>
                <el-table-column label="权限字符" align="center" prop="rolePerm"></el-table-column>
                <el-table-column label="是否启用" align="center">
                  <template #default="{ row }">
                    <el-tag>{{ row.enabled == '1' ? '启用' : '禁用' }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime" :formatter="(row) => tool.dateForMat(row.createTime)"></el-table-column>
                <el-table-column label="操作" align="center" width="220" fixed="right">
                  <template #default="{ row }">
                    <div class="sys-table-main-actions">
                      <el-link icon="edit" type="primary" :underline="false">编辑</el-link>
                      <el-link icon="delete" type="danger" :underline="false" class="link-btn" @click="handleDelete(row.id)">删除</el-link>
                      <router-link class="el-link el-link--error" type="success" to="/">分配用户</router-link>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 分页栏 -->
              <pagination v-model:current="roleForm.current" v-model:page-size="roleForm.size" :total="totals" @page-change="getTableData" @size-change="getTableData" />
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="回收站">2</el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>

    <!-- 操作弹窗组件 -->
    <AddRoleDialog ref="roleDialogRef" @update="getTableData" />
  </div>
</template>

<style scoped lang="scss">
  .role-view {
    height: 100%;
    .card-container,
    .toolbar {
      margin-bottom: 15px;
    }
  }
  .el-table {
    font-size: 12px;
    .link-btn {
      margin: 0 8px;
    }
  }
</style>
