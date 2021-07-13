import Vue from 'vue';
export const clearHttpRequestingList = () => {
  if (Vue.$httpRequestList.length > 0) {
    Vue.$httpRequestList.forEach((item) => {
      console.log(item, 'itemmm')
      item()
    })
    Vue.$httpRequestList = []
  }
}