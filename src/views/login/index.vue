<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="userLoginFrom">
      <van-field type="number" v-model="loginUser.mobile" name="mobile" placeholder="请输入手机号" maxlength="11"
        :rules="userloginRules.mobile">
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field type="number" name="code" placeholder="请输入验证码" v-model="loginUser.code" maxlength="6"
        :rules="userloginRules.code">
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <div slot="right-icon" class="right-icon"></div>
        <template #button>
          <van-count-down :time="time" format="ss 秒" v-if="sendCodeTime" @finish="sendCodeTime = false" />
          <van-button native-type="button" class="send-sms-btn" round size="small" type="default" v-else
            @click="sendCode">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { loginUser, getSmsCode } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      loginUser: {
        mobile: '',
        code: ''
      },
      userloginRules: {
        mobile: [
          {
            required: true,
            message: '请输入手机号'
          },
          {
            pattern: /^1[3|4|5|6|7|8|9]\d{9}$/,
            message: '手机号码格式不正确'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式不正确'
          }
        ]
      },
      time: 60 * 1000,
      sendCodeTime: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    // 发送验证码
    async sendCode () {
      try {
        await this.$refs.userLoginFrom.validate('mobile')
        this.sendCodeTime = true
      } catch (err) {
        return err
      }
      try {
        await getSmsCode(this.loginUser.mobile)
        this.$toast.success('发送成功')
      } catch (err) {
        this.sendCodeTime = false
        if (err.response.status === 429) {
          this.$toast.success('发送太频繁了，请稍后重试')
        } else {
          this.$toast.success('发送失败，请稍后重试')
        }
      }
    }, // 发送验证码
    // 登录验证
    async onSubmit () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data: { data } } = await loginUser(this.loginUser)
        this.$toast.success('登录成功')
        this.$store.commit('setuserInfo', data)
      } catch (err) {
        this.$toast.fail(err.response.data.message)
        console.log('登录失败', err.response)
      }
    }
    // 登录验证
  }
}
</script>

<style scoped lang="less">
.login-container {

  .icon-shouji,
  .icon-yanzhengma {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 162px;
    height: 58px;
    line-height: 58px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }

  .login-btn-wrap {
    padding: 53px 33px;

    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }

  .right-icon {
    width: 2px;
    height: 46px;
    background-color: #eeeeee;
  }
}
</style>
