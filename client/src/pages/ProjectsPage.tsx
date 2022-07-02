import {
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Tooltip,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FrameHoc from '../hoc/FrameHoc';
import * as portfolioSelectors from '../Redux/portfolio/portfolioSelectors';
import ModalCreateProject from '../components/projects/ModalCreateProject';
import {IPortfolio} from '../Redux/portfolio/portfolioReducer';
import {connect} from 'react-redux';
import {getPortfolio} from '../Redux/portfolio/portfolioOperations';
import noImage from '../assets/image/noImage.png';
import {useParams} from 'react-router-dom';
import {getImgUrl} from '../utils/getImgUrl';
import {portfolioAPI} from '../api/portfolioAPI';

interface IPortfolioProps {
  portfolio: IPortfolio[];
  getPortfolio: (id: string) => void;
}

const PortfolioContainer = ({portfolio, getPortfolio}: IPortfolioProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const params: any = useParams();
  const [editProject, setEditProject] = useState<IPortfolio | undefined>(
    undefined
  );

  useEffect(() => {
    getPortfolio(params.id);
  }, [params.id]);

  const handleEdit = (portfolio: IPortfolio) => {
    setEditProject(portfolio);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    portfolioAPI.deleteProject(id).finally(() => {
      getPortfolio(params.id);
    });
  };

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
      <ImageList cols={4} gap={16}>
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
                  actionIcon={
                    <>
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          handleEdit(item);
                        }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(item._id);
                        }}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                />
              </a>
            </ImageListItem>
          ))}
      </ImageList>
      {isOpen && (
        <ModalCreateProject
          open={isOpen}
          handleClose={() => {
            setEditProject(undefined);
            setIsOpen(false);
          }}
          getPortfolio={() => getPortfolio(params.id)}
          portfolio={editProject}
        />
      )}
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
