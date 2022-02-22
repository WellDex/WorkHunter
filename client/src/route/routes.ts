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

export interface IRoute {
  path: string;
  component: any;
  name?: string;
}

export const routes: IRoute[] = [
  {
    path: PROFILE_PATH,
    component: ProfilePage,
    name: 'Моя страница',
  },
  {
    path: NEWS_PATH,
    component: NewsPage,
    name: 'Новости',
  },
  {
    path: MESSEMGER_PATH,
    component: MessengerPage,
    name: 'Мессенджер',
  },
  {
    path: FRIENDS_PATH,
    component: FriendsPage,
    name: 'Друзья',
  },
  {
    path: USERS_PATH,
    component: UsersPage,
  },
  {
    path: MY_GROUPS_PATH,
    component: MyGroupsPage,
    name: 'Сообщества',
  },
  {
    path: GROUPS_PATH,
    component: GroupsPage,
  },
  {
    path: GALLERY_PATH,
    component: GalleryPage,
    name: 'Фотографии',
  },
  {
    path: PORTFOLIO_PATH,
    component: ProjectsPage,
    name: 'Портфолио',
  },
  {
    path: `${GROUP_PATH}/:id`,
    component: GroupProfile,
  },
  {
    path: FREELANCE_PATH,
    component: FreelancePage,
    name: 'Фриланс',
  },
  {
    path: '/freelance/project/:id',
    component: ProjectProfile,
  },
  {
    path: LOGIN_PATH,
    component: LoginPage,
  },
  {
    path: REGISTER_PATH,
    component: RegistrationPage,
  },
];
