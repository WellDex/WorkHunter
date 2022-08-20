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
import * as appSelectors from '../Redux/app/appSelectors';
import ModalCreateProject from '../components/projects/ModalCreateProject';
import {IPortfolio} from '../Redux/portfolio/portfolioReducer';
import {connect} from 'react-redux';
import {getPortfolio} from '../Redux/portfolio/portfolioOperations';
import noImage from '../assets/image/noImage.png';
import {useParams} from 'react-router-dom';
import {getImgUrl} from '../utils/getImgUrl';
import {portfolioAPI} from '../api/portfolioAPI';
import NoData from '../components/common/NoData';
import {setLoading} from '../Redux/app/appOperations';

interface IPortfolioProps {
  portfolio: IPortfolio[];
  getPortfolio: (id: string) => void;
  userId: string;
  setLoading: (b: boolean) => void;
}

const PortfolioContainer = ({
  portfolio,
  getPortfolio,
  userId,
  setLoading,
}: IPortfolioProps) => {
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

  const handleDelete = async (id: string) => {
    setLoading(true);
    await portfolioAPI.deleteProject(id).finally(() => {
      getPortfolio(params.id);
    });
  };

  return (
    <div className="card-container">
      <div className="projects-head">
        <h1 className="projects-head-title">Портфолио</h1>
        {userId === params.id && (
          <Tooltip title="Добавить проект" placement="left">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => setIsOpen(true)}>
              <AddIcon />
            </Button>
          </Tooltip>
        )}
      </div>
      {portfolio && portfolio.length > 0 ? (
        <ImageList cols={4} gap={16}>
          {portfolio.map((item, index) => (
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
                    userId === params.id && (
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
                    )
                  }
                />
              </a>
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <NoData />
      )}
      {isOpen && (
        <ModalCreateProject
          open={isOpen}
          handleClose={() => {
            setEditProject(undefined);
            setIsOpen(false);
          }}
          getPortfolio={() => getPortfolio(params.id)}
          portfolio={editProject}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  portfolio: portfolioSelectors.getPortfolio(state),
  userId: appSelectors.getUserId(state),
});

const mapDispatchToProps = {
  getPortfolio,
  setLoading,
};

const ProjectsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioContainer);

export default FrameHoc(ProjectsPage);
