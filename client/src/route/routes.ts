import {
  REGISTER_PATH,
  FRIENDS_PATH,
  FREELANCE_PATH,
  GALLERY_PATH,
  GROUPS_PATH,
  LOGIN_PATH,
  MESSENGER_PATH,
  NEWS_PATH,
  PORTFOLIO_PATH,
  PROFILE_PATH,
  USERS_PATH,
  MY_GROUPS_PATH,
  GROUP_PATH,
  SETTING_PATH,
  USERS_ADMIN_PATH,
  GROUPS_ADMIN_PATH,
  FREELANCE_ADMIN_PATH,
  CATEGORIES_ADMIN_PATH,
} from './const';
import LoginPage from '../pages/auth/LoginPage';
import RegistrationPage from '../pages/auth/RegistrationPage';
import GroupProfile from '../components/groups/GroupProfile';
import FreelancePage from '../pages/FreelancePage';
import GalleryPage from '../pages/GalleryPage';
import GroupsPage from '../pages/GroupsPage';
import AdminGroupsPage from '../pages/admin/GroupsPage';
import MessengerPage from '../pages/MessengerPage';
import NewsPage from '../pages/NewsPage';
import ProfilePage from '../pages/ProfilePage';
import ProjectsPage from '../pages/ProjectsPage';
import AdminUsersPage from '../pages/admin/UsersPage';
import FriendsPage from '../pages/FriendsPage';
import MyGroupsPage from '../pages/MyGroupsPage';
import SettingPage from '../pages/SettingPage';
import CategoryPage from '../pages/admin/CategoriesPage';
import UsersPage from '../pages/UsersPage';

export interface IRoute {
  path: string;
  component: any;
  name?: string;
  icon?: any;
  isNeedIdParam: boolean;
}

export const routes: IRoute[] = [
  {
    path: PROFILE_PATH,
    component: ProfilePage,
    name: 'Моя страница',
    isNeedIdParam: true,
  },
  {
    path: NEWS_PATH,
    component: NewsPage,
    name: 'Новости',
    isNeedIdParam: false,
  },
  {
    path: MESSENGER_PATH,
    component: MessengerPage,
    name: 'Мессенджер',
    isNeedIdParam: false,
  },
  {
    path: FRIENDS_PATH,
    component: FriendsPage,
    name: 'Друзья',
    isNeedIdParam: true,
  },
  {
    path: USERS_PATH,
    component: UsersPage,
    isNeedIdParam: false,
  },
  {
    path: MY_GROUPS_PATH,
    component: MyGroupsPage,
    name: 'Сообщества',
    isNeedIdParam: true,
  },
  {
    path: GROUPS_PATH,
    component: GroupsPage,
    isNeedIdParam: false,
  },
  {
    path: GALLERY_PATH,
    component: GalleryPage,
    name: 'Фотографии',
    isNeedIdParam: true,
  },
  {
    path: PORTFOLIO_PATH,
    component: ProjectsPage,
    name: 'Портфолио',
    isNeedIdParam: true,
  },
  {
    path: GROUP_PATH,
    component: GroupProfile,
    isNeedIdParam: true,
  },
  {
    path: FREELANCE_PATH,
    component: FreelancePage,
    name: 'Фриланс',
    isNeedIdParam: false,
  },
  {
    path: SETTING_PATH,
    component: SettingPage,
    isNeedIdParam: false,
  },
];

export const authRoutes: IRoute[] = [
  {
    path: LOGIN_PATH,
    component: LoginPage,
    isNeedIdParam: false,
  },
  {
    path: REGISTER_PATH,
    component: RegistrationPage,
    isNeedIdParam: false,
  },
];

export const adminRoutes: IRoute[] = [
  {
    path: USERS_ADMIN_PATH,
    component: AdminUsersPage,
    name: 'Пользователи',
    isNeedIdParam: false,
  },
  {
    path: GROUPS_ADMIN_PATH,
    component: AdminGroupsPage,
    name: 'Группы',
    isNeedIdParam: false,
  },
  {
    path: FREELANCE_ADMIN_PATH,
    component: FreelancePage,
    name: 'Фриланс',
    isNeedIdParam: false,
  },
  {
    path: CATEGORIES_ADMIN_PATH,
    component: CategoryPage,
    name: 'Категории',
    isNeedIdParam: false,
  },
  {
    path: PROFILE_PATH,
    component: ProfilePage,
    isNeedIdParam: true,
  },
  {
    path: FRIENDS_PATH,
    component: FriendsPage,
    isNeedIdParam: true,
  },
  {
    path: USERS_PATH,
    component: UsersPage,
    isNeedIdParam: false,
  },
  {
    path: MY_GROUPS_PATH,
    component: MyGroupsPage,
    isNeedIdParam: true,
  },
  {
    path: GROUPS_PATH,
    component: GroupsPage,
    isNeedIdParam: false,
  },
  {
    path: GALLERY_PATH,
    component: GalleryPage,
    isNeedIdParam: true,
  },
  {
    path: PORTFOLIO_PATH,
    component: ProjectsPage,
    isNeedIdParam: true,
  },
  {
    path: GROUP_PATH,
    component: GroupProfile,
    isNeedIdParam: true,
  },
];
