<template>
	<view class="container">
	  <view class="wx_login">
	    <view class="header">
	      <image mode='widthFix' class="logo" src="/static/logo.png"></image>
	    </view>
	    <view class="content">
	      <view class="li_title">登录后开发者将获得以下权限</view>
	      <view class="li_con">获得你的公开信息（昵称、头像等）</view>
	      <form class="button right">
					<block>
						<button v-if="canIUseGetUserProfile" class="button theme-bg" @tap="getUserProfile">获取头像昵称</button>
						<button v-else class="button theme-bg" open-type="getUserInfo" @getuserinfo="getUserInfo">获取头像昵称</button>
						<view class="cancel" @tap="loginBack('back')">暂不授权</view>
					</block>
	      </form>
	    </view>
	  </view>
	
	  <view class="text-tips">
	    登录代表您已同意物二
	    <text class="theme-text" @tap="jumpWebview" data-name="protrol">用户服务协议</text>、<text class="theme-text" @tap="jumpWebview" data-name="PrivacyPolicies">隐私政策</text>、<text class="theme-text" @tap="jumpWebview" data-name="LegalNotice">法律声明</text>
	  </view>
		<!-- 绑定手机号 -->
		<view :class="['cu-modal', {'show': showPhoneModal}]">
		  <view class="cu-dialog">
		    <view class="cu-bar bg-white justify-end">
		      <view class="content">绑定手机号</view>
		      <view class="action">
		        <text class="cuIcon-close text-red"></text>
		      </view>
		    </view>
		    <view class="padding-xl">
		      手机号用于发布、购买商品时，选择是否展示给其他用户时使用
		    </view>
		    <view class="cu-bar bg-white justify-end">
		      <view class="action">
		        <button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
		        <button class="cu-btn bg-green margin-left" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">绑定手机号</button>
		      </view>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	import { getPhoneNumber, checkAuth, selectUserLocation } from '@/api/index';
	export default {
		data() {
			return {
				loginUrl: '',
				showPhoneModal: false, // 是否显示绑定手机号
				hasUserInfo: false,
				backUrl: null,
				loginInfo: null, // 登录信息
				userInfo: {},
				canIUseGetUserProfile: false,
			}
		},
		onLoad() {
			if (uni.getUserProfile) {
				this.canIUseGetUserProfile = true
			}
			// #ifdef APP-NVUE
			const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
			// #endif
			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			eventChannel.on('loginUrl', (data) => {
				this.loginUrl = data.loginUrl;
			})
		},
		methods: {
			setNavigateBack(num) {
				uni.navigateBack({
					delta: num,
					fail: res => {
						wx.switchTab({
							url: '/pages/ground/ground',
						})
					}
				})
			},
			hideModal() {
				this.showPhoneModal = false;
			},
			loginBack(flag) {
				if (flag === 'back') {
					this.loginUrl = '';
				}
				if (this.loginUrl) {
					uni.redirectTo({
						url: this.loginUrl,
						fail: (res) => {
							uni.switchTab({
								url: `/pages/ground/ground`,
								complete: res => {
									getApp().loginBackPageLink = '';
								}
							})
						}
					})
				} else {
					this.setNavigateBack(1);
				}
			},
			async onSelectLocation() {
				try {
					const res = await selectUserLocation();
					console.log('res', res);
					if (res.code === 200) {
						const addressInfo = {
							title: res.data.locationAddress,
							lat: res.data.locationLat,
							lng: res.data.locationLng,
							city: res.data.cityName
						}
						uni.setStorageSync('addressInfo', addressInfo);
						
					}
				} catch(err) {
					console.log('err', err);
				}
				this.loginBack();
			},
			async onCheckAuth(data) {
				try {
					const res = await checkAuth(data);
					console.log('res', res);
					if (res.code === 1004) {
						this.hasUserInfo = true;
						this.showPhoneModal = true;
					} else if (res.code === 200) {
						uni.setStorageSync('token', res.data.token);
						uni.setStorageSync('userId', res.data.userId);
						this.onSelectLocation();
					}
				} catch (err) {
					console.log('err', err);
				}
			},
			onGetPhoneNumber(e){  
				const detail = e.detail;
				console.log('detail', detail)
				if (detail.errMsg == 'getPhoneNumber:ok') {
					let data = {};
					data = Object.assign({}, this.loginInfo, {
						...detail,
						headImgUrl: this.loginInfo.avatarUrl,
					})
					this.onHandleLogin(data);
				}
			},
			login() {
				uni.login({
					success: (res) => {  
							if (res.code) {         //微信登录成功 已拿到code  
								this.loginInfo = Object.assign({}, this.userInfo, {
									code: res.code
								})
								// 检查登录状态
								this.onCheckAuth({
									code: res.code
								});
							} else {  
									console.log('登录失败！' + res.errMsg)  
							}  
					}  
				})
			},
			getUserProfile(e) {
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				wx.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						console.log("userInfo", res)
						this.userInfo = res.userInfo
						// this.hasUserInfo = true
						this.login()
					}
				})
			},
			getUserInfo() {
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
				    // 获取用户信息
				    uni.getUserInfo({
				      provider: 'weixin',
				      success: function (infoRes) {
				        console.log('用户昵称为：' + infoRes);
				      }
				    });
				  }
				});
			},
			async onHandleLogin(data) {
				console.log("data", data);
				try {
					const res = await getPhoneNumber(data);
					if (res.code === 200) {
						uni.setStorageSync('token', res.data.token);
						uni.setStorageSync('userId', res.data.userId);
						let url = '';
						uni.navigateBack({
							delta: 1
						});
					} else {
						uni.showToast({
							title: '绑定异常'
						})
					}
				} catch (err) {
					console.log('err', err);
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
	  background-color: #fff;
	}
	.header {
	  position: relative;
	  width: 100%;
	  margin-top: 106rpx;
	  padding: 0 40rpx 40rpx;
	  box-sizing: border-box;
	}
	.header .logo {
	  display: block;
		margin: auto;
	  width: 267rpx;
	  height: 78rpx;
	}
	.header .title {
	  margin-top: 10rpx;
	  text-align: center;
	  font-size: 32rpx;
	  color: #000000;
	}
	.content {
	  margin: 0 40rpx;
	  font-size: 28rpx;
	}
	.content .li_title {
	  margin-top: 10rpx;
	  font-size: 42rpx;
	  color: #000000;
	}
	.content .li_con {
	  margin-top: 14rpx;
	  color: #666666;
	  font-size: 24rpx;
	  margin-bottom: 200rpx;
	}
	.content .button {
	  margin-bottom: 20rpx;
	  width: 100%;
	  height: 100rpx;
	  line-height: 100rpx;
	  border-radius: 100rpx;
	  font-size: 34rpx;
	  color: #FFFFFF;
	  text-align: center;
	  font-weight: bold;
		background-color: #00b955;
	}
	.content .cancel {
	  font-size: 30rpx;
	  color: #999999;
	  text-align: center;
	  height: 100rpx;
	  line-height: 100rpx;
	}
	
	.bind_phone .login_title {
	  padding: 120rpx 40rpx 40rpx;
	  font-size: 54rpx;
	  color: #333;
	  letter-spacing: 1.48rpx;
	  font-weight: bold;
	}
	.bind_phone .login_form .login_inp {
	  border-bottom: 1rpx solid #eee;
	  padding: 16rpx 0;
	  margin: 0 32rpx;
	}
	.bind_phone .login_form .login_inp .login_inp_tip {
	  padding-bottom: 12rpx;
	  font-size: 22rpx;
	  color: #999999;
	  letter-spacing: 1.11rpx;
	}
	.bind_phone .login_form .login_inp .login_inp_val {
	  display: flex;
	}
	.bind_phone .login_form .login_inp input {
	  height: 50rpx;
	  line-height: 50rpx;
	  font-size: 32rpx;
	  color: #333333;
	  letter-spacing: 1.11rpx;
	  flex: 1;
	}
	.bind_phone .login_form .login_inp input::-webkit-input-placeholder {
	  color: #999999;
	}
	.bind_phone .login_form .login_inp .login_inp_getPaw {
	  width: 160rpx;
	  height: 60rpx;
	  line-height: 58rpx;
	  border-radius: 100rpx;
	  text-align: center;
	  font-size: 28rpx;
	  padding: 0;
	  box-sizing: border-box;
	  background: none;
	  margin: 0;
	}
	.bind_phone .login_form .login_inp .sending_code {
	  color: #999999;
	}
	.bind_phone .btn_login_sub {
	  width: 686rpx;
	  height: 95rpx;
	  line-height: 95rpx;
	  text-align: center;
	  margin: 100rpx auto 0;
	  background: #e4393b;
	  border-radius: 100rpx;
	  font-size: 36rpx;
	  color: #fff;
	  letter-spacing: 0.58rpx;
	}
	.bind_phone .btn_login_disable {
	  background: #C6CAD4;
	}
	
	.text-tips {
	  font-size: 24rpx;
	  position: fixed;
	  bottom: 60rpx;
	  width: 100%;
	  text-align: center;
	}
	.theme-text {
	  color: #00b955!important;
	}
</style>
