import {
  Avatar,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Tooltip,
} from '@mui/material';
import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import FrameHoc from '../../hoc/FrameHoc';

const ProjectProfile = () => {
  const history = useHistory();
  return (
    <>
      <div className="freelance-project-head card-container">
        <h2>Project1</h2>
        <Button variant="outlined" onClick={() => history.goBack()}>
          Назад
        </Button>
      </div>
      <Divider />
      <div
        className="card-container freelance-project-info customScroll-full"
        style={{overflowY: 'auto', height: '46rem', paddingRight: '1rem'}}>
        <div>
          <div className="freelance-project-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ad
            quidem sunt dolores officia enim mollitia dolorum alias facere
            inventore aperiam architecto laborum iste, sed numquam sapiente est
            atque sit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Odio ad quidem sunt dolores officia enim mollitia dolorum alias
            facere inventore aperiam architecto laborum iste, sed numquam
            sapiente est atque sit. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Odio ad quidem sunt dolores officia enim mollitia
            dolorum alias facere inventore aperiam architecto laborum iste, sed
            numquam sapiente est atque sit. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Odio ad quidem sunt dolores officia
            enim mollitia dolorum alias facere inventore aperiam architecto
            laborum iste, sed numquam sapiente est atque sit.
          </div>
          <div className="freelance-project-rates">
            <h3>Ставки</h3>
            <List className="freelance-list">
              <ListItem
                style={{
                  border: '1px solid #bfbbbb',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <ListItemText
                  style={{margin: 0}}
                  primary={
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Link
                        to={'/profile'}
                        style={{
                          alignItems: 'center',
                          display: 'flex',
                          alignSelf: 'flex-start',
                          marginBottom: '0.5rem',
                        }}>
                        <ListItemAvatar>
                          <Avatar sizes="small" />
                        </ListItemAvatar>
                        <ListItemText
                          primary="name foname"
                          secondary={
                            <Tooltip title="2" placement="top">
                              <Button>
                                <Rating
                                  defaultValue={2}
                                  size="small"
                                  readOnly
                                />
                              </Button>
                            </Tooltip>
                          }
                        />
                      </Link>
                      <div>12:30 12/12</div>
                    </div>
                  }
                  secondary="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ad quidem sunt dolores officia enim mollitia dolorum alias facere inventore aperiam architecto laborum iste, sed numquam sapiente est atque sit."
                />
              </ListItem>
              <ListItem
                style={{
                  border: '1px solid #bfbbbb',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <ListItemText
                  style={{margin: 0}}
                  primary={
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Link
                        to={'/profile'}
                        style={{
                          alignItems: 'center',
                          display: 'flex',
                          alignSelf: 'flex-start',
                          marginBottom: '0.5rem',
                        }}>
                        <ListItemAvatar>
                          <Avatar sizes="small" />
                        </ListItemAvatar>
                        <ListItemText
                          primary="name foname"
                          secondary={
                            <Tooltip title="2" placement="top">
                              <Button>
                                <Rating
                                  defaultValue={2}
                                  size="small"
                                  readOnly
                                />
                              </Button>
                            </Tooltip>
                          }
                        />
                      </Link>
                      <div>12:30 12/12</div>
                    </div>
                  }
                  secondary="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ad quidem sunt dolores officia enim mollitia dolorum alias facere inventore aperiam architecto laborum iste, sed numquam sapiente est atque sit."
                />
              </ListItem>
              <ListItem
                style={{
                  border: '1px solid #bfbbbb',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <ListItemText
                  style={{margin: 0}}
                  primary={
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Link
                        to={'/profile'}
                        style={{
                          alignItems: 'center',
                          display: 'flex',
                          alignSelf: 'flex-start',
                          marginBottom: '0.5rem',
                        }}>
                        <ListItemAvatar>
                          <Avatar sizes="small" />
                        </ListItemAvatar>
                        <ListItemText
                          primary="name foname"
                          secondary={
                            <Tooltip title="2" placement="top">
                              <Button>
                                <Rating
                                  defaultValue={2}
                                  size="small"
                                  readOnly
                                />
                              </Button>
                            </Tooltip>
                          }
                        />
                      </Link>
                      <div>12:30 12/12</div>
                    </div>
                  }
                  secondary="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ad quidem sunt dolores officia enim mollitia dolorum alias facere inventore aperiam architecto laborum iste, sed numquam sapiente est atque sit."
                />
              </ListItem>
              <ListItem
                style={{
                  border: '1px solid #bfbbbb',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <ListItemText
                  style={{margin: 0}}
                  primary={
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Link
                        to={'/profile'}
                        style={{
                          alignItems: 'center',
                          display: 'flex',
                          alignSelf: 'flex-start',
                          marginBottom: '0.5rem',
                        }}>
                        <ListItemAvatar>
                          <Avatar sizes="small" />
                        </ListItemAvatar>
                        <ListItemText
                          primary="name foname"
                          secondary={
                            <Tooltip title="2" placement="top">
                              <Button>
                                <Rating
                                  defaultValue={2}
                                  size="small"
                                  readOnly
                                />
                              </Button>
                            </Tooltip>
                          }
                        />
                      </Link>
                      <div>12:30 12/12</div>
                    </div>
                  }
                  secondary="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ad quidem sunt dolores officia enim mollitia dolorum alias facere inventore aperiam architecto laborum iste, sed numquam sapiente est atque sit."
                />
              </ListItem>
            </List>
          </div>
        </div>
        <List className="freelance-list">
          <ListItem className="freelance-project-list-item">
            <ListItemText
              className="freelance-project-list-item-text"
              primary="Бюджет"
              secondary="1000$"
            />
          </ListItem>
          <ListItem className="freelance-project-list-item">
            <ListItemText
              className="freelance-project-list-item-text"
              primary="Дата"
              secondary="12/12"
            />
          </ListItem>
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
        </List>
      </div>
    </>
  );
};

export default FrameHoc(ProjectProfile);
