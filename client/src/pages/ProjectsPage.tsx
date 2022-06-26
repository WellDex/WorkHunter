import {
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Tooltip,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import FrameHoc from '../hoc/FrameHoc';
import * as portfolioSelectors from '../Redux/portfolio/portfolioSelectors';
import ModalCreateProject from '../components/projects/ModalCreateProject';
import {IPortfolio} from '../Redux/portfolio/portfolioReducer';
import {connect} from 'react-redux';
import {getPortfolio} from '../Redux/portfolio/portfolioOperations';
import noImage from '../assets/image/noImage.png';
import {useParams} from 'react-router-dom';
import {getImgUrl} from '../utils/getImgUrl';

interface IPortfolioProps {
  portfolio: IPortfolio[];
  getPortfolio: (id: string) => void;
}

const PortfolioContainer = ({portfolio, getPortfolio}: IPortfolioProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const params: any = useParams();
  useEffect(() => {
    getPortfolio(params.id);
  }, [params.id]);

  return (
    <div className="card-container">
      <div className="projects-head">
        <h1 className="projects-head-title">Портфолио</h1>
        <Tooltip title="Добавить проект" placement="left">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => setIsOpen(true)}>
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
      <ImageList cols={3} gap={16}>
        {portfolio &&
          portfolio.length > 0 &&
          portfolio.map((item, index) => (
            <ImageListItem key={index} className="projects-list-item">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={getImgUrl(item.avatar) || noImage}
                  srcSet={getImgUrl(item.avatar) || noImage}
                  alt={item.title || 'no-image'}
                  loading="lazy"
                />
                <ImageListItemBar
                  className="projects-list-bar"
                  position="below"
                  actionPosition="right"
                  title={item.title}
                />
              </a>
            </ImageListItem>
          ))}
      </ImageList>
      <ModalCreateProject
        open={isOpen}
        handleClose={() => setIsOpen(false)}
        getPortfolio={() => getPortfolio(params.id)}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  portfolio: portfolioSelectors.getPortfolio(state),
});

const mapDispatchToProps = {
  getPortfolio,
};

const ProjectsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioContainer);

export default FrameHoc(ProjectsPage);
