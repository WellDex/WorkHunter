import {
  REGISTER_PATH,
  FRIENDS_PATH,
  FREELANCE_PATH,
  GALLERY_PATH,
  GROUPS_PATH,
  LOGIN_PATH,
  MESSEMGER_PATH,
  NEWS_PATH,
  PORTFOLIO_PATH,
  PROFILE_PATH,
  USERS_PATH,
  MY_GROUPS_PATH,
  GROUP_PATH,
  SETTING_PATH,
} from './const';
import LoginPage from '../pages/auth/LoginPage';
import RegistrationPage from '../pages/auth/RegistrationPage';
import ProjectProfile from '../components/freelance/ProjectProfile';
import GroupProfile from '../components/groups/GroupProfile';
import FreelancePage from '../pages/FreelancePage';
import GalleryPage from '../pages/GalleryPage';
import GroupsPage from '../pages/GroupsPage';
import MessengerPage from '../pages/MessengerPage';
import NewsPage from '../pages/NewsPage';
import ProfilePage from '../pages/ProfilePage';
import ProjectsPage from '../pages/ProjectsPage';
import UsersPage from '../pages/UsersPage';
import FriendsPage from '../pages/FriendsPage';
import MyGroupsPage from '../pages/MyGroupsPage';
import SettingPage from '../pages/SettingPage';

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
    path: MESSEMGER_PATH,
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
    path: '/freelance/project/:id',
    component: ProjectProfile,
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
