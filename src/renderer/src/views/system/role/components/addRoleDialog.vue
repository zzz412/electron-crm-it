<script setup lang="ts">
  import { IRoleMenuItem } from '@/api/interface/role'
  import { menuTree, roleAdd } from '@/api/role'
  import useDicts from '@/hooks/useDicts'
  import { ElMessage, ElTree } from 'element-plus'
  import { onBeforeMount, reactive, ref } from 'vue'
  const { dicts } = useDicts(['system_global_status'])

  interface IMenuTreeProps {
    treeList: IRoleMenuItem[]
    treeProps: { label: string }
    linkage: boolean
    openAll: boolean
    selectAll: boolean
  }

  // 弹窗状态
  const dialogVisible = ref(false)

  // 表单值
  const form = reactive({
    roleName: '', //角色名称
    rolePerm: '', //角色权限编码
    enabled: '1', //是否启用（0：禁用；1：启用）
    descript: '' //描述
  })

  // * 菜单树实例
  const menuTreeRef = ref<InstanceType<typeof ElTree>>()
  const menuTreeProps = reactive<IMenuTreeProps>({
    treeList: [],
    treeProps: { label: 'name' },
    linkage: true,
    openAll: false,
    selectAll: false
  })
  // * 初始化菜单树
  const initMenuTree = async () => {
    const res = await menuTree()
    menuTreeProps.treeList = res.data
  }
  // * 菜单树: 展开 & 折叠
  const toggleTreeCollapse = (e: boolean) => {
    const nodeMap = menuTreeRef.value!.store.nodesMap
    Object.keys(nodeMap).forEach((key) => {
      nodeMap[key].expanded = e
    })
  }

  //* 菜单树: 全选 & 全不选
  const toggleTreeChecked = (e: boolean) => {
    const nodeMap = menuTreeRef.value!.store.nodesMap
    Object.keys(nodeMap).forEach((key) => {
      nodeMap[key].checked = e
    })
  }

  onBeforeMount(() => {
    initMenuTree()
  })

  // * 弹窗操作
  const emit = defineEmits(['update'])
  const open = () => {
    dialogVisible.value = true
  }

  const close = () => {
    form.roleName = ''
    form.rolePerm = ''
    form.enabled = '1'
    form.descript = ''
    dialogVisible.value = false
  }

  const onSubmit = async () => {
    // 1. 获取菜单树选中项
    const permissionIds = menuTreeRef.value?.getCheckedKeys() as string[]
    // 2. 提交表单
    const res = await roleAdd({ permissionIds, ...form })
    if (res.code !== '200') return

    ElMessage.success('操作成功')
    close()
    emit('update')
  }

  defineExpose({ open, close })
</script>

<template>
  <el-dialog v-model="dialogVisible" title="新增角色" width="600px" @close="close">
    <el-form :model="form" label-width="70px">
      <el-form-item label="角色名称">
        <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="权限字符">
        <el-input v-model="form.rolePerm" placeholder="请输入权限字符"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.enabled">
          <el-radio v-for="item in dicts.system_global_status" :key="item.id" :label="form.enabled == item.v ? form.enabled : item.v">{{ item.k }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单权限">
        <div class="menu-item">
          <el-checkbox v-model="menuTreeProps.openAll" @change="toggleTreeCollapse">展开/折叠</el-checkbox>

          <el-checkbox v-model="menuTreeProps.selectAll" @change="toggleTreeChecked">全选/全不选</el-checkbox>

          <el-checkbox v-model="menuTreeProps.linkage">父子(联动/不联动)</el-checkbox>

          <el-tree
            ref="menuTreeRef"
            :data="menuTreeProps.treeList"
            :props="menuTreeProps.treeProps"
            :check-strictly="!menuTreeProps.linkage"
            :default-expand-all="menuTreeProps.openAll"
            show-checkbox
            node-key="id"
            class="tree"
          />
        </div>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" placeholder="请输入备注内容" v-model="form.descript" :maxlength="200" show-word-limit></el-input>
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
  .tree {
    margin-top: 0.5rem;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
</style>
