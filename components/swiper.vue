<template>
		<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
		  <swiper-item v-for="(item, index) in swiperList" :key="index" @click="goAdPage(item)">
		    <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
		  </swiper-item>
		</swiper>
</template>

<script>
	export default {
		props: {
			operateHandle: Function
		},
		data() {
			return {
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
					link: '/pages/sub/article/article?id=0'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
					link: '/pages/sub/article/article?id=1'
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
					link: '/pages/sub/article/article?id=2'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					link: '/pages/sub/article/article?id=3'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
					link: '/pages/sub/article/article?id=4'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg',
					link: '/pages/sub/article/article?id=5'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
					link: '/pages/sub/article/article?id=6'
				}]
			}
		},
		methods: {
			goAdPage(item) {
			 	this.operateHandle && this.operateHandle(item);
			},
		}
	}
</script>

<style>

</style>
