<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue'
  import { userPage, userDel } from '@/api/systemUser'
  import { Record } from '@/api/interface/systemUser'
  import Pagination from '@/components/Pagination.vue'
  import useDicts from '@/hooks/useDicts'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import AddUserDialog from './components/addUserDialog.vue'

  // * 字典数据
  const { dicts } = useDicts(['system_global_status', 'system_global_gender'])

  // * 表格数据
  const loading = ref(false)
  const tableData = ref<Record[]>([])
  const totals = ref(0)
  const roleForm = ref({
    current: 1,
    size: 10,
    username: '',
    realName: '',
    email: '',
    phone: '',
    gender: '',
    enabled: '',
    unitId: ''
  })

  const getTableData = async () => {
    loading.value = true
    const res = await userPage(roleForm.value)
    const { records, total } = res.data
    totals.value = total
    tableData.value = records
    loading.value = false
  }

  const resetData = () => {
    roleForm.value = {
      current: 1,
      size: 10,
      username: '',
      realName: '',
      email: '',
      phone: '',
      gender: '',
      enabled: '',
      unitId: ''
    }
    getTableData()
  }

  const handleDelete = async (id: string) => {
    try {
      await ElMessageBox.confirm('是否确认删除该用户？', '提示', { type: 'error', confirmButtonText: '删除' })
      const res = await userDel(id)
      if (res.code !== '200') return
      ElMessage.success('删除成功')
      getTableData()
    } catch (e) {
      return
    }
  }

  onBeforeMount(() => {
    getTableData()
  })

  // * 操作用户弹窗
  const userDialogRef = ref<InstanceType<typeof AddUserDialog>>()
</script>

<template>
  <div class="user-view">
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
                      <el-input placeholder="请输入角色名称" clearable v-model="roleForm.username"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="角色编码">
                      <el-input placeholder="请输入角色编码" clearable v-model="roleForm.realName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="邮箱" prop="email">
                      <el-input placeholder="请输入用户邮箱" clearable v-model="roleForm.email" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="手机号码" prop="phone">
                      <el-input placeholder="请输入手机号码" clearable v-model="roleForm.phone" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="性别" prop="gender">
                      <el-select v-model="roleForm.gender" placeholder="请选择用户性别" clearable>
                        <el-option v-for="item in dicts.system_global_gender" :key="item.v" :label="item.k" :value="item.v" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="状态">
                      <el-select placeholder="请选择启用状态" v-model="roleForm.enabled">
                        <el-option v-for="item in dicts.system_global_status" :key="item" :label="item.k" :value="item.v" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
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
                <el-button icon="plus" type="primary" @click="userDialogRef?.open">新增</el-button>
              </div>
              <!-- 表格栏 -->
              <el-table v-loading="loading" :data="tableData" border>
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="用户姓名" align="center" prop="username"></el-table-column>
                <el-table-column label="真实姓名" align="center" prop="realName"></el-table-column>
                <el-table-column label="用户类型" align="center" prop="userType" width="110">
                  <template #default="{ row }">
                    <el-tag v-if="row.userType == 0">普通账号</el-tag>
                    <el-tag v-if="row.userType == 1" type="warning">超级管理员</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="手机号码" align="center" prop="phone" width="150" />
                <el-table-column label="用户性别" align="center" prop="gender">
                  <template #default="{ row }">
                    <template v-for="item in dicts.system_global_gender">
                      <div v-if="row.gender == item.v" :key="item.v">{{ item.k }}</div>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column label="账号状态" align="center" prop="enabled">
                  <template #default="{ row }">
                    <template v-for="item in dicts.system_global_status">
                      <el-tag v-if="row.enabled == item.v" :key="item.v">{{ item.k }}</el-tag>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="220" fixed="right">
                  <template #default="{ row }">
                    <div class="sys-table-main-actions">
                      <el-link icon="edit" type="primary" :underline="false" @click="userDialogRef?.open(row.id)">编辑</el-link>
                      <el-link icon="delete" type="danger" :underline="false" class="link-btn" @click="handleDelete(row.id)">删除</el-link>
                      <el-link icon="Refresh" :underline="false" type="success">重置密码</el-link>
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
    <!-- 操作用户弹窗 -->
    <AddUserDialog ref="userDialogRef" @update="getTableData" />
  </div>
</template>

<style scoped lang="scss">
  .user-view {
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
