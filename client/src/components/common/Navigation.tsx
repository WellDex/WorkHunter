import React from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Menu } from "antd";
import {
  MailOutlined,
  UserOutlined,
  ReadOutlined,
  TeamOutlined,
  CommentOutlined,
  PictureOutlined,
  FolderViewOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";

const Navigation = () => {
  return (
    <Menu style={{ width: 200 }}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to={"/profile"}>Моя страница</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<ReadOutlined />}>
        <Link to={"/profile"}>Новости</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<MailOutlined />}>
        <Link to={"/profile"}>Мессенджер</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<TeamOutlined />}>
        <Link to={"/profile"}>Друзья</Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<CommentOutlined />}>
        <Link to={"/profile"}>Сообщества</Link>
      </Menu.Item>
      <Menu.Item key="6" icon={<PictureOutlined />}>
        <Link to={"/profile"}>Фотографии</Link>
      </Menu.Item>
      <Menu.Item key="7" icon={<FolderViewOutlined />}>
        <Link to={"/profile"}>Портфолио</Link>
      </Menu.Item>
      <Menu.Item key="8" icon={<ReconciliationOutlined />}>
        <Link to={"/profile"}>Вакансии</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navigation;
