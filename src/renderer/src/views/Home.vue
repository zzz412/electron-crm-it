<script setup lang="ts">
  // import { ref } from 'vue'
  import passwordForm from '@v/login/components/passwordForm.vue'
  import phoneForm from '@v/login/components/phoneForm.vue'
  import DragTool from '@/components/DragTool.vue';

  // const isKeyDown = ref(false)
  // const dinatesX = ref(0)
  // const dinatesY = ref(0)

  // const mousedown = (event: MouseEvent) => {
  //   isKeyDown.value = true
  //   dinatesX.value = event.x
  //   dinatesY.value = event.y

  //   document.onmousemove = (ev) => {
  //     if (!isKeyDown.value) return
  //     const x = ev.screenX - dinatesX.value
  //     const y = ev.screenY - dinatesY.value
  //     // 给主进程传入坐标
  //     const data = { appX: x, appY: y }
  //     window.electron.ipcRenderer.invoke('custom-adsorption', data)
  //   }
  //   document.onmouseup = () => {
  //     isKeyDown.value = false
  //   }
  // }
</script>

<template>
  <DragTool>
    <div class="login">
      <!-- 左边 -->
      <div class="login_adv">
        <div class="login_adv__title">
          <h2>众智学院</h2>
          <h4>客户关系管理系统</h4>
          <p>让业务在线更高效，加速企业数字化升级。</p>
        </div>
        <div class="login_adv__mask"></div>
        <div class="login_adv__image">
          <img src="@/assets/images/data.png" alt="" width="100%" />
        </div>
        <div class="login_adv__bottom">© 众智客户管理系统 1.0.11</div>
      </div>
      <!-- 右边 -->
      <div class="login-main">
        <div class="login-form">
          <div class="login-header">
            <div class="login-img">
              <img src="@/assets/kun.jpg" alt="" />
              <label>众智客户管理系统</label>
            </div>
          </div>
          <el-tabs>
            <el-tab-pane label="账号" lazy style="height: 300px;">
              <password-form></password-form>
            </el-tab-pane>
            <el-tab-pane label="手机号登录" lazy style="height: 300px;">
              <phone-form></phone-form>
            </el-tab-pane>
          </el-tabs>
          <template v-if="true">
            <el-divider>其他登录方式</el-divider>
            <div class="login-oauth">
              <!-- 微信按钮 -->
              <el-button type="success" size="large" circle>
                <el-icon size="large"><ChatDotRound /></el-icon>
              </el-button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </DragTool>
</template>

<style scoped lang="scss">
  .login {
    width: 100vw;
    height: 100vh;
    background: #fff;
    display: flex;
    .login_adv {
      background-image: url('@/assets/images/auth_banner.jpg');
      width: 40%;
      position: relative;
      user-select: none;
      .login_adv__title {
        color: #fff;
        padding: 40px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2;
        h2 {
          font-size: 40px;
        }
        h4 {
          font-size: 18px;
          margin-top: 10px;
          font-weight: normal;
        }
        p {
          font-size: 14px;
          margin-top: 10px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.6);
        }
        div {
          margin-top: 10px;
          display: flex;
          align-items: center;
        }
      }
      .login_adv__image {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 80px;
        padding: 40px;
        z-index: 3;
        img {
          width: 100%;
        }
      }
      .login_adv__bottom {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        color: #fff;
        padding: 0 40px 40px 40px;
        background-image: linear-gradient(transparent, #000);
        z-index: 3;
      }
      .login_adv__mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
      }
    }

    .login-main {
      flex: 1;
      display: flex;
      overflow: auto;
      .login-form {
        width: 400px;
        margin: auto;
        padding: 80px 0 0 0;
        .login-header {
          margin-bottom: 40px;
          .login-img {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 40px;
              height: 40px;
              vertical-align: bottom;
              margin-right: 10px;
            }
            label {
              font-size: 26px;
              font-weight: bold;
            }
          }
        }
        .login-oauth {
          display: flex;
          justify-content: space-around;
        }
      }
    }
  }
</style>
