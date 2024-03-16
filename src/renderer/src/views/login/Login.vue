<script setup lang="ts">
  import { useStore } from '@/store'
  import passwordForm from '@v/login/components/passwordForm.vue'
  import phoneForm from '@v/login/components/phoneForm.vue'
  import { storeToRefs } from 'pinia'
  import { reactive, getCurrentInstance, ComponentInternalInstance } from 'vue'
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 换肤
  const globalStore = useStore().global
  const { theme, language } = storeToRefs(globalStore)
  const switchTheme = () => {
    theme.value = theme.value === 'dark' ? '' : 'dark'
    const htmlDOM = document.querySelector('html')
    if (htmlDOM) {
      htmlDOM.className = theme.value
    }
  }

  // 切换语言
  const languageConfig = reactive([
    { name: '中文', value: 'zh-cn' },
    { name: '英文', value: 'en' }
  ])
  const switchLang = (item: { name: string; value: string }) => {
    const $i18n = proxy?.$i18n
    $i18n!.locale = item.value
    language.value = item.value
  }

  // 关闭窗口
  const closeWin = () => {
    window.electron.ipcRenderer.invoke('close-login')
  }
</script>

<template>
  <div class="login">
    <!-- 按钮 -->
    <div class="login-config">
      <div class="login-config-btn">
        <!-- 国际化 -->
        <el-dropdown trigger="click" @command="switchLang">
          <el-button circle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 512 512"
            >
              <path
                d="M478.33 433.6l-90-218a22 22 0 0 0-40.67 0l-90 218a22 22 0 1 0 40.67 16.79L316.66 406h102.67l18.33 44.39A22 22 0 0 0 458 464a22 22 0 0 0 20.32-30.4zM334.83 362L368 281.65L401.17 362z"
                fill="currentColor"
              ></path>
              <path
                d="M267.84 342.92a22 22 0 0 0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73c39.65-53.68 62.11-114.75 71.27-143.49H330a22 22 0 0 0 0-44H214V70a22 22 0 0 0-44 0v20H54a22 22 0 0 0 0 44h197.25c-9.52 26.95-27.05 69.5-53.79 108.36c-31.41-41.68-43.08-68.65-43.17-68.87a22 22 0 0 0-40.58 17c.58 1.38 14.55 34.23 52.86 83.93c.92 1.19 1.83 2.35 2.74 3.51c-39.24 44.35-77.74 71.86-93.85 80.74a22 22 0 1 0 21.07 38.63c2.16-1.18 48.6-26.89 101.63-85.59c22.52 24.08 38 35.44 38.93 36.1a22 22 0 0 0 30.75-4.9z"
                fill="currentColor"
              ></path>
            </svg>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in languageConfig" :key="item.value" :command="item">
                {{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- 换肤 -->
        <el-button circle @click="switchTheme">
          <el-icon v-if="theme === 'dark'"><Sunny /></el-icon>
          <el-icon v-else><Moon /></el-icon>
        </el-button>
        <!-- 关闭软件 -->
        <el-button circle icon="close" type="default" @click="closeWin"></el-button>
      </div>
    </div>
    <!-- 左边 -->
    <div class="login_adv">
      <div class="login_adv__title">
        <h2>{{ $t('login.name') }}</h2>
        <h4>{{ $t('login.slogan') }}</h4>
        <p>{{ $t('login.describe') }}</p>
      </div>
      <div class="login_adv__mask"></div>
      <div class="login_adv__image">
        <img src="@/assets/images/data.png" alt="" width="100%" />
      </div>
      <div class="login_adv__bottom">© {{ $t('login.title') }} 1.0.11</div>
    </div>
    <!-- 右边 -->
    <div class="login-main">
      <div class="login-form">
        <div class="login-header">
          <div class="login-img">
            <img src="@/assets/kun.jpg" alt="" />
            <label>{{ $t('login.title') }}</label>
          </div>
        </div>
        <el-tabs>
          <el-tab-pane :label="$t('login.accountLogin')" lazy style="height: 300px">
            <password-form></password-form>
          </el-tab-pane>
          <el-tab-pane :label="$t('login.mobileLogin')" lazy style="height: 300px">
            <phone-form></phone-form>
          </el-tab-pane>
        </el-tabs>
        <template v-if="true">
          <el-divider>{{ $t('login.signInOther') }}</el-divider>
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
</template>

<style scoped lang="scss">
  .login {
    width: 100vw;
    height: 100vh;
    background: #fff;
    display: flex;
    position: relative;
    .login-config {
      position: absolute;
      right: 0px;
      top: 0px;
      z-index: 999;
      width: 100%;
      .login-config-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 120px;
        margin: 10px 10px 0 0;
        float: right;
        .el-button + .el-button {
          margin-left: 0px;
        }
        .active {
          background-color: var(--el-dropdown-menuItem-hover-fill);
          color: var(--el-dropdown-menuItem-hover-color);
        }
      }
    }

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
