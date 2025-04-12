<template>
  <div id="app">
    <header>
      <van-nav-bar title="用户登录" left-text="返回" right-text="一键填写" left-arrow @click-left="onClickLeft"
        @click-right="onClickRight" />
    </header>
    <main>
      <h2>手机号登录</h2>
      <p>未注册的手机号将自动注册</p>
      <van-field v-model="mobile" placeholder="请输入手机号" maxlength="11" :rules="mobileRules" />

      <van-cell-group inset>
        <van-field v-model="picCode" center placeholder="请输入图形验证码">
          <template #button>
            <img id="codeImg" v-if="picUrl" :src="picUrl" @click="onsubmit" alt="" :rules="codeRules">
          </template>
        </van-field>
      </van-cell-group>

      <van-cell-group inset>
        <van-field v-model="sms" center placeholder="请输入短信验证码">
          <template #button>
            <van-button id="sendCode" size="small" @click="codeSend" type="primary" :disabled="totalSecond!==nowSecond">{{ totalSecond===nowSecond ? '发送验证码' : nowSecond+'秒后重新发送' }}</van-button>
          </template>
        </van-field>
      </van-cell-group>
    </main>
    <footer>
      <van-button type="primary" @click="login" block>登录</van-button>
    </footer>
  </div>
</template>

<script>
import { getCode, getMsgCode, login } from '@/api/login'

export default {
  name: 'loginIndex',
  data () {
    return {
      mobile: '', // 定义 mobile，并初始化为空字符串
      picCode: '', // 图形验证码
      picKey: '',
      picUrl: '',
      sms: '', // 短信验证码
      mobileRules: [ // 表单验证规则
        { required: true, message: '请输入手机号' },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
      ],
      codeRules: [
        { required: true, message: '请输入验证码' },
        { pattern: /^\d{4}$/, message: '验证码格式不正确' }
      ],
      totalSecond: 60, // 倒计时总秒数
      nowSecond: 60, // 当前倒计时秒数
      line1: 15751776629,
      line2: '2b9s',
      line3: 246810,
      timer: null
    }
  },
  created () {
    this.onsubmit()
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onClickRight () {
      this.mobile = this.line1
      this.picCode = this.line2
      this.sms = this.line3
    },
    async onsubmit () {
      const { data: { base64, key } } = await getCode()
      this.picUrl = base64
      this.picKey = key
      this.$toast('获取验证码成功')
    },
    vaildFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      if (!/^\d{6}$/.test(this.sms)) {
        this.$toast('请输入正确的短信验证码')
        return false
      }
      return true
    },
    async codeSend () {
      await getMsgCode(this.picCode, this.key, this.mobile)
      // console.log(res)

      this.$toast('验证码发送成功')
      this.timer = setInterval(() => {
        if (this.nowSecond === 0) {
          clearInterval(this.timer)
          this.timer = null
          this.nowSecond = this.totalSecond
        } else {
          this.nowSecond--
        }
      }, 1000)
    },
    async login () {
      if (!this.vaildFn()) {
        console.log('验证失败')
        return
      }
      const res = await login(this.mobile, this.sms)
      this.$store.commit('user/setUserInfo', res.data)
      console.log(res)
      const url = this.$route.query.backUrl || '/home'
      this.$router.replace(url)
      this.$toast('登录成功')
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped lang="less">
#app {
  // border: 1px solid red;
  line-height: 50px;
  height: 100vh;
  display: flex;
  flex-direction: column;

  header {
    width: 100vw;
  }

  main {
    width: 90vw;
    /* 保持90%视窗宽度 */
    margin: 0 auto;
    /* 水平居中关键代码 */
    padding: 40px 0;
    /* 可选：添加垂直间距 */

    /* 内容居中（如文本和表单元素） */
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      color: #999;
    }

    #codeImg {
      width: 30vw;
    }

    #sendCode {
      width: 30vw;
    }
  }

  footer {
    margin: 0 auto;
    text-align: center;
    width: 90vw;
    padding: 20px 0;
  }
}
</style>
