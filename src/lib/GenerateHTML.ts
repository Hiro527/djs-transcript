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
    await guild.members.fetch();
    let BaseHTML = consts.Base.replaceAll("%SERVER%", guild.name)
        .replaceAll("%CHANNEL_NAME%", channel.name)
        .replaceAll("%SERVER_ICON%", guild.iconURL()!)
        .replaceAll(
            "%TRANSCRIPT_TIMESTAMP%",
            new Date().toLocaleString(locale || "en")
        );
    let ContentsHTML = "";
    messages.forEach((message) => {
        let MessageHTML = consts.Message.replace(
            "%MEMBER_AVATAR%",
            message.member?.user.displayAvatarURL()!
        )
            .replace("%MEMBER_TAG%", message.member?.user.tag!)
            .replace(
                "%MESSAGE_CREATED_TIMESTAMP%",
                message.createdAt.toLocaleString(locale || "en")
            );
        if (message.editedAt) {
            MessageHTML = MessageHTML.replace(
                "%MESSAGE_EDITED_TIMESTAMP%",
                ` Edited at ${message.editedAt.toLocaleString(locale || "en")}`
            );
        } else {
            MessageHTML = MessageHTML.replace("%MESSAGE_EDITED_TIMESTAMP%", "");
        }
        MessageHTML = MessageHTML.replace(
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
            EmbedBase = EmbedBase.replace(
                "%EMBED_COLOR%",
                embed.hexColor ? embed.hexColor : "000000"
            );
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
                InlineFieldBase = InlineFieldBase.replace(
                    "%EMBED_INLINE_FIELDS%",
                    InlineFields
                );
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
                    Footer = Footer.replace(
                        "%EMBED_FOOTER_IMAGE_URL%",
                        embed.footer.iconURL || ""
                    );
                } else {
                    Footer = Footer.replace("%EMBED_FOOTER_IMAGE_URL%", "");
                }
                Footer = Footer.replace(
                    "%EMBED_FOOTER_TEXT%",
                    embed.footer.text || ""
                );
                if (embed.timestamp) {
                    Footer = Footer.replace(
                        "%EMBED_FOOTER_TIMESTAMP%",
                        new Date(embed.timestamp).toLocaleString(
                            locale || "en"
                        ) || ""
                    );
                } else {
                    Footer = Footer.replace("%EMBED_FOOTER_TIMESTAMP%", "");
                }
                MainContent += Footer;
            }
            EmbedBase = EmbedBase.replace("%EMBED_MAIN%", MainContent);
            if (embed.thumbnail) {
                EmbedBase = EmbedBase.replace(
                    "%EMBED_THUMBNAIL%",
                    consts.EmbedThumbnail.replace(
                        "%EMBED_THUMBNAIL_IMAGE_URL%",
                        embed.thumbnail.url
                    )
                );
            } else {
                EmbedBase = EmbedBase.replace("%EMBED_THUMBNAIL%", "");
            }
            Embeds += EmbedBase;
        });
        MessageHTML = MessageHTML.replace("%EMBEDS%", Embeds);
        MessageHTML = MessageHTML.replace("%IMAGES%", Images);
        MessageHTML = MessageHTML.replace("%FILES%", Files);
        ContentsHTML += MessageHTML;
    });
    BaseHTML = BaseHTML.replace("%CONTENTS%", ContentsHTML);
    return BaseHTML;
};

const rgba = (hexcolor: string, opacity: number) => {
    if (hexcolor.length !== 7) {
        return null;
    }
    const red = parseInt(hexcolor.slice(1, -4), 16);
    const green = parseInt(hexcolor.slice(3, -2), 16);
    const blue = parseInt(hexcolor.slice(5), 16);
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

const generateContentHTML = (
    guild: Guild,
    content: string,
    embed?: Boolean
) => {
    content.match(/<@![0-9]{17,19}>/g)?.forEach((str) => {
        content = content.replace(
            str,
            `<span class="highlight" style="background-color:rgba(79, 110, 223, 0.4)">@${
                guild.members.cache.get(str.slice(3, -1))?.displayName
            }</span>`
        );
    });
    content.match(/<@&[0-9]{17,19}>/g)?.forEach((str) => {
        content = content.replace(
            str,
            `<span class="highlight" style="background-color:${
                rgba(guild.roles.cache.get(str.slice(3, -1))?.hexColor!, 0.4) ||
                "rgba(79, 110, 223, 0.4)"
            }">@${guild.roles.cache.get(str.slice(3, -1))?.name}</span>`
        );
    });
    content.match(/<#[0-9]{17,19}>/g)?.forEach((str) => {
        content = content.replace(
            str,
            `<span class="highlight" style="background-color:rgba(79, 110, 223, 0.4)">${
                guild.channels.cache.get(str.slice(2, -1))?.type ===
                "GUILD_VOICE"
                    ? "🔊"
                    : "#"
            }${guild.channels.cache.get(str.slice(2, -1))?.name}</span>`
        );
    });
    content.match(/\*\*[\s\S]*\*\*/g)?.forEach((str) => {
        content = content.replace(
            str,
            `<span class="bold">${str.slice(2, -2)}</span>`
        );
    });
    content.match(/\|\|[\s\S]*\|\|/g)?.forEach((str) => {
        content = content.replace(
            str,
            `<span class="spoiler">${str.slice(2, -2)}</span>`
        );
    });
    content.match(/~~[\s\S]*~~/g)?.forEach((str) => {
        content = content.replace(
            str,
            `<span class="strike">${str.slice(2, -2)}</span>`
        );
    });
    content.match(/^> [\s\S]*/g)?.forEach((str) => {
        content = content.replace(
            str,
            `<div class="quote"><div class="quotedText">${str.slice(1)}</div>/div>`
        );
    });
    content.match(/```[\s\S]*```/g)?.forEach((str) => {
        let startIndex = 3;
        if (str.match(/^```.+\n/)) {
            startIndex = str.match(/^```.+\n/)![0].length;
        }
        else if (str.match(/^```\n/)) {
            startIndex = 4
        }
        content = content.replace(
            str,
            `<div class="codeB">${str.slice(startIndex, -3)}</div>`
        );
    });
    content.match(/`[\s\S]*`/g)?.forEach((str) => {
        content = content.replace(
            str,
            `<span class="codeL">${str.slice(1, -1)}</span>`
        );
    });
    content = content.replaceAll("\n", "<br>");
    return content;
};
