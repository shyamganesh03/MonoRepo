import React, { useContext, useCallback, useState } from "react";
import { Icon } from "@mono-repo/native-icons";
import { Drawer, Text } from "@mono-repo/components";
import EdvnzTheme from "@mono-repo/provider";
import { TouchableOpacity, View } from "react-native";
import { BlurWidget } from "@mono-repo/blurwidget";
import { Layout } from "@mono-repo/container";
import { spacing } from "@mono-repo/theme";
import { Audit, testProps } from "@mono-repo/utils";
import { Behavior, EventAction, TypeofControl } from "@mono-repo/constants";

const externalOpen = (URL) => window.open(URL, "_blank", "noopener");

const iconList = {
  facebook: {
    name: "SocialFacebook",
    e: (l) => externalOpen(`https://www.facebook.com/sharer/sharer.php?u=${l}`),
  },
  twitter: {
    name: "SocialTwitter",
    e: (l, t) =>
      externalOpen(`https://twitter.com/intent/tweet?text=${t}&url=${l}`),
  },
  whatsapp: {
    name: "SocialWhatsapp",
    e: (l, t) => externalOpen(`https://api.whatsapp.com/send?text=${t} ${l}`),
  },
  reddit: {
    name: "SocialReddit",
    e: (l, t) =>
      externalOpen(`https://www.reddit.com/submit?url=${l}&title=${t}`),
  },
  telegram: {
    name: "SocialTelegram",
    e: (l, t) =>
      externalOpen(`https://telegram.me/share/msg?url=${l}&text=${t}`),
  },
  linkedin: {
    name: "SocialLinkedin",
    e: (l, t, ti) =>
      externalOpen(
        `https://www.linkedin.com/shareArticle?mini=true&url=${l}&title=${ti}&summary=${t}`
      ),
  },
  mail: {
    name: "SocialGmail",
    e: (l, t) => externalOpen(`mailto:?body=${l}&subject=${t}`),
  },
  copy: {
    name: "SocialCopy",
    e: (l) => navigator?.clipboard?.writeText(decodeURIComponent(l)),
  },
};

export const EdvnzShare = (props) => {
  const {
    children,
    data = {},
    onClick,
    onPress,
    isExternalLink,
    itemID,
  } = props;
  const { theme } = useContext(EdvnzTheme);
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  let url = "";

  if (data?.appUrl) {
    url = isExternalLink
      ? new URL(data?.appUrl)
      : new URL(`${data?.appUrl}/${data?.pathName}`);

    url.search = new URLSearchParams(data?.params);
  }

  const options = {
    title: data?.title || "Edvanza",
    text: data?.text,
    url,
  };

  const handleOnIconClicked = (e) => {
    onClick && onClick(); // callback
    e(encodeURIComponent(url), data.text, data.title);
    onClose();
  };

  const handleOnClick = useCallback(async () => {
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
    if (window.navigator.share) {
      try {
        await window.navigator.share(options);
        props.onClick();
      } catch (e) {
        console.warn(e);
      }
    } else {
      onOpen();
    }
  }, [options]);

  return (
    <>
      <TouchableOpacity
        onPress={onPress ? () => onPress() : () => handleOnClick()}
        {...testProps(
          `Share_${TypeofControl.BUTTON_ICON}_${Behavior.SHARE}_${itemID}`
        )}
      >
        <View>{children}</View>
      </TouchableOpacity>
      {isOpen && (
        <Drawer
          showDrawer={isOpen}
          setShowDrawer={onClose}
          showBackground={<BlurWidget variant='blur80' onPress={onClose} />}
        >
          <Layout>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {Object?.values(iconList)?.map((value) => {
                if (value?.name === "SocialCopy") {
                  return (
                    <TouchableOpacity
                      style={{ margin: spacing.spacing4 }}
                      onPress={() => {
                        // copy(data, isExternalLink)
                        onClick();
                        onClose();
                      }}
                      {...testProps(
                        `Share_${TypeofControl.BUTTON_ICON}_${Behavior.COPY}_${itemID}`
                      )}
                    >
                      <Icon name={value.name} width={60} height={60} />
                    </TouchableOpacity>
                  );
                }
                return (
                  <TouchableOpacity
                    style={{ margin: spacing.spacing4 }}
                    onPress={() => handleOnIconClicked(value?.e)}
                    {...testProps(
                      `Share_${TypeofControl.BUTTON_ICON}_${Behavior.SELECT}_${itemID}`
                    )}
                  >
                    <Icon name={value.name} width={60} height={60} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </Layout>
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.backgroundSurface2,
              padding: spacing.spacing4,
              marginTop: spacing.spacing4,
              alignItems: "center",
            }}
            onPress={onClose}
            {...testProps(
              `Share_${TypeofControl.BUTTON_ICON}_${Behavior.CLOSE}_${itemID}`
            )}
          >
            <Text variant='functional1'>Close</Text>
          </TouchableOpacity>
        </Drawer>
      )}
    </>
  );
};
