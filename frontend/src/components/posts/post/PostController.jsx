import { useContext } from 'react'
// eslint-disable-next-line import/no-cycle
import PostView from './PostView'
import useApi from '../../../hooks/useApi'
import { TagContext } from '../../../contexts/TagProvider'
import { HandleContext } from '../../../contexts/HandleProvider'

/**
 * Creates a post. One of either id or data must be provided
 * @prop {string} activity - optional, POSTED, SHARED, COMMENTED or LIKED
 * @prop {number} id - optional, data will be fetched using the id
 * @prop {object} data - optional, use this post data to render the post
 * @prop {boolean} condensed - optional, makes the post take up less space
 * @prop {boolean} showReplies - optional, also renders each 1st level reply to the post
 * @prop {boolean} newPost
 */
const PostController = ({
  activity = 'POSTED',
  id = 0,
  data = null,
  condensed = false,
  showReplies = false,
}) => {
  const { tags } = useContext(TagContext)
  const { handles } = useContext(HandleContext)
  const username = localStorage.getItem('username')
  let postData = data
  let activityText

  if (id) {
    const { data: resData, loading, err } = useApi(`posts/${id}`)

    if (loading) {
      return <div>Loading...</div>
    }

    if (err) {
      return <div>Error: {err}</div>
    }

    switch (activity) {
      case 'POSTED':
        activityText = `${username} posted`
        break
      case 'SHARED':
        activityText = `${username} reshared @${resData.username}'s post`
        break
      case 'COMMENTED':
        activityText = `${username} commented on @${resData.username}'s post`
        break
      case 'LIKED':
        activityText = `${username} liked @${resData.username}'s post`
        break
      default:
        activityText = null
    }

    postData = resData
  } else if (!data) {
    // true if neither id or data is given
    return <div>Error retrieving post data</div>
  }

  return (
    <PostView
      activityText={activityText}
      condensed={condensed}
      postData={postData}
      showReplies={showReplies}
      tags={tags}
      handles={handles}
    />
  )
}

export default PostController
