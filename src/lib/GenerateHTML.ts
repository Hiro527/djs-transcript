import {
    Guild,
    Message,
    NewsChannel,
    TextBasedChannel,
    TextChannel,
} from "discord.js";
import * as consts from "./consts";
export const getHtml = async (
    messages: Message[],
    channel: TextChannel | NewsChannel,
    guild: Guild,
    locale?: string
) => {
    let BaseHTML = consts.Base;
    // ベースHTMLの構築
    BaseHTML.replace("%SERVER%", guild.name);
    BaseHTML.replace("%CHANNEL_NAME%", channel.name);
    BaseHTML.replace("%SERVER_ICON%", guild.iconURL()!);
    BaseHTML.replace(
        "%TRANSCRIPT_TIMESTAMP%",
        new Date().toLocaleString(locale || "en")
    );
    let ContentsHTML = "";
    messages.forEach((message) => {
        let MessageHTML = consts.Message;
        MessageHTML.replace(
            "%MEMBER_AVATAR%",
            message.member?.displayAvatarURL()!
        );
        MessageHTML.replace("%MEMBER_TAG%", message.member?.user.tag!);
        MessageHTML.replace(
            "%MESSAGE_CREATED_TIMESTAMP%",
            message.createdAt.toLocaleString(locale || "en")
        );
        if (message.editedAt) {
            MessageHTML.replace(
                "%MESSAGE_EDITED_TIMESTAMP%",
                ` Edited at ${message.editedAt.toLocaleString(locale || "en")}`
            );
        } else {
            MessageHTML.replace("%MESSAGE_EDITED_TIMESTAMP%", "");
        }
        MessageHTML.replace(
            "%MESSAGE_CONTENT%",
            generateContentHTML(guild, message.content, false)
        );
        let Files = "";
        let Images = "";
        message.attachments.forEach((attachment) => {
            if (attachment.contentType?.startsWith("image")) {
                Images += consts.Image.replace("%IMAGE_URL%", attachment.url);
            } else {
                Files += consts.File.replace("%FILE_NAME%", attachment.name!)
                    .replace(
                        "%FILE_SIZE%",
                        `${
                            Math.floor((attachment.size / 1000 / 1000) * 10) /
                            10
                        }MB`
                    )
                    .replace("%FILE_URL%", attachment.url);
            }
        });
        let Embeds = "";
        message.embeds.forEach((embed) => {
            let EmbedBase = consts.EmbedBase;
            let MainContent = "";
            if (embed.author) {
                MainContent += consts.EmbedAuthor.replace(
                    "%EMBED_AUTHOR_AVATAR_URL%",
                    embed.author.iconURL || ""
                ).replace("%EMBED_AUTHOR_NAME%", embed.author.name);
            }
            if (embed.title) {
                MainContent += consts.EmbedTitle.replace(
                    "%EMBED_TITLE%",
                    embed.title
                );
            }
            if (embed.description) {
                MainContent += consts.EmbedDesc.replace(
                    "%EMBED_DESC%",
                    generateContentHTML(guild, embed.description, true)
                );
            }
            let RegularFields = "";
            let InlineFieldBase = consts.EmbedInlineFieldBase;
            let InlineFields = "";
            if (embed.fields.length) {
                embed.fields.forEach((field) => {
                    if (field.inline) {
                        InlineFields += consts.EmbedInlineField.replace(
                            "%EMBED_FIELD_TITLE%",
                            field.name
                        ).replace("%EMBED_FIELD_VALUE%", field.value);
                    } else {
                        RegularFields += consts.EmbedRegularField.replace(
                            "%EMBED_FIELD_TITLE%",
                            field.name
                        ).replace("%EMBED_FIELD_VALUE%", field.value);
                    }
                });
                MainContent += RegularFields;
                InlineFieldBase.replace("%EMBED_INLINE_FIELDS%", InlineFields);
                if (InlineFields !== "") {
                    MainContent += InlineFieldBase;
                }
            }
            if (embed.image) {
                MainContent += consts.EmbedImage.replace(
                    "%EMBED_IMAGE_URL%",
                    embed.image.url
                );
            }
            let Footer = consts.EmbedFooter;
            if (embed.footer) {
                if (embed.footer.iconURL) {
                    Footer.replace(
                        "%EMBED_FOOTER_IMAGE_URL%",
                        embed.footer.iconURL
                    );
                } else {
                    Footer.replace("%EMBED_FOOTER_IMAGE_URL%", "");
                }
                Footer.replace("%EMBED_FOOTER_TEXT%", embed.footer.text);
                if (embed.timestamp) {
                    Footer.replace(
                        "%EMBED_FOOTER_TIMESTAMP%",
                        embed.timestamp.toLocaleString(locale || "en")
                    );
                } else {
                    Footer.replace("%EMBED_FOOTER_TIMESTAMP%", "");
                }
            }
            MainContent += Footer;
            EmbedBase.replace("%EMBED_MAIN%", MainContent);
            if (embed.thumbnail) {
                EmbedBase.replace(
                    "%EMBED_THUMBNAIL%",
                    consts.EmbedThumbnail.replace(
                        "%EMBED_THUMBNAIL_IMAGE_URL%",
                        embed.thumbnail.url
                    )
                );
            }
            Embeds += EmbedBase;
        });
        MessageHTML.replace("%EMBEDS%", Embeds);
        MessageHTML.replace("%IMAGES%", Images);
        MessageHTML.replace("%FILES%", Files);
        ContentsHTML += MessageHTML;
    });
    BaseHTML.replace("%CONTENTS%", ContentsHTML);
    return BaseHTML;
};

const generateContentHTML = (
    guild: Guild,
    content: string,
    embed?: Boolean
) => {
    content.match(/<@[0-9]{17,19}>/g)?.forEach((str) => {
        content.replace(
            str,
            `<span class="highlight">@${
                guild.members.cache.get(str.slice(2, -1))?.displayName
            }</span>`
        );
    });
    content.match(/<@&[0-9]{17,19}>/g)?.forEach((str) => {
        content.replace(
            str,
            `<span class="highlight" style="color:#${
                guild.roles.cache.get(str.slice(3, -1))?.hexColor
            }">@${guild.roles.cache.get(str.slice(3, -1))?.name}</span>`
        );
    });
    content.match(/<#[0-9]{17,19}>/g)?.forEach((str) => {
        content.replace(
            str,
            `<span class="highlight">${
                guild.channels.cache.get(str.slice(2, -1))?.type ===
                "GUILD_VOICE"
                    ? "🔊"
                    : "#"
            }${guild.channels.cache.get(str.slice(2, -1))?.name}</span>`
        );
    });
    content.match(/\*\*\.+\*\*/g)?.forEach((str) => {
        content.replace(str, `<span class="bold">${str.slice(2, -2)}</span>`);
    });
    content.match(/\|\|.+\|\|/g)?.forEach((str) => {
        content.replace(
            str,
            `<span class="spoiler">${str.slice(2, -2)}</span>`
        );
    });
    content.match(/~~.+~~/g)?.forEach((str) => {
        content.replace(str, `<span class="strike">${str.slice(2, -2)}</span>`);
    });
    content.match(/`.+`/g)?.forEach((str) => {
        content.replace(str, `<span class="codeL">${str.slice(1, -1)}</span>`);
    });
    content.match(/```.+```/g)?.forEach((str) => {
        content.replace(str, `<span class="codeB">${str.slice(3, -3)}</span>`);
    });
    content.replaceAll("\n", "<br>");
    return content;
};
