import React,{Fragment,useEffect} from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types' 
import {connect} from 'react-redux'; 
import Moment from 'react-moment';
import {addLike,deletePost,removeLike} from '../../actions/post';

const PostItem = ({
    addLike,
    removeLike,
    deletePost,
    auth,
    showActions,
    post:{_id,text,name,avatar,user,likes,comments,date}}) =>  (
    <div class="post bg-white p-1 my-1">
    <div>
      <a href="profile.html">
        <img
          class="round-img"
          src={avatar}
          alt=""
        />
        <h4>{name}</h4>
      </a>
    </div>
    <div>
      <p class="my-1">
        {text}
      </p>
       <p class="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      {showActions && (<Fragment>
        <button onClick={()=>addLike(_id)} type="button"class="btn btn-light">
      <i class="fas fa-thumbs-up"></i>{''}
      {likes.length>0 && (<span>{likes.length}</span>)}
     </button>
      <button onClick={()=>removeLike(_id)} type="button"class="btn btn-light">
      <i class="fas fa-thumbs-down"></i>
     </button>
     <Link to={`/post/${_id}`} className="btn btn-primary">
         Discussion {comments.length>0 && (<span className="comment-count">{comments.length}</span>)} 
     </Link>
     {!auth.loading && user === auth.user._id &&(
         <button onClick={()=>deletePost(_id)} type="button"class="btn btn-danger">
         <i class="fas fa-times"></i>
       </button>
     )}
      </Fragment>
      )}
      </div>
  </div>
    )

PostItem.defaultProps={
  showActions:true
}
PostItem.propTypes = {
post: PropTypes.object.isRequired,
auth: PropTypes.object.isRequired,
addLike:PropTypes.func.isRequired,
removeLike:PropTypes.func.isRequired,
deletePost:PropTypes.func.isRequired,
showActions: PropTypes.bool
}

const mapStateToProps = state=>({
    auth:state.auth
})

export default connect(mapStateToProps,{addLike,removeLike,deletePost})(PostItem)
  