import { ENV } from '@/utils/index';
let baseUrl = 'https://wapi.kiiho.com/';
if (ENV === 'test') {
	baseUrl = 'http://47.95.247.103:8866/';
}
// const baseUrl = 'http://192.168.165.111:8866/'
export {
	baseUrl
}