const artcleRouter = {
  route: null,
  name: null,
  title: '文章管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'views/article/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '添加文章',
      type: 'view',
      name: 'artcleAdd',
      route: '/article/add',
      filePath: 'views/article/artcleAdd.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '文章列表',
      type: 'view',
      name: 'artcleList',
      route: '/article/list',
      filePath: 'views/article/artcleList.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '文章类型管理',
      type: 'view',
      name: 'artcleClassify',
      route: '/article/classify',
      filePath: 'views/article/artcleClassify.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '文章详情',
      type: 'view',
      name: 'artcleDetail',
      route: '/article/detail',
      filePath: 'views/article/artcleDetail.vue',
      inNav: false,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default artcleRouter
