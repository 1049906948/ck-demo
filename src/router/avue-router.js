import website from '@/config/website'

const modules = import.meta.glob('../**/**/*.vue')
function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}
let RouterPlugin = function () {
  this.$router = null;
  this.$store = null;
}
RouterPlugin.install = function (option = {}) {
  this.$router = option.router;
  this.$store = option.store;
  let i18n = option.i18n.global
  this.$router.$avueRouter = {
    safe: this,
    // 设置标题
    setTitle: (title) => {
      const defaultTitle = i18n.t('title');
      title = title ? `${title} | ${defaultTitle}` : defaultTitle;
      document.title = title;
    },
    closeTag: (value) => {
      let tag = value || this.$store.getters.tag;
      if (typeof value === 'string') {
        tag = this.$store.getters.tagList.filter(ele => ele.value === value)[0]
      }
      this.$store.commit('DEL_TAG', tag)
    },
    generateTitle: (title, key) => {
      if (!key) return title;
      const hasKey = i18n.te('route.' + key)
      if (hasKey) {
        const translatedTitle = i18n.t('route.' + key)

        return translatedTitle
      }
      return title
    },
    //动态路由
    formatRoutes: function (aMenu = [], first) {
      const aRouter = []
      const propsDefault = website.menu
      if (aMenu && aMenu.length === 0) return;
      for (let i = 0; i < aMenu.length; i++) {
        const oMenu = aMenu[i];
        let path = oMenu[propsDefault.path],
          component = oMenu.component,
          name = oMenu[propsDefault.label],
          icon = oMenu[propsDefault.icon],
          children = oMenu[propsDefault.children],
          query = oMenu[propsDefault.query],
          meta = oMenu[propsDefault.meta];
        if (option.keepAlive) {
          meta.keepAlive = option.keepAlive
        }
        const isChild = children && children.length !== 0;
        const oRouter = {
          path: path,
          component: (() => {
            // 判断是否为首路由
            if (first) {
              return modules[option.store.getters.isMacOs ? '../page/index/layout.vue' : '../page/index/index.vue']
              // 判断是否为多层路由
            } else if (isChild && !first) {
              return modules['../page/index/layout.vue']
              // 判断是否为最终的页面视图
            } else {
              let result = modules[`../${component}.vue`]
              result().then(mod => mod.default.name = path)
              return result
            }
          })(),
          name,
          icon,
          meta,
          query,
          redirect: (() => {
            if (!isChild && first) return `${path}`
            else return '';
          })(),
          // 处理是否为一级路由
          children: !isChild ? (() => {
            if (first) {
              oMenu[propsDefault.path] = `${path}`;
              let result = modules[`../${component}.vue`]
              result().then(mod => mod.default.name = path)
              return [{
                component: result,
                icon: icon,
                name: name,
                meta: meta,
                query: query,
                path: ''
              }]
            }
            return [];
          })() : (() => {
            return this.formatRoutes(children, false)
          })()
        }
        if (!isURL(path)) aRouter.push(oRouter)
      }
      if (first) {
        aRouter.forEach((ele) => this.safe.$router.addRoute(ele))
      } else {
        return aRouter
      }

    }
  }
}



export const formatPath = (ele, first) => {
  const propsDefault = website.menu;
  const icon = ele[propsDefault.icon];
  ele[propsDefault.icon] = !icon ? propsDefault.iconDefault : icon;
  ele.meta = ele.meta || {}
  const iframeComponent = 'components/iframe/main';
  const iframeSrc = (href) => {
    return href.replace(/&/g, "#")
  }
  const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
  if (!isChild && first && !isURL(ele[propsDefault.path])) {
    ele[propsDefault.path] = ele[propsDefault.path]
    if (isURL(ele[propsDefault.href])) {
      let href = ele[propsDefault.href]
      ele.component = iframeComponent
      ele[propsDefault.query] = { url: iframeSrc(href) }
    }
  } else {
    ele[propsDefault.children] && ele[propsDefault.children].forEach(child => {
      if (isURL(child[propsDefault.href])) {
        let href = child[propsDefault.href]
        child.component = iframeComponent
        child[propsDefault.query] = { url: iframeSrc(href) }
      }
      child[propsDefault.path] = `${ele[propsDefault.path]}/${child[propsDefault.path]}`
      formatPath(child);
    })
  }
}



export default RouterPlugin;
