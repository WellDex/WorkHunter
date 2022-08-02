import {
  Avatar,
  Button,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  TextField,
  Tooltip,
} from '@mui/material';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import {projectAPI} from '../../api/projectAPI';
import FrameHoc from '../../hoc/FrameHoc';
import {getImgUrl} from '../../utils/getImgUrl';
import SendIcon from '@mui/icons-material/Send';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import {IStateProfile} from '../../Redux/profile/profileReducer';
import {PROFILE_PATH} from '../../route/const';
import ModalRatingPerformer from './ModalRatingPerformer';
import {profileAPI} from '../../api/profileAPI';

interface IProjectProfile {
  profile: IStateProfile;
  userId: string;
}

const ProjectProfile = ({profile, userId}: IProjectProfile) => {
  const history = useHistory();
  const params: {id: string} = useParams();
  const [project, setProject] = useState<any>();
  const [message, setMessage] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOwner(project?.owner === userId);
  }, [project]);

  useEffect(() => {
    projectAPI.getById(params.id).then(setProject);
  }, [params.id]);

  const sendMessage = async () => {
    await projectAPI
      .addRate({
        projectId: project._id,
        userId,
        message,
      })
      .then(() => {
        projectAPI.getById(params.id).then(setProject);
        setMessage('');
      });
  };

  const addPerformer = async (userId: string) => {
    await projectAPI.addPerformer({userId, projectId: project._id}).then(() => {
      projectAPI.getById(params.id).then(setProject);
    });
  };

  const forChecking = async (isCheck: boolean) => {
    await projectAPI.checking({isCheck, projectId: project._id}).then(() => {
      projectAPI.getById(params.id).then(setProject);
    });
  };

  const closeProject = async (rating?: number | null) => {
    if (rating) {
      await profileAPI.updateRating({userId: project?.performer?.id, rating});
    }
    await projectAPI.delete(project._id).then(history.goBack);
  };

  return (
    <>
      <div className="freelance-project-head card-container">
        <h2>{project?.title}</h2>
        <Button variant="outlined" onClick={history.goBack}>
          Назад
        </Button>
      </div>
      <Divider />
      <div
        className="card-container freelance-project-info customScroll-full"
        style={{overflowY: 'auto', height: '46rem', paddingRight: '1rem'}}>
        <div style={{width: '100%'}}>
          {project?.description && (
            <div className="freelance-project-description">
              {project.description}
            </div>
          )}
          <div className="freelance-project-rates">
            {project && project?.performer ? (
              <>
                <h3>Исполнитель</h3>
                <div style={{display: 'flex', gap: '1rem'}}>
                  <Link
                    to={`${PROFILE_PATH}/${project?.performer?.id}`}
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      alignSelf: 'flex-start',
                      gap: '0.5rem',
                      width: 'fit-content',
                    }}>
                    {project?.performer?.avatar ? (
                      <Avatar
                        sizes="small"
                        src={getImgUrl(project.performer.avatar)}
                      />
                    ) : (
                      <Avatar sizes="small" />
                    )}
                    {`${project?.performer?.firstName} ${project?.performer?.lastName}`}
                  </Link>
                  {project?.performer?.id === userId &&
                    (project?.isCheck ? (
                      <TaskAltOutlinedIcon color="success" />
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => forChecking(true)}>
                        Сдать
                      </Button>
                    ))}
                  {project?.owner === userId &&
                    (project?.isCheck ? (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => setIsOpen(true)}>
                          Принять
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => forChecking(false)}>
                          Отказать
                        </Button>
                      </>
                    ) : (
                      <HistoryToggleOffIcon />
                    ))}
                </div>
              </>
            ) : (
              <>
                <h3>Ставки</h3>
                <List className="freelance-list">
                  {project?.rate?.length > 0 &&
                    project?.rate?.map((candidate: any) => (
                      <ListItem
                        style={{
                          border: '1px solid #bfbbbb',
                          display: 'flex',
                          flexDirection: 'column',
                        }}>
                        <ListItemText
                          style={{margin: 0, width: '100%'}}
                          primary={
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}>
                              <Link
                                to={`${PROFILE_PATH}/${candidate.id}`}
                                style={{
                                  alignItems: 'center',
                                  display: 'flex',
                                  alignSelf: 'flex-start',
                                  marginBottom: '0.5rem',
                                }}>
                                <ListItemAvatar>
                                  {candidate?.avatar ? (
                                    <Avatar
                                      sizes="small"
                                      src={getImgUrl(candidate.avatar)}
                                    />
                                  ) : (
                                    <Avatar sizes="small" />
                                  )}
                                </ListItemAvatar>
                                <ListItemText
                                  primary={`${candidate.firstName} ${candidate.lastName}`}
                                  secondary={
                                    <Tooltip
                                      title={candidate.rating}
                                      placement="top">
                                      <Button>
                                        <Rating
                                          defaultValue={candidate.rating}
                                          size="small"
                                          readOnly
                                        />
                                      </Button>
                                    </Tooltip>
                                  }
                                />
                              </Link>
                              {isOwner && (
                                <IconButton
                                  size="small"
                                  onClick={() => addPerformer(candidate.id)}
                                  style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                  }}>
                                  <TaskAltOutlinedIcon
                                    sx={{
                                      '&:hover': {color: 'rgb(46, 125, 50)'},
                                    }}
                                  />
                                </IconButton>
                              )}
                              <div>
                                {moment(candidate.date).format('HH:mm DD/MM')}
                              </div>
                            </div>
                          }
                          secondary={candidate.message}
                        />
                      </ListItem>
                    ))}
                  {!isOwner &&
                    project &&
                    !project?.rate.find(
                      (candidate: any) => candidate.id === userId
                    ) && (
                      <ListItem style={{padding: 0, marginTop: '1rem'}}>
                        <TextField
                          variant="outlined"
                          placeholder="Введите сообщение..."
                          fullWidth={true}
                          multiline={true}
                          value={message}
                          onChange={(e: any) => setMessage(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className="messenger-chat-field-item">
                                {profile?.avatar ? (
                                  <Avatar src={getImgUrl(profile.avatar)} />
                                ) : (
                                  <Avatar />
                                )}
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment
                                position="end"
                                className="messenger-chat-field-item">
                                <Button
                                  variant="outlined"
                                  onClick={sendMessage}>
                                  <SendIcon />
                                </Button>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </ListItem>
                    )}
                </List>
              </>
            )}
          </div>
        </div>
        <List className="freelance-list">
          <ListItem className="freelance-project-list-item">
            <ListItemText
              className="freelance-project-list-item-text"
              primary="Бюджет"
              secondary={`${project?.budjet}$`}
            />
          </ListItem>
          <ListItem className="freelance-project-list-item">
            <ListItemText
              className="freelance-project-list-item-text"
              primary="Дата"
              secondary={moment(project?.createdDate).format('DD/MM')}
            />
          </ListItem>
          {project?.marks.length > 0 && (
            <ListItem className="freelance-project-list-item">
              <ListItemText
                className="freelance-project-list-item-text"
                primary="Метки"
                secondary={
                  <div className="freelance-project-chips">
                    <Chip label="html" variant="outlined" />
                    <Chip label="css" variant="outlined" />
                    <Chip label="react" variant="outlined" />
                  </div>
                }
              />
            </ListItem>
          )}
        </List>
      </div>
      {isOpen && (
        <ModalRatingPerformer
          open={isOpen}
          closeProject={(rating) => {
            setIsOpen(false);
            closeProject(rating);
          }}
          handleClose={() => {
            setIsOpen(false);
            closeProject();
          }}
        />
      )}
    </>
  );
};

export default FrameHoc(ProjectProfile);
