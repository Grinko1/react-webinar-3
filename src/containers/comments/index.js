import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import CommentList from '../../components/comment-list';
import Spinner from '../../components/spinner';
import useSelector from '../../hooks/use-selector';
import { useParams } from 'react-router';
import commentsAction from '../../store-redux/comments/actions';
import CommentWrapper from '../../components/comment-wrapper';
import useTranslate from '../../hooks/use-translate';

const Comments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslate();
  const selectRedux = useSelectorRedux(
    (state) => ({
      comments: state.comments?.data,
      waiting: state.comments.waiting,
      error: state.comments.error,
    }),
    shallowEqual,
  );

  const select = useSelector((state) => ({
    exists: state.session.exists,
    username: state.session.user?.profile?.name,
  }));

  const comments = useMemo(() => {
    if (selectRedux.comments.length) {
      return treeToList(listToTree(selectRedux.comments, '_id', 'article'), (item, level) => ({
        _id: item._id,
        level,
        text: item.text,
        date: item.dateCreate,
        author: item.author.profile.name,
      }));
    }
  }, [selectRedux.comments]);

  const callbacks = {
    addNewComment: useCallback((data) => dispatch(commentsAction.createNewComment(data)), []),
  };

  const [text, setText] = useState('');
  //для отображения 1й формы и хранения id и level родительского комментария
  const [activeComment, setActiveComment] = useState(null);

  //поиск места где должна отобразиться форма
  // (очень громозко, но ничего лучше не смогла придумать)
  const [placeIdForForm, setPlaceIdForForm] = useState(null);

  const findPlaceForForm = () => {
    if (activeComment !== null) {
      const replyTo = selectRedux.comments.find((item) => item._id === activeComment.id);
      const placeId = findLastChildrenId(replyTo);
      return placeId;
    }
  };

  function findLastChildrenId(comment) {
    if (comment) {
      return comment.children.length
        ? findLastChildrenId(comment.children[comment.children.length - 1])
        : comment._id;
    }
    return null;
  }

  //скролл к форме ответа на коммент
  const formRef = useRef(null);
  const scroll = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  useEffect(() => {
    setPlaceIdForForm(findPlaceForForm());
    // setTimeout чтобы форма успела появиться по условию
    setTimeout(scroll, 0);
  }, [activeComment]);

  //проверка длины коммента, если пустой или пробелы,кнопка отправить будет дисайбл
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    !text.trim().length ? setIsDisabled(true) : setIsDisabled(false);
  }, [text]);

  //cоздание комментария
  function handleAddComment(e) {
    e.preventDefault();
    const data = {
      text,
      parent: {
        _id: activeComment === null ? id : activeComment.id,
        _type: activeComment === null ? 'article' : 'comment',
      },
    };
    callbacks.addNewComment(data);
    setText('');
    setActiveComment(null);
  }

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentWrapper head={t('comments')} qtt={comments?.length}>
        <CommentList
          comments={comments}
          isAuth={select.exists}
          text={text}
          setText={setText}
          handleAddComment={handleAddComment}
          activeComment={activeComment}
          setActiveComment={setActiveComment}
          username={select.username}
          isDisabled={isDisabled}
          findPlaceForForm={findPlaceForForm}
          placeIdForForm={placeIdForForm}
          formRef={formRef}
          scroll={scroll}
          t={t}
        />
      </CommentWrapper>
    </Spinner>
  );
};

export default Comments;
