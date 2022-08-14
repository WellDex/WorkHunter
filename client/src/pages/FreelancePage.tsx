import {Fab, Tooltip} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';
import {projectAPI} from '../api/projectAPI';
import Control from '../components/freelance/Control';
import AddIcon from '@mui/icons-material/Add';
import ProjectProfile from '../components/freelance/ProjectProfile';
import ProjectsList from '../components/freelance/ProjectsList';
import ModalCreateProject from '../components/freelance/ModalCreateProject';
import FrameHoc from '../hoc/FrameHoc';
import {
  FREELANCE_ACCEPT_PATH,
  FREELANCE_ALL_PATH,
  FREELANCE_MY_PATH,
  FREELANCE_PROJECT_PATH,
} from '../route/const';
import {connect} from 'react-redux';
import * as profileSelectors from '../Redux/profile/profileSelectors';
import * as appSelectors from '../Redux/app/appSelectors';
import * as categoriesSelectors from '../Redux/categories/categoriesSelectors';
import {IStateProfile} from '../Redux/profile/profileReducer';
import {ICategory} from '../Redux/categories/categoriesReducer';
import {getCategories} from '../Redux/categories/categoriesOperations';
import Filters from '../components/freelance/Filters';

interface IFreelancePage {
  profile: IStateProfile;
  userId: string;
  isAdmin: boolean;
  categories: ICategory[];
  getCategories: (filters?: any) => void;
}

const FreelancePageContainer = ({
  profile,
  userId,
  isAdmin,
  categories,
  getCategories,
}: IFreelancePage) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isShowControl, setIsShowControl] = useState(true);
  const [options, setOptions] = useState<any>(null);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setIsShowControl(!location.pathname.includes(`${FREELANCE_PROJECT_PATH}/`));
    setProjects([]);
    if (location.pathname === FREELANCE_ALL_PATH) {
      projectAPI.getAll(options).then((res) => {
        setProjects(res);
      });
    }
    if (location.pathname === FREELANCE_ACCEPT_PATH) {
      projectAPI.getAccepted(options).then((res) => {
        setProjects(res);
      });
    }
    if (location.pathname === FREELANCE_MY_PATH) {
      projectAPI.getMy(options).then((res) => {
        setProjects(res);
      });
    }
  }, [location.pathname, options]);

  const onDelete = async (e: any, id: string) => {
    e.stopPropagation();
    await projectAPI.delete(id).then(async () => {
      await projectAPI.getMy().then((res) => {
        setProjects(res);
      });
    });
  };

  return (
    <div className="freelance">
      {isShowControl && !isAdmin && <Control />}
      {isShowControl && (
        <Filters categories={categories} setOptions={setOptions} />
      )}
      <div className="card-container">
        <Switch>
          <Route
            exact
            path={FREELANCE_ALL_PATH}
            component={() => <ProjectsList rows={projects} />}
          />
          <Route
            exact
            path={FREELANCE_ACCEPT_PATH}
            component={() => <ProjectsList rows={projects} />}
          />
          <Route
            path={FREELANCE_MY_PATH}
            component={() => (
              <ProjectsList
                rows={projects}
                isShowActions={true}
                onDelete={onDelete}
              />
            )}
          />
          <Route
            path={`${FREELANCE_PROJECT_PATH}/:id`}
            component={() => (
              <ProjectProfile profile={profile} userId={userId} />
            )}
          />
          <Redirect to={FREELANCE_ALL_PATH} />
        </Switch>
      </div>
      {!isAdmin && (
        <Tooltip
          title="Создать проект"
          style={{position: 'absolute', bottom: '3rem', right: '3rem'}}
          placement="top">
          <Fab color="primary" size="large" onClick={() => setIsOpen(true)}>
            <AddIcon />
          </Fab>
        </Tooltip>
      )}
      {isOpen && (
        <ModalCreateProject
          open={isOpen}
          categories={categories}
          handleClose={() => {
            setIsOpen(false);
            if (location.pathname === FREELANCE_MY_PATH) {
              projectAPI.getMy().then((res) => {
                setProjects(res);
              });
            }
          }}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  profile: profileSelectors.getProfile(state),
  userId: appSelectors.getUserId(state),
  isAdmin: appSelectors.getIsAdmin(state),
  categories: categoriesSelectors.getCategories(state),
});

const mapDispatchToProps = {
  getCategories,
};

const FreelancePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(FreelancePageContainer);

export default FrameHoc(FreelancePage);
