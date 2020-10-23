import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweet = ({ tweetObj, isOwner, userObj }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      await storageService.refFromURL(tweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <div
              style={{
                paddingBottom: "35px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={
                  tweetObj.attachmentUrl
                    ? tweetObj.attachmentUrl
                    : "http://www.visioncyber.co.kr/rtimages/n_sub/no_detail_img.gif"
                }
                alt={tweetObj.attachmentUrl}
                width="100px"
                height="100px"
                className="nweet__div"
              />
            </div>
            <input
              type="text"
              placeholder="내용을 입력해주세요."
              value={newTweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="수정" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            취소
          </span>
        </>
      ) : (
        <>
          <h4 style={{ fontWeight: "bolder" }}>{userObj.displayName}</h4>
          <br />
          <h4>{tweetObj.text}</h4>
          <div>
            {tweetObj.attachmentUrl && (
              <img src={tweetObj.attachmentUrl} alt={tweetObj.attachmentUrl} />
            )}
          </div>
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={toggleEditing}>
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  style={{ color: "#04aaff" }}
                />
              </span>
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} style={{ color: "#f76045" }} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
