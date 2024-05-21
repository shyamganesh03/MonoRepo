import { TouchableOpacity } from 'react-native';
import React from 'react';
import Share from 'react-native-share';
import { Audit, testProps } from '@mono-repo/utils';
import { Behavior, EventAction, TypeofControl } from '@mono-repo/constants';

export const EdvnzShare = (props) => {
  const { children, data = {}, onClick, onPress, isExternalLink, itemID } = props;

  const search = (obj) => {
    const str = [];
    for (const p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  };

  const handleShare = async () => {
    const url = isExternalLink
      ? data?.appUrl
      : `${data?.appUrl}/${data?.pathName}?${search(data?.params)}`;

    const options = {
      title: data?.title || 'Edvanza',
      subject: data?.text || '',
      message: url,
    };

    await Share.open(options)
      .then(() => {
        onClick();
        console.log('Share Successfully');
      })
      .catch((err) => {
        console.log('error', err);
      });
    if (data?.auditProps) {
      Audit.logEvent({
        action: data?.auditProps?.action || EventAction.SHARE,
        entityType: data?.auditProps?.entityType,
        entityId: data?.auditProps?.entityId,
        details: {
          fieldName: data?.auditProps?.fieldName,
          Screen: data?.auditProps?.Screen,
          section: data?.auditProps?.section,
          name: data?.auditProps?.name,
          topicId: data?.auditProps?.topicId,
        },
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={async () => {
        if (onPress) {
          await onPress();
        } else {
          await handleShare();
        }
      }}
      {...testProps(`Share_${TypeofControl.BUTTON_ICON}_${Behavior.SHARE}_${itemID}`)}
    >
      {children}
    </TouchableOpacity>
  );
};
