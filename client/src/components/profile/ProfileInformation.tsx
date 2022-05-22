import {
  Chip,
  Divider,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import React from 'react';
import Moment from 'react-moment';
import 'moment/locale/ru';
import FrameHoc from '../../hoc/FrameHoc';
import {IStateProfile} from '../../Redux/profile/profileReducer';
import moment from 'moment';

const ProfileInformation = (props: IStateProfile) => {
  const {
    firstName,
    lastName,
    status,
    rating,
    birthDate,
    description,
    city,
    school,
    university,
    career,
    isSearchWork,
    skills,
    isOnline,
    phoneNumber,
    email,
    friends,
  } = props;
  return (
    <div className="card-container">
      <div className="profile-status">{isOnline ? 'online' : 'offline'}</div>
      <div className="title">
        <h2>
          {`${firstName} ${lastName}`}{' '}
          <Rating
            className="profile-rating"
            name="rating"
            defaultValue={0}
            precision={0.5}
            value={rating || 0}
            readOnly
          />
        </h2>
        {status && <p>{status}</p>}
      </div>
      <Divider className="divider" />
      <Table className="profile-info-table">
        {description && (
          <TableBody>
            <TableRow>
              <TableCell className="profile-info-table-row-title">
                О себе
              </TableCell>
              <TableCell>{description}</TableCell>
            </TableRow>
          </TableBody>
        )}
        {skills.length > 0 && (
          <TableBody>
            <TableRow>
              <TableCell className="profile-info-table-row-title">
                Навыки
              </TableCell>
              <TableCell className="profile-info-table-row-description">
                {skills.map((item, index) => (
                  <Chip key={index} label={item.name} />
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        )}
        {(phoneNumber || email) && (
          <TableBody>
            <TableRow>
              <TableCell className="profile-info-table-row-title">
                Контакты
              </TableCell>
              <TableCell>
                <div>{phoneNumber && phoneNumber}</div>
                <div>{email && email}</div>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
        {isSearchWork && (
          <TableBody>
            <TableRow>
              <TableCell className="profile-info-table-row-title">
                searchWork
              </TableCell>
              <TableCell>{isSearchWork}</TableCell>
            </TableRow>
          </TableBody>
        )}
        {birthDate && (
          <TableBody>
            <TableRow>
              <TableCell className="profile-info-table-row-title">
                День рождения
              </TableCell>
              <TableCell>
                <Moment
                  date={birthDate}
                  format={'DD MMMM YYYY'}
                  locale="ru"
                  local></Moment>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
        {city && (
          <TableBody>
            <TableRow>
              <TableCell className="profile-info-table-row-title">
                Город
              </TableCell>
              <TableCell>{city}</TableCell>
            </TableRow>
          </TableBody>
        )}
        {school.length > 0 && (
          <TableBody>
            <TableRow>
              <TableCell className="profile-info-table-row-title">
                Школа
              </TableCell>
              <TableCell>
                {school.map((item, index) => (
                  <div key={index}>{item.name}</div>
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        )}
        {university.length > 0 && (
          <TableBody>
            <TableRow>
              <TableCell className="profile-info-table-row-title">
                Университет
              </TableCell>
              <TableCell>
                {university.map((item, index) => (
                  <div key={index}>{`${item.name} (${item.faculty}) (${moment(
                    item.startDate
                  )
                    .locale('ru')
                    .format('DD MMMM YYYY')} - ${moment(item.endDate)
                    .locale('ru')
                    .format('DD MMMM YYYY')})`}</div>
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        )}
        {career.length > 0 && (
          <TableBody>
            <TableRow>
              <TableCell className="profile-info-table-row-title">
                Карьера
              </TableCell>
              <TableCell>
                {career.map((item, index) => (
                  <div key={index}>{`${item.placeOfWork} (${
                    item.position
                  }) (${moment(item.startDate)
                    .locale('ru')
                    .format('DD MMMM YYYY')} - ${moment(item.endDate)
                    .locale('ru')
                    .format('DD MMMM YYYY')})`}</div>
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
      <Divider className="divider" />
      <ul className="profile-info-list">
        <li className="profile-info-list-item">
          <span className="profile-info-list-count">{friends.length}</span>
          друзей
        </li>
        <li className="profile-info-list-item">
          <span className="profile-info-list-count">46</span> друзей
        </li>
        <li className="profile-info-list-item">
          <span className="profile-info-list-count">46</span> друзей
        </li>
        <li className="profile-info-list-item">
          <span className="profile-info-list-count">46</span> друзей
        </li>
        <li className="profile-info-list-item">
          <span className="profile-info-list-count">46</span> друзей
        </li>
      </ul>
    </div>
  );
};

export default FrameHoc(ProfileInformation);
