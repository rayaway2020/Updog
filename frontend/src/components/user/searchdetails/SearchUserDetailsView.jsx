import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import classes from './searchuserdetails.module.scss'
import FollowButtonController from '../../button/followbutton/FollowButtonController'

/**
 * The SearchUserDetailsView component is used to display the any results for users while performing a search.
 *
 * Props:
 * @username : the username of the appropriate user.
 * @handle : the handle (@) of the appropriate user.
 * @bio : the biography of the appropriate user.
 * @profilePic : the link to the profile image of the appropriate user.
 *
 * The FollowButton function has two props isFollowing and OnClick which can be changed to appropriate values when needed.
 */

export default function SearchUserDetailsView({
  username,
  handle,
  profilePic,
  bio,
}) {
  return (
    <Link to={`/user/${username}`} className={classes.container}>
      <div className={classes.top}>
        <div className={classes.topLeft}>
          <Avatar
            className={classes.Avatar}
            alt="Profile Pic"
            src={profilePic}
            sx={{ width: 80, height: 80 }}
          />
          <div className={classes.names}>
            <h2 className={classes.username}>{username}</h2>
            <p className={classes.handle}>@{handle}</p>
          </div>
        </div>
        <FollowButtonController isFollowingProp={false} onClick={() => {}} />
      </div>
      <p className={classes.biography}>{bio ?? 'Biography'}</p>
    </Link>
  )
}
