<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack && !isCustom">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				<view
					class="action border-custom"
					v-if="isCustom && isBack"
					:style="[{width: Custom.width + 'px'}, {height: Custom.height + 'px'}]"
				>
					<text class="cuIcon-back" @tap="BackPage"></text>
					<text class="cuIcon-homefill" @tap="toHome"></text>
				</view>
				<view
					class="action border-custom"
					v-else-if="isCustom && !isBack"
					:style="[{width: Custom.height + 'px'}, {height: Custom.height + 'px'}, {'line-height': Custom.height + 'px'}]"
				>
					<text class="cuIcon-homefill" @tap="toHome"></text>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
				<view class="search-slot" style="flex: 1;">
					<slot name="serach"></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				Custom: this.Custom
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			isCustom: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			toHome(){
				uni.reLaunch({
					url: '/pages/ground/goodsGround',
				})
			}
		}
	}
</script>

<style>

</style>
