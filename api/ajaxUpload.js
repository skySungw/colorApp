import { uploadFileUrl } from '@/api/api';
function ajax({
  url,
  filePath,
  name = 'file',
  formData = {},
  success,
  fail,
  complete
}) {
  uni.showLoading({
    title: '加载中',
    mask: true
  })
  // const baseUrl = 'https://api.kiiho.com/';
  // const baseUrl = 'http://62.234.77.116/';
  const token = uni.getStorageSync('token') || '';
  const header = {
  }
  if (token) {
    Object.assign(header, {
      'Authorization': 'Bearer  ' + token
    })
  }
  uni.uploadFile({
    url: uploadFileUrl, //仅为示例，并非真实的接口地址
    filePath,
    name,
    formData,
    header,
    success (res) {
      success && success(res);
    },
    fail(err) {
      fail && fail(err)
    },
    complete() {
      complete && complete();
      uni.hideLoading();
    }
  })
}
export default ajax;