import { useCallback, useMemo, useState } from 'react';
import CommentLayout from '../../components/comment-layout ';
import { shallowEqual, useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import CommentList from '../../components/comment-list';
import Spinner from '../../components/spinner';
import useSelector from '../../hooks/use-selector';
import { useParams } from 'react-router';
import commentsAction from '../../store-redux/comments/actions';
import CommentWrapper from '../../components/comment-wrapper';

const Comments = () => {
  const selectRedux = useSelectorRedux(
    (state) => ({
      comments: state.comments?.data,
      waiting: state.comments.waiting,
      error: state.comments.error
    }),
    shallowEqual,
  );

  const select = useSelector((state) => ({
    exists: state.session.exists,
    username: state.session.user?.profile?.name,
  }));

  const comments = useMemo(() => {
    if (selectRedux.comments.length) {
      return treeToList(listToTree(selectRedux.comments), (item, level) => ({
        _id: item._id,
        level,
        text: item.text,
        date: item.dateCreate,
        author: item.author.profile.name,
   
      }));
    }
  }, [selectRedux.comments]);


  const { id } = useParams();
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  //для отображения 1й формы и хранения id родительского комментария
  const [activeComment, setActiveComment] = useState(null);

  const callbacks = {
    addNewComment: useCallback((data) => dispatch(commentsAction.createNewComment(data)), []),
    refreshComments: useCallback((id) => dispatch(commentsAction.loadComments(id)), []),
  };

   function handleAddComment(e) {
    e.preventDefault();
    const data = {
      text,
      parent: {
        _id: activeComment === null ? id : activeComment.id,
        _type: activeComment === null ? 'article' : 'comment',
      },
    };
     callbacks.addNewComment(data).then(() => {
         setText('');
         setActiveComment(null);
        callbacks.refreshComments(id);
    });
    
    // await callbacks.refreshComments(id);
  }

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentWrapper head='Комментарии' qtt={comments?.length}>
        <CommentList
          comments={comments}
          isAuth={select.exists}
          text={text}
          setText={setText}
          handleAddComment={handleAddComment}
          activeComment={activeComment}
          setActiveComment={setActiveComment}
          username={select.username}
        />
      </CommentWrapper>
    </Spinner>
  );
};

export default Comments;
