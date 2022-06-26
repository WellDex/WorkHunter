import {Avatar} from '@mui/material';
import React from 'react';
import {NavLink} from 'react-router-dom';
import FrameHoc from '../../hoc/FrameHoc';
import {PORTFOLIO_PATH} from '../../route/const';
import {getImgUrl} from '../../utils/getImgUrl';

interface IPortfolioProps {
  id: string;
  projects: any[];
  countProjects: number;
}

const ProfilePortfolio = ({id, projects, countProjects}: IPortfolioProps) => {
  return (
    <div className="card-container">
      <NavLink to={`${PORTFOLIO_PATH}/${id}`}>
        Портфолио
        <span className="profile-gallery-title-count">{countProjects}</span>
      </NavLink>
      <div className="profile-portfolio-list">
        {projects.length > 0 &&
          projects.map((project) => (
            <NavLink
              key={project._id}
              to={`${PORTFOLIO_PATH}/${project._id}`}
              className="profile-portfolio-list-item">
              {project.avatar ? (
                <Avatar
                  className="profile-portfolio-avatar"
                  src={getImgUrl(project.avatar)}
                />
              ) : (
                <Avatar className="profile-portfolio-avatar" />
              )}
              <p>{project.title}</p>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default FrameHoc(ProfilePortfolio);
