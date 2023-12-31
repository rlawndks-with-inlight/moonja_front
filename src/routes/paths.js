// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_MANAGER = '/manager';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/manager/login',
};

export const PATH_MANAGER = {
  root: ROOTS_MANAGER,
  user: {
    root: path(ROOTS_MANAGER, '/user'),
    list: path(ROOTS_MANAGER, '/user/list'),
    add: path(ROOTS_MANAGER, '/user/add'),
  },
  sender: {
    root: path(ROOTS_MANAGER, '/sender'),
    list: path(ROOTS_MANAGER, '/sender/list'),
    add: path(ROOTS_MANAGER, '/sender/add'),
  },
  kakaoChannel: {
    root: path(ROOTS_MANAGER, '/kakao-channel'),
    list: path(ROOTS_MANAGER, '/kakao-channel/list'),
    add: path(ROOTS_MANAGER, '/kakao-channel/add'),
  },
  kakaoTemplete: {
    root: path(ROOTS_MANAGER, '/templete'),
    list: path(ROOTS_MANAGER, '/templete/list'),
    add: path(ROOTS_MANAGER, '/templete/add'),
  },
  deposit: {
    root: path(ROOTS_MANAGER, '/deposit'),
    list: path(ROOTS_MANAGER, '/deposit/list'),
    add: path(ROOTS_MANAGER, '/deposit/add'),
  },
  post: {
    root: path(ROOTS_MANAGER, '/post'),
    list: path(ROOTS_MANAGER, '/post/list'),
    add: path(ROOTS_MANAGER, '/post/add'),
  },
  brand: {
    root: path(ROOTS_MANAGER, '/brand'),
    edit: path(ROOTS_MANAGER, '/brand/edit'),
    list: path(ROOTS_MANAGER, '/brand/list'),
    design: path(ROOTS_MANAGER, '/brand/design'),
  },
};
