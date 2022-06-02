import {Avatar} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {portfolioAPI} from '../../api/portfolioAPI';
import {usersAPI} from '../../api/usersAPI';
import FrameHoc from '../../hoc/FrameHoc';
import {FRIENDS_PATH, PORTFOLIO_PATH} from '../../route/const';

const options = {
  top: 6,
  count: true,
};

interface IPortfolioProps {
  id: string;
}

const ProfilePortfolio = ({id}: IPortfolioProps) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [countProjects, setCountProjects] = useState<number>(0);
  useEffect(() => {
    portfolioAPI.getPortfolio(id, options).then((res) => {
      setProjects(res.portfolio);
      setCountProjects(res.count);
    });
  }, [id]);

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
              <Avatar className="profile-portfolio-avatar" />
              <p>{project.title}</p>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default FrameHoc(ProfilePortfolio);
