import React, { useState, useContext, useEffect } from "react";
import EdvnzTheme from "@mono-repo/provider";
import { TextInput, Button, Row } from "@mono-repo/components";
import { ProfileIcon } from "@mono-repo/card";
import { spacing } from "@mono-repo/theme";
import { Behavior, TypeofControl } from "@mono-repo/constants";

const CommentBox = (props) => {
  const {
    handleAdd,
    commentID,
    userProfile,
    inputRef,
    selectedComment,
    setReportComment,
    setSelectedCommentId,
    isUpdate,
    setIsUpdate,
  } = props;

  const [comment, setComment] = useState("");
  const { theme } = useContext(EdvnzTheme);

  const handleCommentReply = () => {
    if (commentID || selectedComment?.commentID) {
      // this for reply
      handleAdd({
        message: comment,
        commentId: commentID || selectedComment?.commentID,
        isUpdate,
        id: selectedComment?.id,
      });
    } else {
      // this is for comment
      handleAdd({ message: comment, isUpdate, id: selectedComment?.id });
    }
    setComment("");
  };

  useEffect(() => {
    if (!isUpdate) return;
    if (isUpdate && selectedComment) {
      setComment(selectedComment?.commentText || selectedComment?.replyText);
    }
  }, [selectedComment, isUpdate]);

  const handleOnBlur = () => {
    if (!comment && comment.length === 0) {
      setIsUpdate(false);
      setSelectedCommentId("");
      setReportComment({});
    }
  };

  return (
    <Row
      style={{
        backgroundColor: theme.colors.backgroundSurface2,
        paddingHorizontal: spacing.spacing3,
        height: 60,
      }}
    >
      <TextInput
        numberOfLines={1}
        inputRef={inputRef}
        placeholder={commentID ? "Add a Reply" : "Type your comment"}
        inputFieldStyle={{
          flex: 1,
          height: "100%",
          borderColor: "transparent",
        }}
        iconLeft={<ProfileIcon imageUrl={userProfile?.imageUrl} size={32} />}
        iconRight={
          <Button
            label='Post'
            onPress={handleCommentReply}
            size='small'
            testingProps={{
              screenName: "CommentBox",
              typeofControl: TypeofControl.BUTTON_CARD,
              behavior: Behavior.SUBMIT,
            }}
            status={comment && comment?.length !== 0 ? "active" : "inactive"}
            style={{ paddingHorizontal: spacing.spacing4 }}
            textVariant='utilityCompact2'
          />
        }
        onBlur={() => {
          handleOnBlur();
        }}
        value={comment}
        onChangeText={(value) => {
          setComment(value);
        }}
      />
    </Row>
  );
};

export default CommentBox;
