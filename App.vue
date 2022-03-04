<script>
	import Vue from 'vue';
	export default {
		onLaunch: function() {
			// userType - 用户类型， 0 官方人员  1 C端  2 站长端
			Vue.prototype.getSystemLocation = function(successFn, failFn) {
				uni.getLocation({
				    type: 'wgs84',
				    success: (res) =>{
							successFn && successFn(res);
				    },
						fail: (res) => {
							failFn && failFn(res);
						}
				});
			}
			// 锁定屏幕
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary');
			// #endif
			
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
							Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
							Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					
					Vue.prototype.mapConfig = {
					  key: "YCWBZ-Q2CKG-NK7Q3-IFYBG-LCHA7-TKBQ5", //使用在腾讯位置服务申请的key
					  referer: "kuaihuo" //调用插件的app的名称
					}
					// Vue.prototype.mapConfig = {
					//   key: "YCWBZ-Q2CKG-NK7Q3-IFYBG-LCHA7-TKBQ5", //使用在腾讯位置服务申请的key
					//   referer: "kuaihuo" //调用插件的app的名称
					// }
					// #endif        
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: async function() {
			const pages = getCurrentPages();
			// console.log('pages', pages);
			// uni.showToast({
			// 	title: pages,
			// 	icon: 'none'
			// });
		},
		onHide: function() {
			console.log('App Hide')
			// uni.showToast({
			// 	title: '隐藏APP',
			// 	icon: 'none'
			// });
		},
	}
</script>

<style lang="scss">
	@import "./colorui/main.css";
	@import "./colorui/icon.css";
	
	/*每个页面公共css */
	.flex-1 {
		flex: 1;
	}
	.fixed {
		position: fixed;
		width: 100%;
		left: 0;
		&.top {
			top: 0;
		}
		&.bottom {
			bottom: 0;
		}
		&.z999 {
			z-index: 999;
		}
	}
	.flex-align-center {
		justify-content: align;
		align-items: center;
	}
	.flex {
		&.flex-bettwen-space {
			justify-content: space-between;
		}
	}
	.flex-align-column {
		flex-direction: column;
	}
	.padding-bottom-none {
		padding-bottom: 0;
	}
	// 发贴、发商品
	.publish {
		position: fixed;
		bottom: 160upx;
		right: 20upx;
		width: 100upx;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		font-weight: bold;
		border-radius: 50%;
		box-shadow: 0 0 10upx rgba(0, 0, 0, 0.5);
	}
	.padding-lr-none {
		padding: 0;
	}
	.padding-left-none {
		padding-left: 0 !important;
	}
	.padding-right-none {
		padding-right: 0 !important;
	}
	.border-radius {
		border-radius: 10upx;
	}
	.padding-bottom-50 {
		padding-bottom: 50upx;
	}
</style>
