<script setup lang="ts">
  import { computed, onBeforeMount, reactive, ref } from 'vue'
  import { unitList, userAdd, userGet, userUpdate, postPage, rolePage } from '@/api/systemUser'
  import useDicts from '@/hooks/useDicts'
  import { ElMessage } from 'element-plus'
  import { IPostListData, IRoleListData, IUnitListData, IUserUpdate } from '@/api/interface/systemUser'
  const { dicts } = useDicts(['system_global_status', 'system_global_gender'])

  // 弹窗状态
  const dialogVisible = ref(false)
  // 弹窗标题
  const title = computed(() => (form.id ? '修改用户' : '新增用户'))
  // 表单值
  const form = reactive<Partial<IUserUpdate>>({
    // id: '',
    username: '',
    password: '',
    realName: '',
    email: '',
    gender: '',
    phone: '',
    enabled: '',
    unitId: '',
    postIds: [],
    roleIds: [],
    remark: ''
  })
  // * 加载用户信息【修改】
  const loadUserInfo = async () => {
    const { data } = await userGet(form.id as string)
    const { postIds, roleIds, user } = data
    Object.assign(form, user)
    form.roleIds = roleIds
    form.postIds = postIds
  }

  // * 弹窗操作
  const emit = defineEmits(['update'])
  const open = (id: string) => {
    if (typeof id === 'string') {
      form.id = id
      loadUserInfo()
    }
    dialogVisible.value = true
  }
  const close = () => {
    Object.assign(form, {
      id: '',
      username: '',
      password: '',
      realName: '',
      email: '',
      gender: '',
      phone: '',
      enabled: '',
      unitId: '',
      postIds: [],
      roleIds: [],
      remark: ''
    })
    dialogVisible.value = false
  }
  const onSubmit = async () => {
    // 1. 获取菜单树选中项
    // 2. 提交表单【判断操作类型】
    const res = form.id ? await userUpdate(form as IUserUpdate) : await userAdd(form)
    if (res.code !== '200') return

    ElMessage.success('操作成功')
    close()
    emit('update')
  }

  // 其他数据【角色列表、岗位列表、机构列表】
  const formList = reactive<{ roleList: IRoleListData[]; postList: IPostListData[]; unitList: IUnitListData[] }>({
    roleList: [],
    postList: [],
    unitList: []
  })
  // * 加载其他数据【角色列表、岗位列表、机构列表】
  const loadFormList = async () => {
    const res1 = await unitList()
    const res2 = await postPage()
    const res3 = await rolePage()
    formList.unitList = res1.data
    formList.postList = res2.data.records
    formList.roleList = res3.data.records
  }

  onBeforeMount(() => {
    loadFormList()
  })

  defineExpose({ open, close })
</script>

<template>
  <el-dialog v-model="dialogVisible" :title width="800px" @close="close">
    <el-form :model="form" label-width="90px" class="user-editor-form">
      <el-form-item label="用户名" prop="username" class="inline">
        <el-input v-model="form.username" show-word-limit placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password" class="inline" v-if="!form.id">
        <el-input type="password" v-model="form.password" show-word-limit placeholder="请输入用户密码" />
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName" class="inline">
        <el-input v-model="form.realName" placeholder="请输入真实姓名" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email" class="inline">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item label="性别" prop="gender" class="inline">
        <el-select v-model="form.gender" placeholder="请选择性别">
          <el-option v-for="item in dicts.system_global_gender" :key="item.v" :label="item.k" :value="form.gender == item.v ? form.gender : item.v"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="手机号码" prop="phone" class="inline">
        <el-input v-model="form.phone" placeholder="请输入手机号码" />
      </el-form-item>

      <el-form-item label="启用状态" prop="enabled" class="inline">
        <el-radio-group v-model="form.enabled">
          <el-radio v-for="item in dicts.system_global_status" :key="item.v" :label="form.enabled == item.v ? form.enabled : item.v" :value="item.v">
            {{ item.k }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所属机构" prop="unitId" class="inline">
        <el-tree-select
          class="treeList"
          v-model="form.unitId"
          placeholder="请选择所属机构"
          :render-after-expand="false"
          :data="formList.unitList"
          :props="{ label: 'name' }"
          check-strictly
          auto-expand-parent
          default-expand-all
          node-key="id"
        />
      </el-form-item>
      <el-form-item label="所属岗位" prop="postIds" class="inline">
        <el-tree-select
          class="treeList"
          v-model="form.postIds"
          placeholder="请选择所属岗位"
          :render-after-expand="false"
          :data="formList.postList"
          :props="{ label: 'postName' }"
          auto-expand-parent
          default-expand-all
          show-checkbox
          multiple
          node-key="id"
        />
      </el-form-item>
      <el-form-item label="分配角色" prop="roleIds" class="inline">
        <el-tree-select
          class="treeList"
          v-model="form.roleIds"
          placeholder="请选择所属角色"
          :render-after-expand="false"
          :data="formList.roleList"
          :props="{ label: 'roleName' }"
          auto-expand-parent
          default-expand-all
          show-checkbox
          multiple
          node-key="id"
        />
      </el-form-item>

      <el-form-item label="备注">
        <el-input type="textarea" placeholder="请输入备注内容" v-model="form.remark" :maxlength="200" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
  .user-editor-form {
    :deep(.inline) {
      display: inline-flex;
      vertical-align: middle;
      width: 50%;
    }

    .treeList {
      padding: 2px;
      width: 100%;
    }
  }
  .inline {
    display: inline-flex;
    vertical-align: middle;
    width: 50%;
  }
</style>
