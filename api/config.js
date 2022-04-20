import { ENV } from '@/utils/index';
let baseUrl = 'https://wapi.kiiho.com/';
if (ENV === 'test') {
	baseUrl = 'http://b2y1841010.iask.in/';
}
// const baseUrl = 'http://192.168.165.111:8866/'
export {
	baseUrl
}