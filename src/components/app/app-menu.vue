<style lang="less">
.app-menu {
  .h-menu {
    font-size: 14px;
    .h-menu-li-selected {
      .h-menu-show:after {
        width: 4px;
      }
    }
    > li > .h-menu-show {
      font-size: 15px;
      .h-menu-show-icon {
        font-size: 20px;
      }
      .h-menu-show-desc {
        transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
    }
  }
  .h-menu.h-menu-size-collapse > .h-menu-li > .h-menu-show {
    padding-left: 24px;
    .h-menu-show-icon {
      font-size: 20px;
    }
  }
  .h-menu.h-menu-white {
    color: rgb(49, 58, 70);
  }
}
#app .h-layout .app-menu-mask {
  left: 200px;
}
//左侧menu宽度
@media screen and (max-width: 1366px) {
  .h-layout-sider {
    min-width: 200px;
    max-width: 200px;
    width: 200px;
  }
  .h-layout.h-layout-sider-fixed {
    padding-left: 200px;
  }
  .h-layout.h-layout-has-sider > .h-layout-header-fixed > .h-layout-header {
    left: 200px;
  }
  #app .h-layout-header-fixed .sys-tabs-vue {
    left: 200px;
  }
  .h-layout.h-layout-sider-collapsed > .h-layout-header-fixed > .h-layout-header {
    left: 70px;
  }
}
@media screen and (min-width: 1366px) {
  .h-layout-sider {
    min-width: 200px;
    max-width: 200px;
    width: 200px;
  }
  .h-layout.h-layout-sider-fixed {
    padding-left: 200px;
  }
  .h-layout.h-layout-has-sider > .h-layout-header-fixed > .h-layout-header {
    left: 200px;
  }
  #app .h-layout-header-fixed .sys-tabs-vue {
    left: 200px;
  }
  .h-layout.h-layout-sider-collapsed > .h-layout-header-fixed > .h-layout-header {
    left: 70px;
  }
}
@media screen and (min-width: 1680px) {
  .h-layout-sider {
    min-width: 240px;
    max-width: 240px;
    width: 240px;
  }
  .h-layout.h-layout-sider-fixed {
    padding-left: 240px;
  }
  .h-layout.h-layout-has-sider > .h-layout-header-fixed > .h-layout-header {
    left: 240px;
  }
  #app .h-layout-header-fixed .sys-tabs-vue {
    left: 240px;
  }
  .h-layout.h-layout-sider-collapsed > .h-layout-header-fixed > .h-layout-header {
    left: 70px;
  }
}
</style>
<template>
  <div class="app-menu">
    <appLogo></appLogo>
    <Menu
      :datas="menus"
      :inlineCollapsed="siderCollapsed"
      @click="trigger"
      ref="menu"
      :className="`h-menu-${theme}`"
    ></Menu>
    <div class="app-menu-mask" @click="hideMenu"></div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import appLogo from './app-logo';
import { getMenus } from 'js/config/menu-config';

export default {
  props: {
    theme: String
  },
  data() {
    return {
      menus: []
    };
  },
  watch: {
    $route() {
      this.menuSelect();
    }
  },
  mounted() {
    this.init();
    const listener = G.addlistener('SYS_MENU_UPDATE', () => {
      this.init();
    });
    this.$once('hook:beforeDestroy', function() {
      G.removelistener(listener);
    });
  },
  computed: {
    ...mapState(['siderCollapsed'])
  },
  methods: {
    init() {
      this.menus = getMenus(G.get('SYS_MENUS'));
      this.$nextTick(() => {
        this.menuSelect();
      });
    },
    menuSelect() {
      if (this.$route.name) {
        this.$refs.menu.select(this.$route.name);
      }
    },
    trigger(data) {
      if (data.children.length > 0) return;
      this.$router.push({ name: data.key });
    },
    hideMenu() {
      this.$store.commit('updateSiderCollapse', true);
    }
  },
  components: {
    appLogo
  }
};
</script>
