import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
Vue.use(Router)
function isLogin (to, from, next) {
    axios.get('http://47.95.249.186:8880/mixueshop/login/isLogin').then((res) => {
      if (res.data) {
        next()
      } else {
        next({path: '/registerLogin'});
      }
  })
  next();
}
const router = new Router({
  linkExactActiveClass: '',
  linkActiveClass: 'linkActive',
  routes: [
    // 主页向4个分页跳转
    {
      path: '/',
      redirect: 'index'
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../components/index/index')
    },
    {
      path: '/discover',
      name: 'discover',
      component: () => import('../components/discover/discover')
    },
    {
      path: '/NHlist/:path',
      name: 'NHlist',
      props: true,
      component: () => import('../components/discover/NHlist/NHlist')
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('../components/table/table'),
      beforeEnter: (to, from, next) => {
        isLogin(to, from, next);
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('../components/mine/mine'),
      beforeEnter: (to, from, next) => {
        isLogin(to, from, next);
      }

    },
    // mine 我的页面
    {
      path: '/order',
      name: 'order',
      component: () => import('../components/mine/order/order.vue')
    },
    // =>
    // =====>
    {
      path: '/assessment/:id',
      name: 'assessment',
      component: () => import('../components/mine/order/assessment/assessment'),
      props: true
    },
    {
      path: '/orderStatus/:id/:finalPay',
      name: 'orderStatus',
      component: () => import('../components/mine/order/orderStatus/orderStatus'),
      props: true
    },
    // <=====
    {

      path: '/history',
      name: 'history',
      component: () => import('../components/mine/history/history')
    },
    {
      path: '/Cardvolume',
      name: 'Cardvolume',
      component: () => import('../components/mine/Cardvolume/Cardvolume')
    },
    {
      path: '/configuration',
      name: 'configuration',
      component: () => import('../components/mine/Cardvolume/configuration/configuration')
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('../components/mine/message/message')
    },
    {
      path: '/collection',
      name: 'collection',
      component: () => import('../components/mine/collection/collection.vue')
    },
    // list 页  主页=> list页
    {
      path: '/list/:cid',
      name: 'list',
      component: () => import('../components/list/list'),
      props: true
    },
    // list页 || 发现页 => 商品详情页
    {
      path: '/goodsDetail/:id',
      name: 'goodsDetail',
      props: true,
      component: () => import('../components/goodsDetail/goodsDetail'),
      beforeEnter: (to, from, next) => {
        isLogin(to, from, next);
      }
    },
    // =>
    // =====>
    {
      path: '/evaluate/:id',
      name: 'evaluate',
      props: true,
      component: () => import('../components/goodsDetail/evaluate/evaluate')
    },
    // <=======
    {
      path: '/placeOrder',
      name: 'placeOrder',
      component: () => import('../components/placeorder/placeOrder.vue'),
      props: (route) => ({
        itemAll: route.params.itemAll
      }),
      children: [
        {
          path: 'takeAway',
          name: 'takeAway',
          component: () => import('../components/placeorder/takeAway/takeAway.vue'),
          props: (route) => ({
            takeItem: route.params.takeItem,
            id: route.params.id,
            priceId: route.params.priceId
          })
        },
        {
          path: 'eatHere',
          name: 'eatHere',
          component: () => import('../components/placeorder/eatHere/eatHere.vue'),
          props: (route) => ({
            hereItem: route.params.hereItem,
            id: route.params.id,
            priceId: route.params.priceId
          })
        }
      ]
    },
    {
      path: '/paymentOrder/:orderId/:finalPay',
      name: 'paymentOrder',
      component: () => import('../components/placeorder/paymentOrder/paymentOrder'),
      props: true
    },
    // 设置页面********************* */
    {
      path: '/usermessage',
      name: '/usermessage',
      component: () => import('../components/usermessage/usermessage.vue'),
      beforeEnter: (to, from, next) => {
        isLogin(to, from, next);
      }
    },
    {
      path: '/changeName',
      name: 'changeName',
      component: () => import('../components/usermessage/changeName/changeName')
    },
    {
      path: '/address',
      name: 'address',
      component: () => import('../components/usermessage/address/address')
    },
    {
      path: '/search',
      name: '/search',
      component: () => import('../components/search/search')
    },
    {
      path: '/next',
      name: 'next',
      component: () => import('../components/usermessage/password/next/next')
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: () => import('../components/addAddress/addAddress'),
      props: (route) => ({
        currentAddr: route.params.currentAddr
      })
    },
    {
      path: '/login',
      component: () => import('../components/usermessage/registerLogin/login/login'),
      children: [{
        path: '/',
        redirect: '/landing'
      },
      {
        path: '/registe',
        name: 'registe',
        component: () => import('../components/usermessage/registerLogin/login/registe/registe.vue')
      }, {
        path: '/landing',
        name: 'landing',
        component: () => import('../components/usermessage/registerLogin/login/landing/landing.vue')}
      ]
      },
      {
      path: '/password',
      name: 'password',
      component: () => import('../components/usermessage/password/password')
    },
    {
      path: '/registerLogin',
      name: 'registerLogin',
      component: () => import('../components/usermessage/registerLogin/registerLogin')
    },
    {
      path: '/more',
      name: 'more',
      component: () => import('../components/more/more')
    },
    {
      path: '/classfiy/:id',
      name: 'classfiy',
      component: () => import('../components/more/classfiy'),
      props: true
    }
  ]
});
export default router;
