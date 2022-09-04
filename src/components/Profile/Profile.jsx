import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setUser, userSelector } from '../../features/auth';

const Profile = () => {
  const { user } = useSelector(userSelector);

  return (
    <div>Profile - {user.username}</div>
  );
};

export default Profile;
