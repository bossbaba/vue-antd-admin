export default function install(Vue) {
  Vue.prototype.$fun = {
    randomNumToStr() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(12).substring(1);
    },
    createGuId() {
      let GUID = ''
      for(let i = 0 ; i< 4 ;i++){
        GUID += '-'+ this.randomNumToStr().toUpperCase()
      }
      return GUID.slice(1,GUID.length)
    }
  }
}